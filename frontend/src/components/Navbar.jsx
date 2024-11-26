import {
  Avatar,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  NavLink,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout2 } from "@tabler/icons-react";

const Navbar = ({ onLinkClick, user }) => {
  const { logout, isLoading } = useAuth();
  const loggedInUserId = user.id;
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(true);

  if (isLoading) {
    return (
      <div>
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "orange", type: "bars" }}
        />
      </div>
    ); // Show a loading spinner or loading state
  }

  const handleLogout = () => {
    modals.openConfirmModal({
      title: "Confirm Logout",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to log out of taskPRO?</Text>
      ),
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "#e8590c" },
      onConfirm: () => {
        logout();
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <Flex direction={"column"} justify={"space-between"} pt={20} h={"100%"}>
      <Flex direction={"column"}>
        <NavLink
          component={RouterNavLink}
          to="/"
          label="Dashboard"
          color="orange.8"
          variant="filled"
          fw={500}
          onClick={onLinkClick}
        />
        <NavLink
          component={RouterNavLink}
          to="/project"
          label="Projects"
          color="orange.8"
          variant="filled"
          fw={500}
          defaultOpened
        >
          <NavLink
            component={RouterNavLink}
            to="/user-projects"
            label="Your Projects"
            color="orange.8"
            variant="filled"
            fw={500}
            onClick={onLinkClick}
          />
          <NavLink
            component={RouterNavLink}
            to="/projects/create"
            label="Create New Project"
            color="orange.8"
            variant="filled"
            fw={500}
            onClick={onLinkClick}
          />
        </NavLink>
        <NavLink
          component={RouterNavLink}
          to={`/tasks/all/${loggedInUserId}`}
          label="Tasks"
          color="orange.8"
          variant="filled"
          fw={500}
          onClick={onLinkClick}
        />
      </Flex>
      <Flex p align={"center"} justify={"space-between"}>
        <Button radius={"sm"}
        px={10}
            variant="subtle"
            color="dark.2" h={50}
            style={{display:'flex'}}>
          <Avatar
            key={user?.profilepicurl}
            src={user?.profilepicurl}
            size={40}
          />
          <Text
            ff={"poppins"}
            fz={15}
            c={"dark.6"}
            fw={600}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "150px",
            }}
          >
            {user?.name}
          </Text>
        </Button>

        <Tooltip label="Logout" withArrow position="right">
          <Button
            radius={"sm"}
            variant="subtle"
            color="dark.2"
            w={50}
            h={50}
            p={0}
            onClick={() => {
              handleLogout();
            }}
          >
            <IconLogout2 color="#2e2e2e" size={25} />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Navbar;
