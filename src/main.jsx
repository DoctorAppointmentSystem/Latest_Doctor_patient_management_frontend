import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { AppointmentProvider, PatientProvider, VisitProvider } from './context/index.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PatientProvider>
      <AppointmentProvider>
        <VisitProvider>
          <App />
        </VisitProvider>
      </AppointmentProvider>
    </PatientProvider>
  </React.StrictMode>
)
