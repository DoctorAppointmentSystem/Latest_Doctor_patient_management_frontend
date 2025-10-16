import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPatients } from "../api/patient"; // Make sure this API function exists

function PatientSearch() {
  const [nameQuery, setNameQuery] = useState("");
  const [phoneQuery, setPhoneQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!nameQuery.trim() && !phoneQuery.trim()) {
        setPatients([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      try {
        // Your backend API should handle receiving both queries
        const res = await getAllPatients({ 
          patient_name: nameQuery, 
          phone_number: phoneQuery 
        });
        
        const data = res.data;
        setPatients(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPatients, 500);
    return () => clearTimeout(timeoutId);

  }, [nameQuery, phoneQuery]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Patient by Name"
          className="w-full md:w-1/2 p-3 border border-black rounded-lg"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Patient by Phone"
          className="w-full md:w-1/2 p-3 border border-black rounded-lg"
          value={phoneQuery}
          onChange={(e) => setPhoneQuery(e.target.value)}
        />
      </div>

      {/* --- Results Display --- */}
      {loading && <p className="text-gray-500 text-center py-4">Searching...</p>}

      {!loading && patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow bg-white">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Father Name</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{p.patient_name}</td>
                  <td className="p-2 border">{p.father_name}</td>
                  <td className="p-2 border">{p.gender}</td>
                  <td className="p-2 border">{p.age}</td>
                  <td className="p-2 border">{p.phone_number}</td>
                  <td className="p-2 border text-primary cursor-pointer">
                    <Link
                      to="/appointment"
                      onClick={() => {
                        localStorage.setItem("selectedPatientId", p._id);
                      }}
                      className="hover:underline"
                    >
                      Create Appointment
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && hasSearched && patients.length === 0 && (
        <p className="text-red-500 text-center py-4">No patients found matching your criteria.</p>
      )}
    </div>
  );
}

export default PatientSearch;