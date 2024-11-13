import React from 'react'
import ProjectsStats from '../components/ProjectsStats';
import InProgressTasks from '../components/InProgressTasks';

const Dashboard = () => {
    const userId = '31b559bc-1197-4428-b76b-bc968e57b16e';
  return (
    <div><ProjectsStats />
    <InProgressTasks userId={userId} />
    </div>
  )
}

export default Dashboard