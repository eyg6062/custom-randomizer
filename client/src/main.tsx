import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import '@mantine/core/styles.css'

import TestApp from './TestApp.tsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider defaultColorScheme="dark">
        <TestApp />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
