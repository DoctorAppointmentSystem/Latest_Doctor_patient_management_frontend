import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getAppointmentsByPatientId } from "../../api/appointments";

function Appointment({ patientData }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientData?._id) return;

    const fetchAppointments = async () => {
      try {
        const res = await getAppointmentsByPatientId(patientData._id);
        setAppointments(res.data?.data || []);
        console.log("Appointments:", res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientData]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Search Filters */}
      {/* <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
        <input
          type="number"
          placeholder="Search Token"
          className="w-[33%] border border-black p-4 rounded-lg"
        />
        <input
          type="text"
          placeholder="Search Patient"
          className="w-[33%] border border-black p-4 rounded-lg"
        />
        <div className="w-[33%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center justify-center">
          Embend Search
        </div>
      </div> */}

      {/* Patient Quick Input */}
      <div className="w-full flex items-center justify-center">
        <input
          type="text"
          placeholder="Patient Name"
          value={patientData?.patient_name || ""}
          readOnly
          className="w-[90%] border border-black p-4 rounded-lg"
        />
      </div>

      {/* Appointment Table */}
      <table className="w-full text-primary border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Token</th>
            <th className="border border-black p-2">Date</th>
            <th className="border border-black p-2">Doctor</th>
            <th className="border border-black p-2">Service Type</th>
            <th className="border border-black p-2">Charges</th>
            <th className="border border-black p-2">Amount Paid</th>
            <th className="border border-black p-2">Discount</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt._id} className="border border-black">
                <td className="border border-black p-2">{appt.manualToken || "N/A"}</td>
                <td className="border border-black p-2">
                  {appt.createdAt ? new Date(appt.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="border border-black p-2">{appt.doctor || "N/A"}</td>
                <td className="border border-black p-2">{appt.serviceType || "N/A"}</td>
                <td className="border border-black p-2">{appt.charges || 0}</td>
                <td className="border border-black p-2">{appt.amountPaid || 0}</td>
                <td className="border border-black p-2">
                  {appt.discount_type
                    ? `${appt.discount_type} (${appt.discount_remarks})`
                    : "—"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No Appointments Found ❌
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Appointment;
