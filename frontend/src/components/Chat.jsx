import React, { useState, useRef, useEffect, useContext } from 'react';
import { getFirestore, collection, query, where, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';  // Ensure you're importing initializeApp here
import { ProjectContext } from '../contexts/ProjectContext';  // Import ProjectContext
import { Avatar } from '@mantine/core';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOSz1_3PCZdciVmkGXiYgFhD1ss_tWx_4",
  authDomain: "task-pro-pern.firebaseapp.com",
  projectId: "task-pro-pern",
  storageBucket: "task-pro-pern.firebasestorage.app",
  messagingSenderId: "158563051877",
  appId: "1:158563051877:web:e82fb717896133f67c998c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);  // Initialize Firebase
const firestore = getFirestore(app);

const Chat = () => {
  const { projectId } = useContext(ProjectContext); // Get projectId from context

  // Hardcoded user for now
  const user = {
    id: "dac5703f-1a74-467f-995c-58890ad092b7",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    profilepicurl: "https://avatar.iran.liara.run/public/girl?username=Sarah%20Johnson",
    gender: "female",
    createdat: "2024-11-05T10:41:19.075Z"
  };

  const dummy = useRef();

  // Dynamically create the collection name based on projectId
  const messagesRef = collection(firestore, `messages_${projectId}`);

  // Query messages for the current project based on projectId
  const q = query(
    messagesRef,
    orderBy('createdAt'),
    limit(25)
  );

  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');

  // Fetch messages for the specific project from Firestore with onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(q, snapshot => {  // Listen for real-time updates
      const fetchedMessages = snapshot.docs.map(doc => doc.data());
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();  // Clean up the listener when the component unmounts
  }, [projectId]);  // Re-run the effect when projectId changes

  const sendMessage = async (e) => {
    e.preventDefault();

    // Use the hardcoded user info and current projectId
    const { id, profilepicurl, name } = user;

    // Add message to Firestore in the dynamically named collection
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: id,
      photoURL: profilepicurl,
      user_name: name
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <main>
        {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg} user={user} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </div>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL, user_name } = props.message;
  const messageClass = uid === props.user.id ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <Avatar src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User Avatar" size={25} />
      <p>{user_name}: {text}</p>
    </div>
  );
}

export default Chat;
