import { Box, NavLink, Stack, Title } from '@mantine/core'
import React from 'react'
import {NavLink as RouterNavLink} from 'react-router-dom'

const Navbar = ({ onLinkClick }) => {
  return (
  <Box pt={20}>
      
      <NavLink component={RouterNavLink} to="/" label="Dashboard" color="orange.8"  
      variant="filled" fw={500} onClick={onLinkClick} />
      <NavLink component={RouterNavLink} to="/project" label="Projects" color="orange.8"
      variant="filled" fw={500}defaultOpened >
        <NavLink component={RouterNavLink} to="/user-projects" label="Your Projects" color="orange.8"
      variant="filled" fw={500} onClick={onLinkClick} />
        <NavLink component={RouterNavLink} to="/projects/create" label="Create New Project" color="orange.8"
      variant="filled" fw={500} onClick={onLinkClick} />
      </NavLink>
      <NavLink component={RouterNavLink} to="/tasks" label="Tasks" color="orange.8"
      variant="filled" fw={500} onClick={onLinkClick} />

      </Box>
  
  )
}

export default Navbar