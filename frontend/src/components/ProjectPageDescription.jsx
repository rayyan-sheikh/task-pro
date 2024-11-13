import {
  Avatar,
  Badge,
  Blockquote,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { getUserbyId } from "../apiService";

import utils from "../utils/utils";
import ProjectPageTasks from "./ProjectPageTasks";

const ProjectPageDescription = ({ project, creator }) => {

  const createdAt = utils.timeConverter(project.createdat);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }

  return (
    <Flex flex={1}>
      <Box
        flex={1}
        shadow="xl"
        radius="md"
        bg={"gray.0"}
        m={20}
      >
        <Flex align={"center"} gap={10}>
        <Title ff={"poppins"} c={"dark.4"} fz={25} fw={600} lts={-1} lh={2}>
          Description
        </Title>
        <Badge
          variant="dot"
          color="orange.8"
          style={{ color: "#e8590c" }}
          size="lg"
        >
          Deadline:{formatDate(project.deadline)}
        </Badge>
        </Flex>
        <Flex align={"center"} gap={7} mt={10}>
        <Avatar size={25} src={creator.profilepicurl}/>
        <Text ff={"poppins"} mt={10} c={"dark.4"} fw={500} fz={15}>
          Created by {creator.name}, {createdAt} ago
        </Text>
        </Flex>
        <Text
          radius="md"
          mt={10}
          c={"dark.6"} fw={400}
          bg={"gray.2"}
          p={10}
        >
          {project.description}
        </Text>
        
        
      </Box>
    </Flex>
  );
};

export default ProjectPageDescription;
