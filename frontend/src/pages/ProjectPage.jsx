import React, { useContext } from "react";
import { Anchor, Badge, Box, Breadcrumbs, Flex, Tabs, Title, rem } from "@mantine/core";
import {
  IconMessageCircle,
  IconUsersGroup,
  IconFileDescription,
} from "@tabler/icons-react";
import ProjectPageDescription from "../components/ProjectPageDescription";
import ProjectPageTasks from "../components/ProjectPageTasks";
import ProjectPageProgressBar from "../components/ProjectPageProgressBar";
import ProjectPageMembers from "../components/ProjectPageMembers";
import { ProjectContext, ProjectProvider } from "../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";

const ProjectPageContent = () => {
  const { project, tasks, admins, creator, members, loading, error, projectId } =
    useContext(ProjectContext);

    const navigate = useNavigate()

    const items = [
      { title: "Your Projects", path: `/user-projects` },
      {
        title: project?.name || "Project",
        path: `/user-projects/project/${projectId}`,
      },
      
    ].map((item, index) => (
      <Anchor
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          navigate(item.path); // Navigate programmatically
        }}
        key={index}
        component="button" // Mantine will style it as an anchor but it's a button
      >
        {item.title}
      </Anchor>
    ));
    function formatDate(isoDate) {
      const date = new Date(isoDate);
      const day = date.getUTCDate();
      const month = date.toLocaleString('default', { month: 'long' });
      return `${day} ${month}`;
    }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const iconStyle = { width: rem(14), height: rem(14) };

  function badgeGradient(status) {
    if (status === "active") {
      return { from: "blue.5", to: "blue.8", deg: 88 };
    }
    if (status === "completed") {
      return { from: "green.5", to: "green.9", deg: 90 };
    }
    if (status === "overdue") {
      return { from: "orange.6", to: "red.9", deg: 78 };
    }
    return { from: "gray.4", to: "gray.6", deg: 90 }; // Default gradient for undefined status
  }

  return (
    <Box mt={20} >
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
      <Flex align={"center"} gap={15}>
        <Title size="h1" c={"dark.6"} ff={"poppins"} fw={600} lts={-2}>
          {project.name}
        </Title>
        <Badge
          autoContrast
          mt={5}
          size="md"
          variant="gradient"
          gradient={badgeGradient(project.status)}
        >
          {project.status}
        </Badge>
      </Flex>
      <Badge mt={10} variant="dot" color="orange.8" style={{ color: '#e8590c' }} size="lg">
            Deadline: {formatDate(project.deadline)}
          </Badge>
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
          <ProjectPageProgressBar />
          <ProjectPageDescription />
          <ProjectPageTasks
          />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <Chat/>
        </Tabs.Panel>
        <Tabs.Panel value="members">
          <ProjectPageMembers
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

// Wrap with ProjectProvider
const ProjectPage = () => (
  <ProjectProvider>
    <ProjectPageContent />
  </ProjectProvider>
);

export default ProjectPage;
