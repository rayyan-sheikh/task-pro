import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Combobox,
  Flex,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { createTask } from "../apiService";

const AddNewTaskPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { project, admins, members } = useContext(ProjectContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: null,
    assignedMember: {},
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };
  

  const handleCreateTask = async () => {
    const taskData = {
      name: formData.name,
      description: formData.description,
      assignedTo: {},
      projectId: projectId,
      status: "in progress",
      deadline: formData.deadline.toISOString().split("T")[0],
    };

    try {
      const response = await createTask(taskData);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const items = [
    { title: "Your Projects", path: `/user-projects` },
    {
      title: project?.name || "Project",
      path: `/user-projects/project/${projectId}`,
    },
    {
      title: "Add New Task",
      path: `/user-projects/project/${projectId}/new-task`,
    },
  ].map((item, index) => (
    <Anchor
      onClick={(e) => {
        e.preventDefault(); 
        navigate(item.path); 
      }}
      key={index}
      component="button"
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box>
      <Box p="md" w={"100%"}>
        <Breadcrumbs
          styles={{
            breadcrumb: {
              color: "#e8590c",
              fontWeight: 600,
            },
          }}
          mb={20}
        >
          {items}
        </Breadcrumbs>

        <Flex direction={"column"} gap={10}>
          <Title size={32} c={"dark.6"} ff={"poppins"} fw={600} lts={-2}>
            Add New Task
          </Title>
          <Flex>
            <TextInput
              label="Task Name"
              placeholder="Enter task name"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              withAsterisk
              mb="sm"
            />
            <Textarea
              label="Description"
              placeholder="Enter task description"
              value={formData.description}
              name="description"
              onChange={handleInputChange}
              withAsterisk
              mb="sm"
            />
            <DateInput
              valueFormat="YYYY-MM-DD"
              label="Pick date and time"
              value={formData.deadline}
              onChange={handleDateChange}
              withAsterisk
              placeholder="Pick date and time"
            />
          </Flex>
          <Button onClick={handleCreateTask}>Submit</Button>
        </Flex>
        
      </Box>
      
    </Box>
  );
};

export default AddNewTaskPage;
