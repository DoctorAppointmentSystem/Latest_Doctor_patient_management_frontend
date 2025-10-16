import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import { createPatient, getAllPatients } from "../api/patient"; 
import Loader from "../components/Loader";
import { AppointmentContext, PatientContext } from "../context";
import calculateDOBFromAge from "../services/dobCalculator";

function PatientList() {
  const { clearPatientData } = useContext(PatientContext);
  const navigate = useNavigate();
  const { setAppointmentData, defaultAppointmentData } = useContext(AppointmentContext);
  
  // --- START: State Management ---
  // Controls which view is active: 'appointments', 'addPatient', or 'allPatients'
  const [view, setView] = useState('appointments'); 

  // State for the "Add Patient" form
  const [formData, setFormData] = useState({
      patient_name: "", father_name: "", gender: "", age: "", years: "", date_of_birth: "",
      country_code: "+92", phone_number: "", address: "", city: "", check_nub: "",
      relation: "Self", guardian_name : "", gardian_email: "", gardian_cnic: "",
      gardian_profession: "", oldmr: "", referenced: "", history: "",
  });

  // State for Today's Appointments view
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState('all');

  // State for the "All Patients" view
  const [allPatientsLoading, setAllPatientsLoading] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [filteredAllPatients, setFilteredAllPatients] = useState([]);
  const [allPatientsSearchQuery, setAllPatientsSearchQuery] = useState("");
  // --- END: State Management ---

  // Effect to fetch today's appointments (runs once on mount)
  useEffect(() => {
    clearPatientData();
    const fetchAppointments = async () => {
      setAppointmentsLoading(true);
      try {
        const res = await getAppointments();
        const data = res.data;
        const allAppointmentsList = Array.isArray(data) ? data : data.data || [];
        const todayString = new Date().toISOString().split("T")[0];
        const todaysApptsFromServer = allAppointmentsList.filter((appt) => {
          if (!appt.createdAt) return false;
          const apptDateString = new Date(appt.createdAt).toISOString().split("T")[0];
          return apptDateString === todayString;
        });
        setTodaysAppointments(todaysApptsFromServer);
        setFilteredAppointments(todaysApptsFromServer);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setAppointmentsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Effect for filtering today's appointments
  useEffect(() => {
    let filtered = todaysAppointments;
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(appt => appt.serviceType?.toLowerCase() === serviceFilter.toLowerCase());
    }
    if (nameSearch) {
      filtered = filtered.filter(appt => appt.patientId?.patient_name?.toLowerCase().includes(nameSearch.toLowerCase()));
    }
    if (phoneSearch) {
      filtered = filtered.filter(appt => appt.patientId?.phone_number?.includes(phoneSearch));
    }
    setFilteredAppointments(filtered);
  }, [nameSearch, phoneSearch, todaysAppointments, serviceFilter]);

  // Effect to fetch ALL patients when switching to the 'allPatients' view
  useEffect(() => {
    if (view === 'allPatients' && allPatients.length === 0) { // Fetch only once
      const fetchAllPatients = async () => {
        setAllPatientsLoading(true);
        try {
          const res = await getAllPatients(); // Assumes this API call exists
          const patientsData = res.data.data || res.data || [];
          setAllPatients(patientsData);
          setFilteredAllPatients(patientsData);
        } catch (error) {
          console.error("Error fetching all patients:", error);
        } finally {
          setAllPatientsLoading(false);
        }
      };
      fetchAllPatients();
    }
  }, [view, allPatients.length]);

  // Effect for filtering the "All Patients" list
  useEffect(() => {
    if (allPatientsSearchQuery) {
      const lowercasedQuery = allPatientsSearchQuery.toLowerCase();
      const filtered = allPatients.filter(p =>
        p.patient_name?.toLowerCase().includes(lowercasedQuery) ||
        p.phone_number?.includes(lowercasedQuery)
      );
      setFilteredAllPatients(filtered);
    } else {
      setFilteredAllPatients(allPatients);
    }
  }, [allPatientsSearchQuery, allPatients]);

  const handleAddVisit = (id) => {
    navigate(`/patientpage/${id}`);
    setAppointmentData({ ...defaultAppointmentData, _id: id });
  };
  
  const handleCreatePatient = async (formData) => {
    const payload = {
      patient_name: formData.patient_name, father_name: formData.father_name, phone_number: formData.phone_number,
      age: formData.age, gender: formData.gender, date_of_birth: formData.date_of_birth,
      address: formData.address, city: formData.city, check_nub: formData.check_nub,
      appointment_by: formData.relation, old_mrn: formData.oldmr,
      guardian: {
        relation: formData.relation?.toLowerCase() || "self", name: formData.guardian_name,
        cnic: formData.gardian_cnic, email: formData.gardian_email, profession: formData.gardian_profession,
      },
      reference_history: {
        reference_by: formData.referenced, history_type: "public", public_notes: formData.history,
      },
    };
    try {
      const res = await createPatient(payload);
      const data = res.data;
      const pId = data.data._id;
      localStorage.setItem("selectedPatientId", pId);
      alert("Patient created successfully!");
      setFormData({
        patient_name: "", father_name: "", gender: "Male", age: "", date_of_birth: "", country_code: "+92",
        phone_number: "", address: "", city: "", check_nub: "", relation: "Self", guardian_name: "",
        gardian_email: "", gardian_cnic: "", gardian_profession: "", oldmr: "", referenced: "", history: "",
      });
      navigate(`/appointment`); 
    } catch (error) {
      console.error("Error creating patient:", error);
      alert(error.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "age" && value !== "") {
        updatedForm.date_of_birth = calculateDOBFromAge(Number(value));
      }
      return updatedForm;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* --- Top Buttons --- */}
      <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
        <button
          onClick={() => setView('allPatients')}
          className="w-[49%] border-1 border-black p-4 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
        >
          Total Patient Registered
        </button>
        <button
          onClick={() => {
            if (view === 'addPatient' || view === 'allPatients') {
              setView('appointments');
            } else {
              setView('addPatient');
            }
          }}
          className="w-[49%] bg-acent hover:bg-highlight p-4 rounded-lg flex items-center justify-center text-primary"
        >
          {view === 'addPatient' || view === 'allPatients' ? "View Today's Appointments" : "+ ADD Patient"}
        </button>
      </div>

      {/* --- CONDITIONAL RENDERING OF VIEWS --- */}

      {view === 'addPatient' && (
        // --- Add New Patient Form View ---
        <div className="bg-white rounded-lg shadow-xl flex flex-col items-center justify-between gap-2">
            <div className="text-gray-600 w-full">
                        <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-between gap-2">
                          <h2 className=" text-primary text-xl font-semibold mt-3">
                            Name & Gender
                          </h2>
            
                          <div className="bg-highlight text-primary flex items-center justify-center w-full">
                            ========Required========
                          </div>
            
                          <div className="flex gap-2 w-full">
                            <input
                              name="patient_name"
                              value={formData.patient_name}
                              onChange={handleChange}
                              type="text"
                              placeholder="Patient Name"
                              className="w-[50%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                            <input
                              name="father_name"
                              value={formData.father_name}
                              onChange={handleChange}
                              type="text"
                              placeholder="Father/Husband Name"
                              className="w-[50%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          {/* Gender, Age, Years, DOB */}
                          <div className="flex gap-2 w-full">
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            >
                              <option value="">Choose Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
            
                            <input
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              type="text"
                              placeholder="Age in years"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            {/* <input
                              name="years"
                              value={formData.years}
                              onChange={handleChange}
                              type="text"
                              placeholder="# years"
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            /> */}
            
                            <input
                              name="date_of_birth"
                              value={formData.date_of_birth}
                              onChange={handleChange}
                              type="date"
                              placeholder="Date of Birth"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          {/* Country code & Phone */}
                          <div className="flex gap-2 w-full">
                            <select
                              name="country_code"
                              value={formData.country_code}
                              onChange={handleChange}
                              className="w-[10%] border-1 border-black p-4 rounded-lg mb-2"
                            >
                              <option value="+92">+92</option>
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                            </select>
            
                            <input
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              type="text"
                              placeholder="Phone Number"
                              className="w-[90%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          {/* Address, City, Check Nub, Relation */}
                          <div className="flex gap-2 w-full">
                            <input
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              type="text"
                              placeholder="Address"
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              type="text"
                              placeholder="City"
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              name="check_nub"
                              value={formData.check_nub}
                              onChange={handleChange}
                              type="text"
                              placeholder="Check Nub"
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <select
                              name="relation"
                              value={formData.relation}
                              onChange={handleChange}
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            >
                              <option value="Self">Self</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Husband">Husband</option>
                              <option value="Wife">Wife</option>
                              <option value="Brother">Brother</option>
                              <option value="Sister">Sister</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
            
                          <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">
                            Personal Information (Optional)
                          </h2>
            
                          <div className="flex gap-2 w-full">
                            <input
                              type="text"
                                name="oldmr"
                              placeholder="Old Mr Number"
                              value={formData.oldmr || ""}
                                onChange={handleChange}
                              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
                              <option value="1">***********</option>
                              <option value="2">***********</option>
                              <option value="3">***********</option>
                            </select>
            
                            <input
                              type="text"
                                name="guardian_name"
                              value={formData.guardian_name || ""}
                              onChange={handleChange}
                              placeholder="Guardian Name"
                              className="w-[85%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          <div className="flex gap-2 w-full">
                            <input
                              type="text"
                                name="gardian_cnic"
                              value={formData.gardian_cnic || ""}
                              onChange={handleChange}
                              placeholder="13 Digit Cnic Number"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              type="email"
                                name="gardian_email"
                              value={formData.gardian_email || ""}
                              onChange={handleChange}
                              placeholder="xxx@gamil.com"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              type="text"
                                name="gardian_profession"
                                value={formData.gardian_profession || ""}
                                onChange={handleChange}
                              placeholder="Profession"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">
                            References and History (optional)
                          </h2>
            
                          <div className="flex gap-2 w-full">
                            <input
                              type="text"
                              name="referenced"
                              value={formData.referenced || ""}
                                onChange={handleChange}
                              placeholder="Referenced by"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              type="text"
                                name="history"
                                value={formData.history || ""}
                                onChange={handleChange}
                              placeholder="Histroy of"
            
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              type="text"
            
                              placeholder="Private"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
            
                            <input
                              type="text"
                              placeholder="***********"
                              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                            />
                          </div>
            
                          <div
                            className="flex items-center justify-between w-full gap-2"
                          >
                            <Link
                              className="bg-primary hover:bg-highlight hover:text-primary py-2 px-4 text-white rounded-lg"
                              //   onClick={handleCreatePatient(formData)}
                              onClick={() => handleCreatePatient(formData)}
                            >
                              Create Patient
                            </Link>
            
                            <button className="bg-highlight py-2 px-4 text-primary rounded-lg">
                              Reset page
                            </button>
                          </div>
                        </div>
                      </div>
        </div>
      )}

      {view === 'allPatients' && (
        // --- All Patients List View ---
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <input
            type="text"
            placeholder="Search all patients by Name or Phone..."
            className="w-full p-3 border border-black rounded-lg mb-4"
            value={allPatientsSearchQuery}
            onChange={(e) => setAllPatientsSearchQuery(e.target.value)}
          />
          {allPatientsLoading && <Loader />}
          {!allPatientsLoading && filteredAllPatients.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow bg-white">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-2 border">Name</th><th className="p-2 border">Father Name</th><th className="p-2 border">Gender</th>
                    <th className="p-2 border">Age</th><th className="p-2 border">Phone</th><th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllPatients.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-100">
                      <td className="p-2 border">{p.patient_name}</td><td className="p-2 border">{p.father_name}</td>
                      <td className="p-2 border">{p.gender}</td><td className="p-2 border">{p.age}</td>
                      <td className="p-2 border">{p.phone_number}</td>
                      <td className="p-2 border text-primary cursor-pointer">
                        <Link to="/appointment" onClick={() => localStorage.setItem("selectedPatientId", p._id)} className="hover:underline">
                          Create Appointment
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!allPatientsLoading && allPatientsSearchQuery && filteredAllPatients.length === 0 && (
            <p className="text-red-500 mt-4 text-center">No patients found matching your search.</p>
          )}
        </div>
      )}

      {view === 'appointments' && (
        // --- Today's Appointments View ---
        <div>
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between mb-4">
              <button onClick={() => setServiceFilter('OPD')} className={`w-[24%] border-1 border-black p-4 rounded-lg flex items-center justify-center transition-all duration-300 ${serviceFilter === 'OPD' ? 'bg-primary text-white scale-105 shadow-lg' : 'border-b-6 border-b-green-800'}`}>OPD</button>
              <button onClick={() => setServiceFilter('Diagnostic')} className={`w-[24%] border-1 border-black p-4 rounded-lg flex items-center justify-center transition-all duration-300 ${serviceFilter === 'Diagnostic' ? 'bg-primary text-white scale-105 shadow-lg' : 'border-b-6 border-b-green-800'}`}>Diagnostic</button>
              <button onClick={() => setServiceFilter('Procedure')} className={`w-[24%] border-1 border-black p-4 rounded-lg flex items-center justify-center transition-all duration-300 ${serviceFilter === 'Procedure' ? 'bg-primary text-white scale-105 shadow-lg' : 'border-b-6 border-b-green-800'}`}>Procedure</button>
              <button onClick={() => setServiceFilter('all')} className={`w-[24%] border-1 border-black p-4 rounded-lg flex items-center justify-center transition-all duration-300 ${serviceFilter === 'all' ? 'bg-primary text-white scale-105 shadow-lg' : 'border-b-6 border-b-yellow-500'}`}>Show All</button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
              <input type="text" placeholder="Search by Patient Name" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} className="w-[33%] border-1 border-black p-4 rounded-lg"/>
              <input type="text" placeholder="Search by Phone Number" value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} className="w-[33%] border-1 border-black p-4 rounded-lg"/>
              <div className="w-[33%] bg-acent text-primary p-4 rounded-lg flex items-center justify-center cursor-default">Live Search Active</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-primary">Today's Appointments</h2>
                  <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg">Show Checked Out</button>
                </div>
                <table className="w-full text-primary border-collapse">
                  <thead className="border-1 border-black bg-gray-100">
                    <tr>
                      <th className="border-1 border-black p-2">Token</th><th className="border-1 border-black p-2">Name</th><th className="border-1 border-black p-2">Age</th><th className="border-1 border-black p-2">Gender</th><th className="border-1 border-black p-2">Doctor</th><th className="border-1 border-black p-2">Service</th><th className="border-1 border-black p-2">Add Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentsLoading ? (
                      <tr><td colSpan="7" className="p-4 text-center"><Loader /></td></tr>
                    ) : filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appt) => (
                        <tr key={appt._id} className="border-1 border-black">
                          <td className="border-1 border-black p-2">{appt.manualToken}</td>
                          <td className="border-1 border-black p-2">{appt.patientId?.patient_name}</td>
                          <td className="border-1 border-black p-2">{appt.patientId?.age}</td>
                          <td className="border-1 border-black p-2">{appt.patientId?.gender}</td>
                          <td className="border-1 border-black p-2">{appt.doctor}</td>
                          <td className="border-1 border-black p-2">{appt.serviceType}</td>
                          <td className="border-1 border-black p-2 text-center">
                            <button onClick={() => handleAddVisit(appt._id)} className="bg-primary text-white px-3 py-1 rounded hover:bg-highlight hover:text-primary">Add Visit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="7" className="border-1 border-black p-4 text-center text-gray-500">No appointments match your criteria.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;