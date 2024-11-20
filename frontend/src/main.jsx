import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import { ProjectProvider } from './contexts/ProjectContext.jsx'
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
    <MantineProvider>
    <Notifications />
    <ModalsProvider>
    <App />
    </ModalsProvider>
    </MantineProvider>
    </ProjectProvider>
  </StrictMode>,
)
