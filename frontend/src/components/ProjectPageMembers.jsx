import React, { useEffect, useState } from "react";
import { getProjectMembers } from "../apiService";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Paper,
  Text,
  Title,
  Input,
  Select,
  Checkbox,
  Menu,
  Button,
  TextInput,
} from "@mantine/core";
import { IconArrowsMoveVertical, IconUserDown } from "@tabler/icons-react";
import { RiSortAlphabetAsc } from "react-icons/ri";
import classes from "../Input.module.css";

const ProjectPageMembers = ({ projectId, admins }) => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showAdmins, setShowAdmins] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const fetchedMembers = await getProjectMembers(projectId);
        setMembers(fetchedMembers);
        setFilteredMembers(fetchedMembers);
      } catch (error) {
        setError("Error Fetching members");
        console.error("Error Fetching members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  useEffect(() => {
    
    let filteredList = [...members];

    // Apply search
    if (search) {
      filteredList = filteredList.filter(
        (member) =>
          member.user_name.toLowerCase().includes(search.toLowerCase()) ||
          member.user_email.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (showAdmins) {
      filteredList = filteredList.filter(
        (member) => member.user_role === "admin"
      );
    }

    
    if (sortBy === "name") {
      filteredList = filteredList.sort((a, b) =>
        a.user_name.localeCompare(b.user_name)
      );
    } else if (sortBy === "role") {
      filteredList = filteredList.sort((a, b) =>
        a.user_role.localeCompare(b.user_role)
      );
    }

    setFilteredMembers(filteredList);
  }, [search, sortBy, showAdmins, members]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box p={20}>
      <Text ff={"poppins"} c={"dark.4"} fz={25} fw={600} lts={-1} lh={2}>
        Project Members
      </Text>

      <Flex gap={10} wrap={"wrap"} align={"center"} mb={20}>
        <TextInput
          classNames={{ input: classes.input }}
          w={500}
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button px={5} m={0} bg="orange.8">
              <IconArrowsMoveVertical size={18} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              ff={"poppins"}
              fw={400}
              leftSection={<IconUserDown size={18} />}
              onClick={() => setSortBy("role")}
            >
              Admins First
            </Menu.Item>
            <Menu.Item
              ff={"poppins"}
              fw={400}
              leftSection={<RiSortAlphabetAsc size={18} />}
              onClick={() => setSortBy("name")}
            >
              Name
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Checkbox
          label="Admins Only"
          checked={showAdmins}
          color="orange.8"
          radius="xl"
          onChange={(e) => setShowAdmins(e.target.checked)}
          fw={500}
          ff={"poppins"}
        />
      </Flex>

      {/* Render Members or No Members Found */}
      {filteredMembers.length === 0 ? (
        <Text>No members found</Text>
      ) : (
        <Flex gap={10} wrap={"wrap"}>
          {filteredMembers.map((member) => (
            <Paper
              key={member.user_id}
              shadow="sm"
              radius="md"
              withBorder
              pb={10}
              px={15}
              ta={"start"}
              bg={"gray.0"}
              w={500}
              p={20}
            >
              <Flex gap={10} align={"start"} justify={"space-between"}>
                <Flex gap={14}>
                  <Avatar src={member.user_profile_pic_url} size={50} />
                  <Flex direction={"column"} justify={"start"}>
                    <Title
                      ff={"poppins"}
                      c={"dark.5"}
                      fz={20}
                      fw={600}
                      lts={-1}
                    >
                      {member.user_name}
                    </Title>
                    <Text ff={"poppins"} fz={12} fw={500} c={"dark.2"}>
                      {member.user_email}
                    </Text>
                  </Flex>
                </Flex>
                {member.user_role === "admin" && (
                  <Badge variant="outline" color="orange">
                    Admin
                  </Badge>
                )}
              </Flex>
            </Paper>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default ProjectPageMembers;
