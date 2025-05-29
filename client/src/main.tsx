import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'

import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import About from './pages/About.tsx'
import TestApp from './TestApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TestApp />
    </BrowserRouter>
  </StrictMode>,
)
