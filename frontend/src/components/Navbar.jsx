import { NavLink, Stack, Title } from '@mantine/core'
import React from 'react'

const Navbar = () => {
  return (
    <Stack
      h={100}
      align="start"
      justify="start"
      gap="xs"
      py={20}
      px={10}
    >
      <NavLink
        href="#required-for-focus"
        label="Dashboard"
        c={'orange'}
        active
      />
      
       <NavLink
        href="#required-for-focus"
        label="Projects"
        
        
      />
       <NavLink
        href="#required-for-focus"
        label="Tasks"
        
        
      />
      
      </Stack>
  )
}

export default Navbar