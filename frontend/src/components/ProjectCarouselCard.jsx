import { Box, Flex, Paper, Stack, Title, Text, Button } from '@mantine/core'
import React from 'react'
import {DonutChart, PieChart} from '@mantine/charts'


const ProjectCarouselCard = () => {

    const data = [
        { name: 'Completed', value: 10, color: '#4CAF50' },
        { name: 'In Progress', value: 5, color: '#FFC107' },
        { name: 'Pending', value: 8, color: '#F44336' },
      ];

  return (
    <Paper w={320} h={550} p={20} bg={'gray.0'} shadow="xl" radius="md" withBorder>
        <Stack align="center"
      justify="space-between"
      gap="md"  >
        <Title size="h1" c={'dark.6'} ff={'poppins'} fw={600} lts={-2} lh={0.5} mb={20}>PROJECT NAME 12</Title>
        <DonutChart
      strokeWidth={1} data={data} withTooltip tooltipDataSource="segment" chartLabel="Tasks" size={220} thickness={30}
    />
    <Text fz={20} fw={500} mb={-30} c={'yellow.9'}>Your tasks in process:</Text>
    <Text fz={80} fw={600} c={'#3a373a'}>2</Text>
    <Button size='lg'>Go to this Project</Button>
   
        </Stack>
        
    </Paper>
  )
}

export default ProjectCarouselCard