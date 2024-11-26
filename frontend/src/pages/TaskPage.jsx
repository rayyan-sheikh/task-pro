import React, { useContext } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Select,
  Text,
  Title,
  Breadcrumbs,
  Anchor,
  Tooltip,
  Menu,
  rem,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TaskContext } from "../contexts/TaskContext.jsx";
import { modals } from "@mantine/modals";
import { deleteTask, markTaskCompleted } from "../apiService.js";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconCircleCheck,
  IconClockX,
  IconDotsVertical,
  IconEdit,
  IconEditCircle,
  IconTrash,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext.jsx";

const TaskPage = () => {
  const { task, admins, loading, error, setTaskData, projectId } =
    useContext(TaskContext);
    const {user} = useAuth()

  const navigate = useNavigate();
  // const loggedInUser = "fea52074-7cf8-4f6e-b1f9-e69b6b8dacdc";
  const loggedInUser = user.id;

  // Helper functions
  function badgeColor(status) {
    if (status === "in progress") return "blue";
    if (status === "completed") return "green.8";
    if (status === "overdue") return "red.9";
    return "gray";
  }

  function isAssignedUser(userId) {
    return userId === loggedInUser;
  }

  function isUserAdmin(userId) {
    return admins.some((admin) => admin.id === userId);
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }

  const handleChangeStatus = async (taskId, status) => {
    try {
      const updatedTask = await markTaskCompleted(taskId, status); // API call

      // Update task status in the context
      setTaskData((prevData) => ({
        ...prevData,
        task: prevData.task.map((taskItem) =>
          taskItem.task_id === taskId
            ? { ...taskItem, task_status: status }
            : taskItem
        ),
      }));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this task?",
      children: (
        <Text size="sm">
          Once this task is deleted it can not be recovered.
        </Text>
      ),
      centered: true,
      labels: { confirm: "Yes", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleTaskDelete(task[0].task_id);
      },
    });

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);

      notifications.show({
        color: "green",
        title: "Task Deleted Successfully",
        message: "Redirecting to the Project Page now.",
      });

      setTimeout(() => {
        navigate(`/user-projects/project/${projectId}`); // Replace with your actual navigation route
      }, 700);
    } catch (error) {
      console.error("Error deleting task.", error);

      // Show error notification
      notifications.show({
        color: "red",
        title: "Error Deleting Task",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const items = [
    { title: "Your Projects", path: `/user-projects` },
    {
      title: task?.[0]?.project_name || "Project",
      path: `/user-projects/project/${projectId}`,
    },
    {
      title: task?.[0]?.task_name || "Task",
      path: `/user-projects/${projectId}/task/${task?.[0]?.task_id}`,
    },
  ].map((item, index) => (
    <Anchor
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        navigate(item.path); // Navigate programmatically
      }}
      key={index}
      component="button" // Mantine will style it as an anchor but it's a button
      lh={1.5}
    >
      {item.title}
    </Anchor>
  ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops! {error}. Please try again</div>;
  if (!task) return <div>No task data found</div>;

  return (
      <Box mt={20} px={"md"} w={"100%"}>
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
        <Flex align={"start"}>
          <Flex direction={"column"} flex={1}>
            <Title size={32} c={"dark.6"} ff={"poppins"} fw={600} lts={-2}>
              {task[0].task_name}
            </Title>

            <Text c={"orange.8"} fz={22} ff={"poppins"} fw={600} mb={15}>
              {task[0].project_name}
            </Text>
          </Flex>
          <Flex align={"center"} mt={5} mr={15}>
            <Badge color={badgeColor(task[0].task_status)}>
              {task[0].task_status}
            </Badge>
            {(isUserAdmin(loggedInUser) || isAssignedUser(loggedInUser)) && (
              <Menu width={200} shadow="lg">
                <Menu.Target>
                  <Tooltip label="Options" withArrow position="top">
                    <IconDotsVertical
                      color="#424242"
                      size={20}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Change Status</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      handleChangeStatus(task[0].task_id, "completed");
                    }}
                    color="#2f9e44"
                    ff={"poppins"}
                    fw={500}
                    leftSection={
                      <IconCircleCheck
                        style={{ width: rem(18), height: rem(18) }}
                      />
                    }
                  >
                    Completed
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      handleChangeStatus(task[0].task_id, "in progress");
                    }}
                    color="blue"
                    ff={"poppins"}
                    fw={500}
                    leftSection={
                      <IconTrendingUp
                        style={{ width: rem(18), height: rem(18) }}
                      />
                    }
                  >
                    In progress
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      handleChangeStatus(task[0].task_id, "overdue");
                    }}
                    color="red"
                    ff={"poppins"}
                    fw={500}
                    leftSection={
                      <IconClockX style={{ width: rem(18), height: rem(18) }} />
                    }
                  >
                    Overdue
                  </Menu.Item>
                  {isUserAdmin(loggedInUser) && (
                    <Box>
                      <Menu.Divider />

                      <Menu.Label>Admin Options</Menu.Label>
                      <Menu.Item
                        onClick={() => {
                          console.log("Edit Option Selected");
                        }}
                        color="#343a40"
                        ff={"poppins"}
                        fw={500}
                        leftSection={
                          <IconEditCircle
                            style={{ width: rem(18), height: rem(18) }}
                          />
                        }
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          openDeleteModal();
                        }}
                        color="red"
                        ff={"poppins"}
                        fw={500}
                        leftSection={
                          <IconTrash
                            style={{ width: rem(18), height: rem(18) }}
                          />
                        }
                      >
                        Delete
                      </Menu.Item>
                    </Box>
                  )}
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
        </Flex>
        <Flex gap={5} align={"center"} mb={20}>
          <Text c={"dark.4"} fz={21} ff={"poppins"} fw={500}>
            Assigned to:{" "}
          </Text>
          <Avatar src={task[0].user_profile_pic_url} size={24} />
          <Text c={"dark.4"} fz={21} ff={"poppins"} fw={500}>
            {task[0].user_name}
          </Text>
        </Flex>
        <Badge
          variant="dot"
          color="orange.8"
          style={{ color: "#e8590c" }}
          size="lg"
        >
          Task Deadline: {formatDate(task[0].task_deadline)}
        </Badge>
        <Divider  mt={15} size="md" />
        <Title ff="poppins" c="dark.4" fz={25} fw={600} px={15} pt={15} lts={-1} lh={2}>
          Description
        </Title>
        <Text
          c={"dark.6"}
          ff={"poppins"}
          fz={16}
          px={15}
          pb={15}
          fw={500}
          maw={"100%"}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word", // Ensures long words wrap
            overflowWrap: "break-word",
          }}
        >
          {task[0].task_description}
        </Text>

        <Flex gap={5}>
          <Button
            onClick={() => {
              navigate(`/user-projects/project/${projectId}`);
            }}
            variant="outline"
            mb={20}
            color="orange.8"
            leftSection={<IconArrowLeft size={14} />}
          >
            Back to: {task[0].project_name}
          </Button>
        </Flex>
      </Box>
  );
};

export default TaskPage;
