import React, { useState, useEffect } from 'react';
import { getVisitsByPatientId } from '../../api/visits';
import Loader from '../../components/Loader';

function Visits( { patientData } ) {
   const [visitsData, setVisitsData] = useState([]);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
       console.log("Patient Data in useEffect:", patientData);
       const fetchVisits = async () => {
         try {
          setLoading(true);
           const res = await getVisitsByPatientId(patientData._id);
           setVisitsData(res.data || []);
           console.log("Visits Data:", res.data || []);
         } catch (error) {
           console.error("Error fetching visits data:", error);  
         } finally { 
          setLoading(false);
          }
       }
       fetchVisits();
     }, [patientData._id]);

     if (loading) {
      return <Loader />;
     }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* --- SEARCH BAR --- */}
      {/* <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
        <input
          type="Number"
          placeholder="Search Patient by MRN"
          className="w-[33%] border-1 border-black p-4 rounded-lg"
        />
        <input
          type="text"
          placeholder="Search Patient by Name"
          className="w-[33%] border-1 border-black p-4 rounded-lg"
        />
        <div className="w-[33%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center justify-center cursor-pointer">
          Search
        </div>
      </div> */}

      {/* <div className="w-full flex items-center justify-center">
        <input
          type="text"
          placeholder="Patient Name"
          className="w-[90%] border-1 border-black p-4 rounded-lg"
        />
      </div> */}

      {/* --- VISITS TABLE --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl p-4">
        <table className="w-full text-primary text-left">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="p-2">Visit Date</th>
              {/* <th className="p-2">MRN</th> */}
              <th className="p-2">Name</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Service</th>
              <th className="p-2">Status</th>
              <th className="p-2">Charges</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop over the patientData state */}
            {visitsData.map((visit) => (
              <tr key={visit._id} className="border-b hover:bg-gray-100">
                <td className="p-2">
                  {/* Format the date to be more readable */}
                  {new Date(visit.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="p-2"> */}
                  {/* Assumes patientId object has 'mrn' */}
                  {/* {visit.patientId.mrn}
                </td> */}
                <td className="p-2">
                  {/* Assumes patientId object has 'name' */}
                  {visit.patientId.patient_name}
                </td>
                <td className="p-2">
                  {/* Assumes you add 'doctor' to your visit object */}
                  {visit.appointmentId.doctor}
                </td>
                <td className="p-2">
                  {/* Assumes you add 'service' to your visit object */}
                  {visit.appointmentId.serviceType}
                </td>
                <td className="p-2">
                  {/* Conditional rendering for status */}
                  {visit.complete ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      Complete
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {/* Assumes you add 'charges' to your visit object */}
                  {visit.appointmentId.charges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Visits;