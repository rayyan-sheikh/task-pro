import React, { useEffect, useState } from "react";
import { getTasksByProjectId } from "../apiService";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProjectPageTasks = ({ tasks }) => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate()

  const navigateToTask = (taskId)=>{
    navigate(`/tasks/task/${taskId}`)
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }

  function badgeColor(status) {
    if (status === "in progress") return "blue";
    if (status === "completed") return "green.8";
    if (status === "overdue") return "red";
    return "gray";
  }

  const filteredTasks =
    tasks &&
    tasks.filter((task) => {
      if (filter === "all") return true;
      return task.task_status === filter;
    });

  return (
    <Box shadow="xl" radius="md"  bg={"gray.0"} m={20}>
      <Title ff={"poppins"} c={"dark.4"} fz={25} fw={600} lts={-1} lh={2}>
        Tasks
      </Title>
      <Flex direction="column" gap="md">
        <Flex gap={0} justify="flex-start" mb={15}>
          <Button
            radius={0}
            variant={"filled"}
            onClick={() => setFilter("all")}
            bg={filter === "all" ? "orange.7" : "orange.0"}
            c={filter === "all" ? "gray.0" : "orange.8"}
          >
            All
          </Button>
          <Button
            variant={"filled"}
            radius={0}
            onClick={() => setFilter("completed")}
            bg={filter === "completed" ? "orange.7" : "orange.0"}
            c={filter === "completed" ? "gray.0" : "orange.8"}
          >
            Completed
          </Button>
          <Button
            variant={"filled"}
            radius={0}
            onClick={() => setFilter("in progress")}
            bg={filter === "in progress" ? "orange.7" : "orange.0"}
            c={filter === "in progress" ? "gray.0" : "orange.8"}
          >
            In Progress
          </Button>
          <Button
            radius={0}
            variant={"filled"}
            onClick={() => setFilter("overdue")}
            bg={filter === "overdue" ? "orange.7" : "orange.0"}
            c={filter === "overdue" ? "gray.0" : "orange.8"}
          >
            Overdue
          </Button>
        </Flex>

        <Flex>
          {filteredTasks === null ? (
            <p>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <Box>
              <Title
                ff={"poppins"}
                c={"dark.4"}
                fz={20}
                fw={600}
                lts={-1}
                lh={2}
              >
                No tasks {filter === "all" ? "" : filter}.
              </Title>
            </Box>
          ) : (
            <Flex
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              {filteredTasks.map((task, index) => (
                <Paper
                style={{cursor: "pointer"}}
                onClick={() => navigateToTask(task.task_id)}
                  key={task.id || `task-${index}`}
                  shadow="sm"
                  radius="md"
                  withBorder
                  pb={10}
                  px={15}
                  ta={"start"}
                  bg={"gray.0"}
                >
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    gap={10}
                  >
                    <Title
                      ff={"poppins"}
                      c={"dark.5"}
                      fz={20}
                      fw={600}
                      lts={-1}
                      lh={2}
                    >
                      {task.task_name}
                    </Title>
                    <Badge color={badgeColor(task.task_status)} size="md">
                      {task.task_status}
                    </Badge>
                  </Flex>
                  <Text
                    style={{
                      maxWidth: "300px",
                      whiteSpace: "normal",
                      overflow: "hidden",
                    }}
                    ff={"poppins"}
                    fz={12}
                    fw={500}
                    mb={10}
                    c={"dark.2"}
                    lineClamp={2}
                  >
                    {task.task_description}
                  </Text>
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    gap={9}
                  >
                    <Avatar
                      size={18}
                      src={task.assigned_user_profile_pic}
                      alt={task.assigned_user_name}
                    />
                    <Text ff={"poppins"} fz={15} fw={500} c={"dark.4"}>
                      {task.assigned_user_name}
                    </Text>
                    <Badge
                      variant="dot"
                      color="orange.8"
                      style={{ color: "#e8590c" }}
                      size="md"
                    >
                      Deadline: {formatDate(task.task_deadline)}
                    </Badge>
                  </Flex>
                </Paper>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectPageTasks;
