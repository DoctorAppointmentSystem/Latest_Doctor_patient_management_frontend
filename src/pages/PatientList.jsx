import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import Loader from "../components/Loader";
import { AppointmentContext, PatientContext } from "../context";

function PatientList() {
  const { clearPatientData } = useContext(PatientContext);
  const [addNewPatient, setAddNewPatient] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAppointmentData, defaultAppointmentData } = useContext(AppointmentContext);

  useEffect(() => {
    clearPatientData();
    const fetchAppointments = async () => {
      try {
        const res = await getAppointments();
        const data = res.data;
        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data.data) {
          setAppointments(data.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAddVisit = (id) => {
    navigate(`/patientpage/${id}`);
    setAppointmentData({
      ...defaultAppointmentData, _id: id
    })
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
        <div className="w-[49%] border-1 border-black p-4 rounded-lg flex items-center justify-center">
          Total Patient Registered
        </div>
        <Link
          onClick={() => setAddNewPatient(!addNewPatient)}
          className="w-[49%] bg-acent hover:bg-highlight p-4 rounded-lg flex items-center justify-center text-primary"
        >
          + ADD Patient
        </Link>
      </div>

      {addNewPatient ? (
        // ========================== Add New Patient Form ==========================
        <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-between gap-2">
          <h2 className="text-primary text-xl font-semibold mt-3">
            Name & Gender
          </h2>

          <div className="bg-highlight text-primary flex items-center justify-center w-full">
            ========Required========
          </div>

          {/* Patient ID + Name + Father/Husband */}
          <div className="flex gap-2 w-full">
            <select
              placeholder="Patient ID"
              className="w-[30%] border-1 border-black p-4 rounded-lg mb-2"
            >
              <option value="1">Patient ID 1</option>
              <option value="2">Patient ID 2</option>
              <option value="3">Patient ID 3</option>
            </select>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-[35%] border-1 border-black p-4 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Father/Husband Name"
              className="w-[35%] border-1 border-black p-4 rounded-lg mb-2"
            />
          </div>

          {/* Gender + Age + Years + DOB */}
          <div className="flex gap-2 w-full">
            <select className="w-[25%] border-1 border-black p-4 rounded-lg mb-2">
              <option value="">Male</option>
              <option value="1">Female</option>
              <option value="2">Other</option>
            </select>

            <input
              type="text"
              placeholder="Age in years"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="text"
              placeholder="# years"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="date"
              placeholder="Date of Birth"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />
          </div>

          {/* Phone Number */}
          <div className="flex gap-2 w-full">
            <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
              <option value="1">+92</option>
              <option value="2">+91</option>
              <option value="3">+1</option>
            </select>

            <select className="w-[30%] border-1 border-black p-4 rounded-lg mb-2">
              <option value="1">300</option>
              <option value="2">400</option>
              <option value="3">500</option>
            </select>

            <input
              type="text"
              placeholder="Phone Number"
              className="w-[60%] border-1 border-black p-4 rounded-lg mb-2"
            />
          </div>

          {/* Address, City, Check Nub, Relation */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Address"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="text"
              placeholder="City"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="text"
              placeholder="Check Nub"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <select className="w-[25%] border-1 border-black p-4 rounded-lg mb-2">
              <option value="1">Self</option>
              <option value="2">Father</option>
              <option value="3">Mother</option>
              <option value="4">Husband</option>
              <option value="5">Wife</option>
              <option value="6">Brother</option>
              <option value="7">Sister</option>
              <option value="8">Other</option>
            </select>
          </div>

          <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">
            Personal Information (Optional)
          </h2>

          {/* Guardian + CNIC */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Old"
              className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
              <option value="1">***********</option>
              <option value="2">***********</option>
              <option value="3">***********</option>
            </select>

            <input
              type="text"
              placeholder="Guardian Name"
              className="w-[85%] border-1 border-black p-4 rounded-lg mb-2"
            />
          </div>

          {/* CNIC + Email + Profession */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="13 Digit Cnic Number"
              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="email"
              placeholder="xxx@gamil.com"
              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="text"
              placeholder="Profession"
              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
            />
          </div>

          <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">
            References and History (optional)
          </h2>

          {/* References */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Referenced by"
              className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
            />

            <input
              type="text"
              placeholder="History of"
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

          <div className="flex items-center justify-between w-full gap-2">
            <Link
              to="/patient"
              className="bg-primary hover:bg-highlight hover:text-primary py-2 px-4 text-white rounded-lg"
            >
              Create Patient
            </Link>

            <button className="bg-highlight py-2 px-4 text-primary rounded-lg">
              Reset page
            </button>
          </div>
        </div>
      ) : (
        // ========================== Appointments Section ==========================
        <div>
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between mb-4">
            <div className="w-[32%] border-1 border-black border-b-6 border-b-green-800 p-4 rounded-lg flex items-center justify-center">
              OPD
            </div>
            <div className="w-[32%] border-1 border-black border-b-6 border-b-green-800 p-4 rounded-lg flex items-center justify-center">
              Diagnostic
            </div>
            <div className="w-[32%] border-1 border-black border-b-6 border-b-green-800 p-4 rounded-lg flex items-center justify-center">
              Procedure
            </div>
          </div>

          {/* Appointment Search */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
              <input
                type="Number"
                placeholder="Search Patient"
                className="w-[33%] border-1 border-black p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Search Patient"
                className="w-[33%] border-1 border-black p-4 rounded-lg"
              />
              <div className="w-[33%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center justify-center">
                Embend Search
              </div>
            </div>

            {/* Appointment Table */}
            <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
              <div className="w-full flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Patient Name"
                  className="w-[90%] border-1 border-black p-4 rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-primary">
                    Today's Appointments
                  </h2>
                  <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg">
                    Show Checked Out
                  </button>
                </div>

                <table className="w-full text-primary border-collapse">
                  <thead className="border-1 border-black bg-gray-100">
                    <tr>
                      <th className="border-1 border-black p-2">Token</th>
                      <th className="border-1 border-black p-2">Name</th>
                      <th className="border-1 border-black p-2">Age</th>
                      <th className="border-1 border-black p-2">Gender</th>
                      <th className="border-1 border-black p-2">Doctor</th>
                      <th className="border-1 border-black p-2">Service</th>
                      <th className="border-1 border-black p-2">Add Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appt) => (
                        <tr key={appt._id} className="border-1 border-black">
                          <td className="border-1 border-black p-2">
                            {appt.manualToken}
                          </td>
                          <td className="border-1 border-black p-2">
                            {appt.patientId?.patient_name}
                          </td>
                          <td className="border-1 border-black p-2">
                            {appt.patientId?.age}
                          </td>
                          <td className="border-1 border-black p-2">
                            {appt.patientId?.gender}
                          </td>
                          <td className="border-1 border-black p-2">
                            {appt.doctor}
                          </td>
                          <td className="border-1 border-black p-2">
                            {appt.serviceType}
                          </td>
                          <td className="border-1 border-black p-2 text-center">
                            <button
                              onClick={() => handleAddVisit(appt._id)}
                              className="bg-primary text-white px-3 py-1 rounded hover:bg-highlight hover:text-primary"
                            >
                              Add Visit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="border-1 border-black p-2 text-center"
                        >
                          {loading ? <Loader /> : "No appointments found."}
                        </td>
                      </tr>
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
