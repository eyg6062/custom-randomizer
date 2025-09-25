import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css';

import TestApp from './TestApp.tsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { showErrorNotification } from './Utils/showNotifications.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => showErrorNotification(error)
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <MantineProvider defaultColorScheme="dark">
        <Notifications />

        <TestApp />

      </MantineProvider>
      
    </QueryClientProvider>
  </StrictMode>,
)
