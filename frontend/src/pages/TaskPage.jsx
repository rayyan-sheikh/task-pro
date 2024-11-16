import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { getTaskUsers, markTaskCompleted } from "../apiService";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  Paper,
  Popover,
  Select,
  Tabs,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";

const TaskPage = ({ projectId, taskId, admins }) => {
  // const { projectId, taskId } = useParams();

  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = "459fb193-bdc9-4526-a98c-753c88dbbc00";
  // const [selectedStatus, setSelectedStatus] = useState('null');

  useEffect(() => {
    const fetchTaskUsers = async () => {
      try {
        setLoading(true);
        const data = await getTaskUsers(taskId, projectId);
        setTaskDetails(data);
      } catch (error) {
        setError("Error fetching task and members");
        console.error("Error fetching task and members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskUsers();
  }, [taskId, projectId]);

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

  // const handleMarkAsCompleted = async (taskId) => {
  //   try {
  //     const updatedTask = await markTaskCompleted(taskId, "completed");

  //     setTaskDetails((prevState) =>
  //       prevState.map((task) =>
  //         task.task_id === taskId ? { ...task, task_status: "completed" } : task
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error marking task as completed:", error);
  //   }
  // };

  const handleChangeStatus = async (taskId, status) => {
    console.log(`Updating task ${taskId} to status: ${status}`);
    try {
      const updatedTask = await markTaskCompleted(taskId, status); // Assuming this API handles different statuses

      // Update task status in the state
      setTaskDetails((prevState) =>
        prevState.map((task) =>
          task.task_id === taskId ? { ...task, task_status: status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const openMarkAsStatusModal = (taskId) => {
    // Available statuses
    const statusOptions = [
      { value: "completed", label: "Completed" },
      { value: "in progress", label: "In Progress" },
      { value: "overdue", label: "Overdue" },
    ];

    let selectedStatus = null; // Local variable for the selected status

    // Open the confirm modal
    modals.openConfirmModal({
      title: "Update Task Status",
      centered: true,
      children: (
        <>
          <Text c={"dark.4"} ff={"poppins"} fw={500}>
            Please select the new status for this task:
          </Text>
          <Select
            placeholder="Pick one"
            data={statusOptions}
            onChange={(value) => (selectedStatus = value)} // Update local variable
            style={{ marginTop: 20 }}
          />
        </>
      ),
      labels: { confirm: "Update", cancel: "Cancel" },
      confirmProps: { color: "orange.8" },
      onConfirm: () => {
        if (!selectedStatus) {
          console.error("No status selected!");
          return;
        }
        handleChangeStatus(taskId, selectedStatus); // Call the status change handler
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops! {error}. Please try again</div>;
  if (!taskDetails) return <div>No data found</div>;
  return (
    <Box>
      {/* <Title size="h1" c={"dark.6"} ff={"poppins"} fw={600} pb={10} mt={-20} lts={-2}>
        Task Details
      </Title> */}

      <Box withBorder p="md" w={600}>
        <Flex align={"start"}>
          <Flex direction={"column"} flex={1}>
            <Title size="h2" c={"dark.6"} ff={"poppins"} fw={600} lts={-2}>
              {taskDetails[0].task_name}
            </Title>
            <Text c={"dark.4"} ff={"poppins"} fw={500}>
              Project: {taskDetails[0].project_name}
            </Text>

            <Flex gap={5} align={"center"} mb={20}>
              <Text c={"dark.4"} ff={"poppins"} fw={500}>
                Assigned to:{" "}
              </Text>
              <Avatar src={taskDetails[0].user_profile_pic_url} size={20} />
              <Text c={"dark.4"} ff={"poppins"} fw={500}>
                {taskDetails[0].user_name}
              </Text>
            </Flex>
            <Badge
              variant="dot"
              color="orange.8"
              style={{ color: "#e8590c" }}
              size="md"
            >
              Task Deadline: {formatDate(taskDetails[0].task_deadline)}
            </Badge>
          </Flex>
          <Badge color={badgeColor(taskDetails[0].task_status)}>
            {taskDetails[0].task_status}
          </Badge>
        </Flex>
        <Text
          c={"dark.6"}
          ff={"poppins"}
          fz={16}
          bg={"gray.1"}
          py={10}
          my={20}
          fw={500}
        >
          {taskDetails[0].task_description}
        </Text>

        <Flex gap={5}>
          {(isAssignedUser(taskDetails[0].task_assigned_to) ||
            isUserAdmin(loggedInUser)) && (
            <Button
              variant="filled"
              color="orange.8"
              onClick={() => openMarkAsStatusModal(taskDetails[0].task_id)} // Call the modal with the taskId
            >
              Update Task Status
            </Button>
          )}
          {isUserAdmin(loggedInUser) && (
            <Flex gap={5}>
              <Button variant="filled" color="orange.8">
                Delete
              </Button>
              <Button variant="filled" color="orange.8">
                Edit
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default TaskPage;
