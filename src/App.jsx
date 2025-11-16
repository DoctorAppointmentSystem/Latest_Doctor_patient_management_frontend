import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  Outlet 
} from "react-router-dom";
import Layout from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PatientList from "./pages/PatientList";
import OPD from "./pages/OPD";
import Prefrences from "./pages/Prefrences";
import AddNewPatient from "./pages/AddNewPatient";
import AppointmentPage from "./pages/AppointmentPage";
import DiscountTypes from "./pages/DiscountTypes";
import Patientscreen from "./pages/Patientsscreen";
import ShowCashReportPage from "./pages/ShowCashReportPage";
import PatientTokenPage from "./pages/PatientTokenPage";
import ReportPage from "./pages/ReportPage";
import PLayout from "./pages/PatientHome";
import ADDNewVisit from "./pages/ADDNewVisit";
import DailyCashReport from "./pages/DailyCashReport";
import PatientRecentOPD from "./pages/PatientRecentOPD";
import TodaysReservation from "./pages/TodaysReservation";
import PatientPage from "./pages/PatientPage";
// FIXME: This import is likely wrong. 
// VisionandRefraction should be imported from its own file.
import VisionandRefraction from "./pages/PatientPage"; 
import Examination from "./pages/Examination";
import DiagnosisForm from "./pages/DiagnosisForm";
import PrescriptionPage from "./pages/Prescriptionpage";
import { getItemWithExpiry } from "./services/token";

// Force logout on every app load (for development/testing)
// COMMENT THIS OUT for production or real testing!
// localStorage.removeItem('token');

function isAuthenticated() {
  return !!getItemWithExpiry('token'); 
}

/**
 * A wrapper component to protect routes.
 * If authenticated, it renders the component.
 * If not, it redirects the user to the /login page.
 */
const ProtectedElement = ({ element }) => {
  if (!isAuthenticated()) {
    // Redirect to login, replacing the current history entry
    return <Navigate to="/login" replace />;
  }
  // Render the protected component
  return element;
};

// --- Define the ENTIRE router structure ---
const router = createBrowserRouter([
  {
    // Public route
    path: "/login",
    element: <LoginPage />
  },
  {
    // Protected main layout routes
    path: "/",
    element: <ProtectedElement element={<Layout />} />,
    children: [
      // Redirect from "/" to "/patientlist"
      { index: true, element: <Navigate to="/patientlist" replace /> },
      { path: "/patientlist", element: <PatientList /> },
      { path: "/dailycashreport", element: <DailyCashReport /> },
      { path: "/patientrecentopd", element: <PatientRecentOPD /> },
      { path: "/opd", element: <OPD /> },
      { path: "/prefrences", element: <Prefrences /> },
      { path: "/todaysreservation", element: <TodaysReservation /> },
      { path: "/addpatient", element: <AddNewPatient /> },
      { path: "/appointment", element: <AppointmentPage /> },
      { path: "/discounttypes", element: <DiscountTypes /> },
      { path: "/patientscreen", element: <Patientscreen /> },
      { path: "/cashReport", element: <ShowCashReportPage /> },
    ]
  },
  {
    // Protected patient-specific layout routes
    path: "/patient", // No '*' needed
    element: <ProtectedElement element={<PLayout />} />,
    children: [
      { path: "addnewvisit", element: <ADDNewVisit /> },
      { path: "visionandrefraction", element: <VisionandRefraction /> },
      { path: "examination", element:<Examination />},
      { path: "diagnosisform", element:<DiagnosisForm />},
      { path: "Prescriptionpage", element:<PrescriptionPage />},
    ]
  },
  {
    // Other top-level protected routes
    path: "/patientpage/:id",
    element: <ProtectedElement element={<PatientPage />} />,
  },
  {
    path: "/token",
    element: <ProtectedElement element={<PatientTokenPage />} />
  },
  {
    path: "/report",
    element: <ProtectedElement element={<ReportPage />} />
  },
  {
    // Fallback route: redirects to the correct home page
    path: "*",
    element: <Navigate to={isAuthenticated() ? "/" : "/login"} replace />
  }
]);


function App() {
  // The App component just needs to provide the router
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;