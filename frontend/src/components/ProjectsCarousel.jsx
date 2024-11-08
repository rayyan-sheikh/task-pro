import { Flex, Group, Paper, SimpleGrid, Title } from '@mantine/core';
import ProjectCarouselCard from './ProjectCarouselCard';
import ProjectProgress from './ProjectProgress';
import YourTotalTasks from './YourTotalTasks';


const ProjectsCarousel = () => {
 

  return (
    
    <Paper shadow="xl" radius="md" withBorder p="xl" my={20} bg={'gray.0'}>
       <YourTotalTasks/>
      <ProjectProgress/>
      {/* <SimpleGrid
      cols={{ base: 1, sm: 1, lg: 2 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      
      <YourTotalTasks/>
        </SimpleGrid> */}
      
      
      {/* <ProjectCarouselCard/> */}
    </Paper>
  );
};

export default ProjectsCarousel;
