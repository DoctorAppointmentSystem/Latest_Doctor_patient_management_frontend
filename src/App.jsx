import { BrowserRouter, createBrowserRouter } from "react-router";
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
import VisionandRefraction from "./pages/PatientPage";
import { RouterProvider } from "react-router-dom";
import { getItemWithExpiry } from "./services/token";

// Force logout on every app load (for development/testing)
localStorage.removeItem('token');


function isAuthenticated() {
  const loggedIn = getItemWithExpiry("isLoggedIn");
  console.log(loggedIn); // true or null if expired
  return loggedIn;
}


function App() {
  if (!isAuthenticated()) {
    // Wrap LoginPage in BrowserRouter so useNavigate works
    return (
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, 
      children: [
        {path:"/patientlist", element:<PatientList />},
        {path:"/dailycashreport", element:<DailyCashReport/>},
        {path:"/patientrecentopd", element:<PatientRecentOPD/>},
        {path:"/opd", element:<OPD/>},
        {path:"/prefrences", element:<Prefrences />},
        {path:"/todaysreservation", element:<TodaysReservation />},
        {path:"/addpatient", element:<AddNewPatient />},
        {path:"/appointment", element:<AppointmentPage />},
        {path: "/discounttypes", element:<DiscountTypes />},
        {path: "/patientscreen", element:<Patientscreen />},
        {path: "/cashReport", element:<ShowCashReportPage />},
      ]
    },
    {
      path: '/patientpage/:id',
      element: <PatientPage />, 
    },
    {
      path: "/token", element:<PatientTokenPage />
    },
    {
      path: "/report", element:<ReportPage />
    },
    {
      path: '/patient/*',
      element: <PLayout />, 
      children: [
        {path: 'addnewvisit', element: <ADDNewVisit />},
        {path: 'visionandrefraction', element: <VisionandRefraction />}
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App