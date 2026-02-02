import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PatientContext, AppointmentContext } from "../context";
import { getNextToken } from "../api/appointments";
import { getDoctors } from "../api/doctors";
import { getServices } from "../api/services";
import toast from 'react-hot-toast';
import Loader from "../components/Loader";

const sources = ["Self", "Referral"];
const bdms = ["BDM One", "BDM Two"];

function AppointmentPage() {
  const navigate = useNavigate();
  // ✅ NEW: Get location state for service auto-selection
  const location = useLocation();
  const serviceTypeToAdd = location.state?.serviceType;

  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  // ✅ NEW: Dynamic lists from backend
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const { patientData, setPatientData } = useContext(PatientContext);
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  // ✅ NEW: Fetch doctors and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, servicesRes] = await Promise.all([
          getDoctors(),
          getServices(),
        ]);

        setDoctors(doctorsRes.data.data);
        setServices(servicesRes.data.data);

        // Set default selections
        if (doctorsRes.data.data.length > 0) {
          setSelectedDoctor(doctorsRes.data.data[0].name);
        }
        if (servicesRes.data.data.length > 0) {
          // ✅ NEW: Auto-select service if passed from dashboard
          if (serviceTypeToAdd && servicesRes.data.data.some(s => s.name === serviceTypeToAdd)) {
            setSelectedService(serviceTypeToAdd);
          } else {
            setSelectedService(servicesRes.data.data[0].name);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load doctors/services");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ NEW: Fetch next available token on page load
  useEffect(() => {
    const fetchNextToken = async () => {
      try {
        const res = await getNextToken();
        const nextToken = res.data.nextToken;
        setToken(nextToken); // Auto-fill with suggested token
      } catch (err) {
        console.error("Error fetching next token:", err);
        setToken("1"); // Fallback to 1
      }
    };
    fetchNextToken();
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedPatientId");
    if (storedId) {
      setPatientId(storedId);
    }

    const fetchPatient = async () => {
      if (!storedId) return;
      try {
        const res = await fetch(`http://localhost:3000/api/patients/${storedId}`);
        if (!res.ok) throw new Error("Failed to fetch patient");
        const data = await res.json();
        setPatient(data.data);
        setPatientData({ _id: data.data._id, name: data.data.patient_name, doctor: "", service: "" });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const handleContinue = () => {
    if (!selectedDoctor || !selectedService) {
      toast.error("⚠️ Please select both doctor and service.");
      return;
    }
    setAppointmentData({ ...appointmentData, manualToken: token, doctor: selectedDoctor, serviceType: selectedService, patientId: patient._id });
    setPatientData({ ...patientData, doctor: selectedDoctor, service: selectedService });
    // Pass the selected doctor and service to the next page
    navigate("/cashReport");
    // navigate(
    //   `/cashReport?doctor=${encodeURIComponent(selectedDoctor)}&service=${encodeURIComponent(selectedService)}&patient=${encodeURIComponent(patient?.patient_name || "Patient Name")}`,
    // );
  };

  if (loading || dataLoading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-highlight ">
        <div className="flex items-start gap-4 text-white">
          <div className="w-[100px] h-[100px] border-2 rounded-lg overflow-hidden flex items-center justify-center bg-white">
            {/* Dynamic Avatar based on patient initials */}
            <div
              className={`w-full h-full flex items-center justify-center text-3xl font-bold ${patient?.gender === 'Male'
                ? 'bg-blue-500 text-white'
                : patient?.gender === 'Female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-500 text-white'
                }`}
            >
              {patient?.patient_name
                ? patient.patient_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                : '?'
              }
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2>
                {patient?.patient_name} ({patient?.age} years, {patient?.gender})
              </h2>
              <div className="text-green-400">{patient.phone_number}</div>
            </div>

            <div>
              <p>
                Address: {patient?.address} {patient?.city}
              </p>
            </div>

            <div>
              Mr#: {patient?.check_nub} | Created just now by: {patient?.relation}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="text-right">
            <p className="text-sm">S/o {patient?.father_name}</p>
            <p className="text-sm">
              Address: {patient?.address} {patient?.city}
            </p>
            <p className="text-2xl font-bold flex items-center justify-end gap-2">
              <span>Token:</span>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-24 text-center border-2 border-primary rounded-md outline-none transition-all duration-200"
              />
            </p>
          </div>
        </div>
      </div>

      <h2 className="block text-sm font-medium m-4">Patient Assigned to Panel:</h2>
      <h2 className="block  font-medium text-primary m-4">
        Private Jamil Eye Care Sahiwal
      </h2>

      {/* Main Form */}
      <div className="bg-white rounded-lg p-4 shadow space-y-4 m-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium">Please select doctor</label>
            <select
              className="mt-1 w-full border border-primary outline-primary rounded p-2"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Please select Service Type</label>
            <select
              className="mt-1 w-full border border-primary outline-primary rounded p-2"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map((service) => (
                <option key={service._id} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleContinue}
            className="bg-acent text-primary px-4 py-2 rounded hover:bg-highlight"
          >
            Continue
          </button>
        </div>

        <div className="w-full flex items-center justify-center">
          <h1>====== Optional Datails ======</h1>
        </div>

        {/* Optional Detail */}
        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Select Appointments Source</label>
            <select className="mt-1 w-full border rounded p-2">
              {sources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Select a BDM</label>
            <select className="mt-1 w-full border rounded p-2">
              {bdms.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Ref By</label>
            <input className="mt-1 w-full border rounded p-2" placeholder="Ref By" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium">Remarks</label>
            <input className="mt-1 w-full border rounded p-2" placeholder="Remarks" />
          </div>
        </div>
      </div>

      {/* Change Panel Section */}
      <div className="bg-white rounded-lg p-4 shadow space-y-4 m-4">
        <p className="text-center text-blue-500 font-medium">
          ----- Change Patient Panel for this reservation only -----
        </p>
        <input type="text" placeholder="Search" className="border rounded p-2 w-full md:w-1/3 mx-auto" />
        <table className="w-full text-sm border-t mt-2">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="py-2">Sr#</th>
              <th>Panel</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">1</td>
              <td>Panel A</td>
              <td>Address A</td>
              <td><button className="text-blue-500">Action</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentPage;
