import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";
import Layout from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AppHome from "./pages/AppHome"; // ✅ FIXED: Import AppHome
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
import VisionandRefraction from "./pages/VisionandRefraction";
import Examination from "./pages/Examination";
import DiagnosisForm from "./pages/DiagnosisForm";
import PrescriptionPage from "./pages/Prescriptionpage";
import ExpenseEntry from "./pages/ExpenseEntry"; // ✅ NEW
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
 * If role-based restriction is needed, it checks the user's role.
 */
const ProtectedElement = ({ element, allowedRoles = [] }) => {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Check role if restricted
  if (allowedRoles.length > 0) {
    const userRole = getItemWithExpiry('userRole'); // Current role
    if (!allowedRoles.includes(userRole)) {
      console.warn(`Unauthorized access attempt to role-protected route. Role: ${userRole}`);
      return <Navigate to="/" replace />; // Redirect to home/dashboard
    }
  }

  return element;
};

// Define standard role access groups
const CLINICAL_ROLES = ["doctor", "refractionist"];
const DOCTOR_ONLY = ["doctor"];
const ALL_ROLES = ["doctor", "refractionist", "receptionist"];

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
      // ✅ FIXED: Render AppHome as the default home page instead of redirecting
      { index: true, element: <AppHome /> },
      { path: "/patientlist", element: <ProtectedElement element={<PatientList />} allowedRoles={CLINICAL_ROLES} /> },
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
      { path: "/expenses", element: <ExpenseEntry /> }, 
    ]
  },
  {
    // Protected patient-specific layout routes
    path: "/patient/*",
    element: <ProtectedElement element={<PLayout />} />,
    children: [
      { path: "addnewvisit", element: <ProtectedElement element={<ADDNewVisit />} allowedRoles={CLINICAL_ROLES} /> },
      { path: "visionandrefraction", element: <ProtectedElement element={<VisionandRefraction />} allowedRoles={CLINICAL_ROLES} /> },
      { path: "examination", element: <ProtectedElement element={<Examination />} allowedRoles={CLINICAL_ROLES} /> },
      { path: "diagnosisform", element: <ProtectedElement element={<DiagnosisForm />} allowedRoles={DOCTOR_ONLY} /> },
      { path: "Prescriptionpage", element: <ProtectedElement element={<PrescriptionPage />} allowedRoles={DOCTOR_ONLY} /> },
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