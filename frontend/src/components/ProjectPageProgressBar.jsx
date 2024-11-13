import { Box, Flex, Paper, Progress, Text, Title, Tooltip, TooltipFloating } from '@mantine/core'
import React from 'react'

const ProjectPageProgressBar = ({tasks}) => {

    if (!tasks || tasks.length === 0) {
        return <div />;  // Return an empty div if tasks is null, undefined, or an empty array
    }

    const getTaskStats = (tasks) => {
        const totalTasks = tasks.length;
      
        const statusCounts = {
          completed: 0,
          inProgress: 0,
          overdue: 0,
        };
      
        tasks.forEach((task) => {
          if (task.task_status === "completed") {
            statusCounts.completed += 1;
          } else if (task.task_status === "in progress") {
            statusCounts.inProgress += 1;
          } else if (task.task_status === "overdue") {
            statusCounts.overdue += 1;
          }
        });
      
        // Calculate percentages
        const statusPercentages = {
          completed: ((statusCounts.completed / totalTasks) * 100).toFixed(0),
          inProgress: ((statusCounts.inProgress / totalTasks) * 100).toFixed(0),
          overdue: ((statusCounts.overdue / totalTasks) * 100).toFixed(0),
        };
      
        return {
          totalTasks,
          statusCounts,
          statusPercentages,
        };
      };

      const taskStats = getTaskStats(tasks);


  return (
    <Box shadow="xl" radius="md"  bg={"gray.0"} m={20} flex={1}>
        <Title ff={"poppins"} c={"dark.4"} fz={25} fw={600} lts={-1} lh={2}>
        Status
      </Title>
      <Flex gap={15} align="center" direction={{ base: 'column', sm: 'row' }} >
         <Flex direction={'column'} gap={5} flex={1} style={{ width: '100%' }}>
    <Progress.Root size={27} >
    <Tooltip label={`Completed: ${taskStats.statusCounts.completed}`}>
      <Progress.Section value={taskStats.statusPercentages.completed} color="green.9">
        <Progress.Label ff={'poppins'} fw={500} fz={13}>Completed</Progress.Label>
      </Progress.Section>
      </Tooltip>
    </Progress.Root>
    <Progress.Root size={27} >
    <Tooltip label={`In Progress: ${taskStats.statusCounts.inProgress}`}>
      <Progress.Section value={taskStats.statusPercentages.inProgress} color="blue.8">
        <Progress.Label ff={'poppins'} fw={500} fz={13}>In progress</Progress.Label>
      </Progress.Section>
      </Tooltip>
      </Progress.Root>
      <Progress.Root size={27} >
      <Tooltip label={`Overdue: ${taskStats.statusCounts.overdue}`}>
      <Progress.Section value={taskStats.statusPercentages.overdue} color="#940000">
        <Progress.Label ff={'poppins'} fw={500} fz={13}>Overdue</Progress.Label>
      </Progress.Section>
      </Tooltip>
      </Progress.Root>
      </Flex>
      <Text ff={"poppins"} mb={10} c={"dark.4"} fw={600} fz={15}>
        <Text span gradient={{ from: 'orange.5', to: 'orange.9', deg: 90 }} fz={30} variant='gradient' fw={700} lts={-1}>{taskStats.statusPercentages.completed}% </Text>
         Completed</Text>
      </Flex>
    </Box>
  )
}

export default ProjectPageProgressBar