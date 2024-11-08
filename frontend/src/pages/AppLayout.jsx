import { AppShell, Burger, Group, Skeleton, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import InProgressTasks from '../components/InProgressTasks';
import ProjectsCarousel from '../components/ProjectsCarousel';
import { CompositeChart, PieChart } from '@mantine/charts';
import Navbar from '../components/Navbar';


const AppLayout = () => {
    const [opened, { toggle }] = useDisclosure();
      const userId = '31b559bc-1197-4428-b76b-bc968e57b16e'

    return (
      <AppShell
        header={{ height: { base: 80, md: 80, lg: 80 } }}
        navbar={{
          width: { base: 200, md: 200, lg: 250 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header bg={'gray.0'} pl={10}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title size="h1" c={'dark.6'} ff={'poppins'} fw={500} lts={-2} lh={2}>
        task
      </Title>
      <Title size={35} c={'orange.8'} ff={'poppins'} fw={700} lts={-2} lh={2} ml={-15}>
        PRO
      </Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" bg={'gray.0'}>
          <Navbar/>
        </AppShell.Navbar>
        <AppShell.Main bg={'gray.0'}>
        <ProjectsCarousel/>
        <InProgressTasks userId={userId} />
        
        </AppShell.Main>
      </AppShell>
    );
}

export default AppLayout