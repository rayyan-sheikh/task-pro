import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';
import UserProjects from './UserProjects';
import ProjectPage from './ProjectPage';
import CreateNewProject from './CreateNewProject';
import TaskPage from './TaskPage';

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  

  return (
    <Router>
      <AppShell
        header={{ height: { base: 80, md: 80, lg: 80 } }}
        navbar={{
          width: { base: 200, md: 200, lg: 250 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header withBorder={true} bg="gray.0" pl={10} >
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title size="h1" c="dark.6" ff="poppins" fw={500} lts={-2} lh={2}>
              task
            </Title>
            <Title size={35} c="orange.8" ff="poppins" fw={700} lts={-2} lh={2} ml={-15}>
              PRO
            </Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar withBorder={true} py="md" bg="gray.0">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main bg="gray.0">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/user-projects" element={<UserProjects/>} />
            <Route path='user-projects/project/:projectId' element={<ProjectPage/>} />
            <Route path='projects/create' element={<CreateNewProject/>} />
            <Route path='/user-projects/:projectId/task/:taskId' element={<TaskPage/>} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
};

export default AppLayout;
