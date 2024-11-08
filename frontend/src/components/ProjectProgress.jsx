import { BarChart } from '@mantine/charts'
import { Paper, Title } from '@mantine/core';
import React from 'react'

const ProjectProgress = () => {

    const data = [
        { projectName: 'Project Vegeta', Ongoing: 30, Pending: 20, Completed: 15 },
        { projectName: 'Project Namek', Ongoing: 25, Pending: 15, Completed: 20 },
        { projectName: 'Project Buu', Ongoing: 35, Pending: 25, Completed: 10 },
        { projectName: 'Frieza Project', Ongoing: 40, Pending: 20, Completed: 30 },
        { projectName: 'Cell Sage', Ongoing: 30, Pending: 30, Completed: 25 },
        { projectName: 'Beerus Whis', Ongoing: 45, Pending: 35, Completed: 20 },
        
      ];
  return (
    <Paper  py={20} px={40} bg={'gray.0'} shadow="xl" radius="md" withBorder >
       
    <BarChart
    h={300}
    data={data}
    dataKey="projectName"
    type="stacked"
    orientation="vertical"
    yAxisProps={{ width: 80 }}
    series={[
        { name: 'Completed', color: 'orange.8' },
      { name: 'Ongoing', color: 'orange.5' },
      { name: 'Pending', color: 'orange.3' },
    ]}
  />
  </Paper>
  )
}

export default ProjectProgress