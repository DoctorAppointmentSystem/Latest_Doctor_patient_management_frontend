import React, { createContext, useState, useEffect } from "react";
import { defaultPatientData } from "./patient";
import { defaultAppointmentData } from "./appointment";
import { defaultVisitData } from "./visitData";

/* =======================
   Default Patient Data
======================= */
export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(() => {
    const saved = localStorage.getItem("patientData");
    return saved ? JSON.parse(saved) : defaultPatientData;
  });

  useEffect(() => {
    if (patientData && patientData._id) {
      localStorage.setItem("patientData", JSON.stringify(patientData));
    } else {
      localStorage.removeItem("patientData");
    }
  }, [patientData]);

  const clearPatientData = () => {
    setPatientData(defaultPatientData);
    localStorage.removeItem("patientData");
  };

  return (
    <PatientContext.Provider
      value={{ patientData, setPatientData, clearPatientData, defaultPatientData }}
    >
      {children}
    </PatientContext.Provider>
  );
};

/* =======================
   Default Appointment Data
======================= */
export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointmentData, setAppointmentData] = useState(() => {
    const saved = localStorage.getItem("appointmentData");
    return saved ? JSON.parse(saved) : defaultAppointmentData;
  });

  useEffect(() => {
    if (appointmentData && appointmentData._id) {
      localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    } else {
      localStorage.removeItem("appointmentData");
    }
  }, [appointmentData]);

  const clearAppointmentData = () => {
    setAppointmentData(defaultAppointmentData);
    localStorage.removeItem("appointmentData");
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setAppointmentData,
        clearAppointmentData,
        defaultAppointmentData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

/* =======================
   Default Visit Data
======================= */
export const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [visitData, setVisitData] = useState(() => {
    const saved = localStorage.getItem("visitData");
    return saved ? JSON.parse(saved) : defaultVisitData;
  });

  useEffect(() => {
    if (visitData && visitData.patientId) {
      localStorage.setItem("visitData", JSON.stringify(visitData));
    } else {
      localStorage.removeItem("visitData");
    }
  }, [visitData]);

  const clearVisitData = () => {
    setVisitData(defaultVisitData);
    localStorage.removeItem("visitData");
  };

  return (
    <VisitContext.Provider
      value={{ visitData, setVisitData, clearVisitData, defaultVisitData }}
    >
      {children}
    </VisitContext.Provider>
  );
};
