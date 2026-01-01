import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { AppointmentProvider, PatientProvider, VisitProvider } from './context/index.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './components/Toast.jsx' // ✅ Toast notifications

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <PatientProvider>
        <AppointmentProvider>
          <VisitProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </VisitProvider>
        </AppointmentProvider>
      </PatientProvider>
    </ToastProvider>
  </React.StrictMode>
)

