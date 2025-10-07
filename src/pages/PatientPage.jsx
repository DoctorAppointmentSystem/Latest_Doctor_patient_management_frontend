import { Link, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentsById } from "../api/appointments";
import { getPatientsById } from "../api/patient";
import Loader from "../components/Loader";
import Profile from "./patientpages/Profile";
import Appointment from "./patientpages/Appointment";
import Visits from "./patientpages/Visits";
import Diagnostic from "./patientpages/Diagnostic";
import Procedure from "./patientpages/Procedure";
import FamilyMembers from "./patientpages/FamilyMembers";
import HistoryP from "./patientpages/HistoryP";
import Intial from "./patientpages/Intial";
import { PatientContext } from "../context";

function PatientPage() {
  const { patientData, setPatientData, clearPatientData } = useContext(PatientContext);
  // const [patientData, setPatientData] = useState(null);
  const { id } = useParams();
  const [apptId, setAppId] = useState(id);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("intial");
  const [active, setActive] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getAppointmentsById(id);
        const appointment = res.data?.data || res.data;
        if (appointment && appointment.patientId) {
          setPatientId(appointment.patientId._id);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (patientId) {
        try {
          const res = await getPatientsById(patientId);
          setPatientData(res.data?.data || res.data);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-highlight ">
        <div className="flex items-start gap-4 text-white">
          <div className="w-[100px] border-2">
            <img
              src="https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?uid=R137875917&ga=GA1.1.2032350152.1743826403&semt=ais_items_boosted&w=740"
              alt="Patient Management System"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                {patientData?.patient_name}
              </h1>
              <h2>
                ({patientData?.age} years, {patientData?.gender})
              </h2>
              <div className="text-green-400">{patientData?.phone_number}</div>
            </div>
            <div>
              {/* <p>{patientData?.city}</p> */}
              <p>
                {patientData?.address},{patientData?.city}
              </p>
            </div>

            <div>here some discription</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => {setPage('profile'), setActive("profile")}} className="border-1 border-primary px-4 py-2 rounded-sm text-primary">
            Edit Profile
          </button>

          <Link to="/patient/addnewvisit" className="px-4 py-2 rounded-sm text-white">
            ADD new Visit
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 p-4 shadow-xl">
        {/* <div className="bg-red-600"> */}
        <button onClick={() => {setPage('profile'); setActive("profile")}} className={`py-2 px-4 rounded-[5px] ${active === "profile" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Profile
        </button>
        <button onClick={() => {setPage('visits'); setActive("visits")}} className={`py-2 px-4 rounded-[5px] ${active === "visits" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Visits
        </button>
        <button onClick={() => {setPage('diagnostic'); setActive("diagnostic")}} className={`py-2 px-4 rounded-[5px] ${active === "diagnostic" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Diagnostic
        </button>
        <button onClick={() => {setPage('procedure'); setActive("procedure")}} className={`py-2 px-4 rounded-[5px] ${active === "procedure" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Procedure
        </button>
        <button onClick={() => {setPage('history'); setActive("history")}} className={`py-2 px-4 rounded-[5px] ${active === "history" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          History
        </button>
        <button onClick={() => {setPage('family_members'); setActive("family_members")}} className={`py-2 px-4 rounded-[5px] ${active === "family_members" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Family Members
        </button>
        <button onClick={() => {setPage('appointments'); setActive("appointments")}} className={`py-2 px-4 rounded-[5px] ${active === "appointments" ? "bg-highlight text-primary" : "bg-gray-500 text-white"} hover:bg-highlight hover:text-primary`}>
          Appointments
        </button> 
        {/* </div> */}
      </div>
      {page === "loading" && <Loader />}
      {page === "intial" && <Intial />}
      {page === "profile" && <Profile />}
      {page === "visits" && <Visits />}
      {page === "diagnostic" && <Diagnostic />}
      {page === "procedure" && <Procedure />}
      {page === "history" && <HistoryP />}
      {page === "family_members" && <FamilyMembers />}
      {page === "appointments" && <Appointment patientData={patientData}/>}
      {page === "unknown1" && <div>Unknown Page</div>}
      {page === "unknown2" && <div>Unknown Page</div>}
    </div>
  );
}

export default PatientPage;
