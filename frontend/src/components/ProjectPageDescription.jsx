import { Avatar, Badge, Box, Flex, Text, Title } from '@mantine/core';
import React, { useContext } from 'react';
import utils from '../utils/utils';
import { ProjectContext } from '../contexts/ProjectContext';

const ProjectPageDescription = () => {

  const { project, creator } =
    useContext(ProjectContext);

  const createdAt = utils.timeConverter(project.createdat);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  }

  return (
    <Flex flex={1} >
      <Box flex={1}  shadow="xl" radius="md" bg="gray.2" m={20} p={15}>
        <Flex align="center" gap={10}>
          <Title ff="poppins" c="dark.4" fz={25} fw={600} lts={-1} lh={2}>
            Description
          </Title>
          
        </Flex>
        
        <Text c={"dark.6"}
          ff={"poppins"}
          fz={16}
          py={10}
          mb={20}
          fw={500}
          style={{ whiteSpace: "pre-wrap" }}>
          {project.description}
        </Text>
        <Flex align="center" gap={7} mt={10}>
          <Avatar size={25} src={creator.profilepicurl} />
          <Text ff="poppins" c="dark.4" fw={500} fz={15}>
            Created by {creator.name}, {createdAt} ago
          </Text>
        </Flex>
        <Badge mt={20} variant="dot" color="orange.8" style={{ color: '#e8590c' }} size="lg">
            Deadline: {formatDate(project.deadline)}
          </Badge>
      </Box>
    </Flex>
  );
};

export default ProjectPageDescription;
