import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PatientContext, AppointmentContext } from "../context";
import axiosInstance from "../api/axiosInstance";
import { useToast } from "../components/Toast"; // ✅ Toast notifications

const ShowCashReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData, setPatientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { toast } = useToast(); // ✅ Toast hook
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Loading state
  const doctor = patientData.doctor || "Doctor Name";
  const patient = patientData.name || "Patient Name";
  const service = patientData.service || "Follow-up";

  // ✅ Use user's entered token from AppointmentContext, fallback to random if empty
  const userEnteredToken = appointmentData?.manualToken;
  const tokenNumber = userEnteredToken || ("A" + (Math.floor(Math.random() * 1000) + 1));

  const [formData, setFormData] = useState({
    charges: "",
    claimable: "",
    discountType: "",
    discount: "",
    discountRemarks: "",
    amountPayable: "",
    paymentMethod: "Cash", // ✅ NEW: Payment method
  });

  // single reservation
  const [reservation, setReservation] = useState(null);

  // ✅ Auto-calculate amountPayable when charges, discount, or discountType changes
  useEffect(() => {
    const chargesNum = parseFloat(formData.charges) || 0;
    const discountNum = parseFloat(formData.discount) || 0;

    let payable = chargesNum;

    if (formData.discountType === "Percentage") {
      // Percentage discount: subtract percentage of charges
      payable = chargesNum - (chargesNum * discountNum / 100);
    } else {
      // Fixed discount: subtract directly
      payable = chargesNum - discountNum;
    }

    // Ensure non-negative
    payable = Math.max(0, payable);

    setFormData(prev => ({
      ...prev,
      amountPayable: payable > 0 ? payable.toFixed(0) : ""
    }));
  }, [formData.charges, formData.discount, formData.discountType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddReservation = () => {
    setReservation({ ...formData, doctor, service });
  };

  const handleDeleteReservation = () => {
    setReservation(null);
    setFormData({
      charges: "",
      claimable: "",
      discountType: "",
      discount: "",
      discountRemarks: "",
      amountPayable: "",
      paymentMethod: "Cash", // ✅ Reset to default
    });
  };

  const handleNext = async () => {
    if (!reservation) {
      toast.warning("⚠️ Please add a reservation first");
      return;
    }

    setIsSubmitting(true); // ✅ Start loading

    try {
      const appointmentData = {
        doctor: patientData.doctor,
        serviceType: patientData.service,
        patientId: patientData._id,
        charges: reservation.charges || 0,
        claimable: reservation.claimable || 0,
        discount_type: reservation.discountType || "",
        discount_remarks: reservation.discountRemarks || "",
        amountPaid: Number(reservation.amountPayable) || 0,
        paymentMethod: reservation.paymentMethod || "Cash",
        manualToken: tokenNumber,
      };

      console.log("🔍 DEBUG - Payment Method:", reservation.paymentMethod);
      console.log("📌 Sending appointment to API:", appointmentData);

      // ✅ FIXED: Using axiosInstance which includes auth token automatically
      const response = await axiosInstance.post("/appointments", appointmentData);

      setPatientData({
        ...patientData,
        charges: reservation.charges || 0,
        claimable: reservation.claimable || 0,
        discountType: reservation.discountType || "",
        discountRemarks: reservation.discountRemarks || "",
        amountPayable: Number(reservation.amountPayable) || 0,
        tokenNumber: tokenNumber,
      });

      console.log("✅ Appointment created:", response.data);
      toast.success("✅ Appointment created successfully!");
      navigate("/token");
    } catch (err) {
      console.error("❌ Error creating appointment:", err);
      const errorMessage = err.response?.data?.message || "Failed to create appointment";
      toast.error("❌ " + errorMessage);
    } finally {
      setIsSubmitting(false); // ✅ Stop loading
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg max-w-10xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Cash Report Page
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          {/* inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Charges
            </label>
            <input
              type="text"
              name="charges"
              value={formData.charges}
              onChange={handleChange}
              placeholder="Rs."
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Claimable
            </label>
            <input
              type="text"
              name="claimable"
              value={formData.claimable}
              onChange={handleChange}
              placeholder="Rs."
              className="p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">-- select discount type --</option>
              <option>Percentage</option>
              <option>Fixed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Rs."
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Remarks
            </label>
            <input
              type="text"
              name="discountRemarks"
              value={formData.discountRemarks}
              onChange={handleChange}
              placeholder="Reason for discount"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount Payable
            </label>
            <input
              type="text"
              name="amountPayable"
              value={formData.amountPayable}
              readOnly
              placeholder="Auto-calculated"
              className="mt-1 p-2 w-full border rounded bg-green-100 font-semibold text-green-700 cursor-not-allowed"
            />
          </div>

          {/* ✅ NEW: Payment Method Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="Online">Online Transfer</option>
            </select>
          </div>

          <button
            onClick={handleAddReservation}
            className="w-full bg-acent text-primary hover:bg-highlight py-2 rounded font-semibold"
          >
            {reservation ? "Update Reservation" : "Add Reservation"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-primary mb-2">Reservation</h3>

          <div className="h-[450px] border p-3 rounded-md bg-white overflow-y-auto">
            {reservation ? (
              <div>
                <div className="flex justify-between text-sm text-primary mb-1">
                  <span>
                    {reservation.service} ({reservation.doctor})
                  </span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={handleDeleteReservation}
                  >
                    🗑️ Delete
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-xs font-medium text-primary">
                  <span>Charges</span>
                  <span>Claim</span>
                  <span>Discount</span>
                  <span>Payable</span>
                  <span>Remarks</span>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-sm text-gray-700 mt-1">
                  <span>{reservation.charges || 0}</span>
                  <span>{reservation.claimable || 0}</span>
                  <span>{reservation.discount || 0}</span>
                  <span>{reservation.amountPayable || 0}</span>
                  <span>{reservation.discountRemarks || "-"}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No reservation added yet.</p>
            )}
          </div>

          <div className="w-full flex items-center justify-end">
            <Link
              onClick={handleNext}
              className="bg-acent text-primary hover:bg-highlight py-2 px-4 rounded font-semibold"
            >
              Check-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCashReportPage;
