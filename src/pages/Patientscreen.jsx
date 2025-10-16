import { useState, useEffect } from "react";
import calculateDOBFromAge from "../services/dobCalculator";
import { Link, useNavigate } from "react-router-dom";
import { createPatient, getAllPatients } from "../api/patient";

function Patientscreen() {
  const [patientAdd, setPatientAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("patient_name");
  
  // Define the initial state for the form so it can be reused
  const initialFormData = {
    patient_name: "",
    father_name: "",
    gender: "",
    age: "",
    years: "",
    date_of_birth: "",
    country_code: "+92",
    phone_number: "",
    address: "",
    city: "",
    check_nub: "",
    relation: "Self",
    guardian_name : "",
    gardian_email: "",
    gardian_cnic: "",
    gardian_profession: "",
    oldmr: "",
    referenced: "",
    history: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleOpenPatient = () => {
    setPatientAdd((prev) => !prev);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      if (!searchQuery.trim()) {
        setPatients([]);
        return;
      }
      if (!isNaN(searchQuery)) {
        setCategory("phone_number");
      } else {
        setCategory("patient_name");
      }

      setLoading(true);
      try {
        const res = await getAllPatients(category, searchQuery);
        const data = await res.data;
        setPatients(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPatients, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, category]); // Added category to dependency array for correctness

  const handleCreatePatient = async (formData) => {
    const payload = {
      patient_name: formData.patient_name,
      father_name: formData.father_name,
      phone_number: formData.phone_number,
      age: formData.age,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      address: formData.address,
      city: formData.city,
      check_nub: formData.check_nub,
      appointment_by: formData.relation,
      old_mrn: formData.oldmr,
      guardian: {
        relation: formData.relation?.toLowerCase() || "self",
        name: formData.guardian_name,
        cnic: formData.gardian_cnic,
        email: formData.gardian_email,
        profession: formData.gardian_profession,
      },
      reference_history: {
        reference_by: formData.referenced,
        history_type: "public",
        public_notes: formData.history,
      },
    };

    try {
      const res = await createPatient(payload);
      const data = res.data;
      const pId = data.data._id;
      localStorage.setItem("selectedPatientId", pId);
      alert("Patient created successfully!");
      setPatientAdd(false);
      setFormData(initialFormData); // Reset form
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

  // --- START: New function to reset the form ---
  const handleResetForm = () => {
    console.log("Resetting form...");
    setFormData(initialFormData);
  };
  // --- END: New function ---

  return (
    <div className="flex flex-col gap-4">
      {/* Add Patient Button */}
      <div
        onClick={handleOpenPatient}
        className="w-full p-4 bg-acent text-primary text-xl rounded-lg hover:bg-highlight transition-colors text-center cursor-pointer"
      >
        {patientAdd ? "Close Form" : "Add Patient"}
      </div>

      {/* Patient Form */}
      {patientAdd && (
          <div className="text-gray-600 w-full">
            <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-between gap-2">
              <h2 className=" text-primary text-xl font-semibold mt-3">
                Name & Gender
              </h2>
              <div className="bg-highlight text-primary flex items-center justify-center w-full">
                ========Required========
              </div>
              <div className="flex gap-2 w-full">
                <input name="patient_name" value={formData.patient_name} onChange={handleChange} type="text" placeholder="Patient Name" className="w-[50%] border-1 border-black p-4 rounded-lg mb-2" />
                <input name="father_name" value={formData.father_name} onChange={handleChange} type="text" placeholder="Father/Husband Name" className="w-[50%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <div className="flex gap-2 w-full">
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-[33%] border-1 border-black p-4 rounded-lg mb-2">
                  <option value="">Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input name="age" value={formData.age} onChange={handleChange} type="text" placeholder="Age in years" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} type="date" placeholder="Date of Birth" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <div className="flex gap-2 w-full">
                <select name="country_code" value={formData.country_code} onChange={handleChange} className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
                  <option value="+92">+92</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input name="phone_number" value={formData.phone_number} onChange={handleChange} type="text" placeholder="Phone Number" className="w-[90%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <div className="flex gap-2 w-full">
                <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Address" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />
                <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />
                <input name="check_nub" value={formData.check_nub} onChange={handleChange} type="text" placeholder="Check Nub" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />
                <select name="relation" value={formData.relation} onChange={handleChange} className="w-[25%] border-1 border-black p-4 rounded-lg mb-2">
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
              <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">Personal Information (Optional)</h2>
              <div className="flex gap-2 w-full">
                <input type="text" name="oldmr" placeholder="Old Mr Number" value={formData.oldmr || ""} onChange={handleChange} className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />
                <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2"><option value="1">***********</option></select>
                <input type="text" name="guardian_name" value={formData.guardian_name || ""} onChange={handleChange} placeholder="Guardian Name" className="w-[85%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <div className="flex gap-2 w-full">
                <input type="text" name="gardian_cnic" value={formData.gardian_cnic || ""} onChange={handleChange} placeholder="13 Digit Cnic Number" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="email" name="gardian_email" value={formData.gardian_email || ""} onChange={handleChange} placeholder="xxx@gamil.com" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="text" name="gardian_profession" value={formData.gardian_profession || ""} onChange={handleChange} placeholder="Profession" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">References and History (optional)</h2>
              <div className="flex gap-2 w-full">
                <input type="text" name="referenced" value={formData.referenced || ""} onChange={handleChange} placeholder="Referenced by" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="text" name="history" value={formData.history || ""} onChange={handleChange} placeholder="Histroy of" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="text" placeholder="Private" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="text" placeholder="***********" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
              </div>
              <div className="flex items-center justify-between w-full gap-2">
                <button onClick={() => handleCreatePatient(formData)} className="bg-primary hover:bg-highlight hover:text-primary py-2 px-4 text-white rounded-lg">
                  Create Patient
                </button>
                {/* --- THIS BUTTON IS NOW FUNCTIONAL --- */}
                <button onClick={handleResetForm} className="bg-highlight py-2 px-4 text-primary rounded-lg">
                  Reset page
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Search Input and Results */}
      <div>
        <input
          type="text"
          placeholder="Search Patient by Name or Phone"
          className="w-full p-3 border border-black rounded-lg mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && patients.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow bg-white">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-2 border">Name</th><th className="p-2 border">Father Name</th><th className="p-2 border">Gender</th>
                  <th className="p-2 border">Age</th><th className="p-2 border">Phone</th><th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
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
        {!loading && searchQuery && patients.length === 0 && (
          <p className="text-red-500">No patients found</p>
        )}
      </div>
    </div>
  );
}

export default Patientscreen;