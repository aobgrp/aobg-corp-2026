import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { initBotId } from 'botid/client/core'
import './index.css'
import App from './App.tsx'
import AgentsPage from './AgentsPage.tsx'
import { AnnouncementBanner } from './components/AnnouncementBanner.tsx'

initBotId({
  protect: [{ path: '/api/contact', method: 'POST' }],
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnnouncementBanner />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
