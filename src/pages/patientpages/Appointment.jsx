import { useEffect, useState, useContext } from "react";
import Loader from "../../components/Loader";
import { getAppointmentsByPatientId, deleteAppointment } from "../../api/appointments";
import toast from 'react-hot-toast';
import { VisitContext } from "../../context";
import { useNavigate } from "react-router-dom";

function Appointment({ patientData }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setVisitData } = useContext(VisitContext);
  const navigate = useNavigate();

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

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteAppointment(id);
      toast.success("Appointment deleted successfully");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment");
    }
  };

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
            <th className="border border-black p-2 text-center">Action</th>
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
                  {(() => {
                    const discountValue = (appt.charges || 0) - (appt.amountPaid || 0);
                    if (discountValue > 0) {
                      let discountLabel = appt.discount_type;

                      if (appt.discount_type === "Percentage" && appt.charges > 0) {
                        const percent = Math.round((discountValue / appt.charges) * 100);
                        discountLabel = `${percent}%`;
                      }

                      return (
                        <span>
                          <span className="font-semibold text-green-600">Rs. {discountValue}</span>
                          {discountLabel && (
                            <span className="text-xs text-gray-500 ml-1">
                              ({discountLabel})
                            </span>
                          )}
                        </span>
                      );
                    }
                    return <span className="text-gray-400">-</span>;
                  })()}
                </td>
                <td className="border border-black p-2 text-center">
                  <div className="flex gap-2 justify-center">
                    {appt.visitId && (
                      <button
                        onClick={() => {
                          setVisitData({ ...appt, visitId: appt.visitId });
                          navigate("/report");
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        👁️ View
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAppointment(appt._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
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
