import React, { useEffect, useState } from "react";
import { Badge, Box, Flex, Tabs, Title, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconStack,
  IconUsersGroup,
  IconFileDescription,
} from "@tabler/icons-react";
import ProjectPageDescription from "../components/ProjectPageDescription";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  getTasksByProjectId,
  getUserbyId,
} from "../apiService";
import ProjectPageTasks from "../components/ProjectPageTasks";
import ProjectPageProgressBar from "../components/ProjectPageProgressBar";

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectAndCreator = async () => {
      try {
        const fetchedProject = await getProjectById(projectId);
        setProject(fetchedProject);

        if (fetchedProject?.createdby) {
          const fetchedCreator = await getUserbyId(fetchedProject.createdby);
          setCreator(fetchedCreator);
        }

        setLoading(false); // Set loading to false only once both are fetched
      } catch (error) {
        console.error("Error fetching project or creator: ", error);
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectAndCreator();
    }
  }, [projectId]);

  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasksByProjectId(projectId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set to an empty array on error
      }
    };

    fetchTasks();
  }, [projectId]);

  const iconStyle = { width: rem(14), height: rem(14) };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box mt={20}>
      <Flex align={"center"} gap={15}>
        <Title size="h1" c={"dark.6"} ff={"poppins"} fw={600} lts={-2}>
          {project.name}
        </Title>
        <Badge
          autoContrast
          mt={5}
          size="md"
          variant="gradient"
          gradient={{ from: "green.5", to: "green.9", deg: 88 }}
        >
          Completed
        </Badge>
      </Flex>
      <Tabs color="orange" defaultValue="description" mt={10}>
        <Tabs.List>
          <Tabs.Tab
            value="description"
            leftSection={<IconFileDescription style={iconStyle} />}
          >
            Dashboard
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Discussion
          </Tabs.Tab>
          <Tabs.Tab
            value="members"
            leftSection={<IconUsersGroup style={iconStyle} />}
          >
            Members
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="description">
          <ProjectPageProgressBar tasks={tasks} />
          <ProjectPageDescription project={project} creator={creator} />

          <ProjectPageTasks tasks={tasks} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="members">Members tab content</Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default ProjectPage;