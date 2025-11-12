import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { AppointmentProvider, PatientProvider, VisitProvider } from './context/index.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PatientProvider>
      <AppointmentProvider>
        <VisitProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </VisitProvider>
      </AppointmentProvider>
    </PatientProvider>
  </React.StrictMode>
)
