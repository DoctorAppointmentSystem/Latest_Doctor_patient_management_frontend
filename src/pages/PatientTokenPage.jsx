import { useContext } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { PatientContext } from "../context";

const PatientTokenPage = () => {
  const location = useLocation();
  const { patientData } = useContext(PatientContext);

  // Destructure patientData safely
  const doctor = patientData?.doctor || "Doctor Name";
  const patient = patientData?.name || "Patient Name";
  const tokenNumber = patientData?.tokenNumber || "N/A";

  // Reservation info (if single)
  const service = patientData?.service || "Follow-up";
  const charges = Number(patientData?.charges) || 0;
  const claimable = Number(patientData?.claimable) || 0;
  const discountType = patientData?.discountType || "";
  const discount = Number(patientData?.discount) || 0;
  const discountRemarks = patientData?.discountRemarks || "";
  const amountPayable = Number(patientData?.amountPayable) || 0;

  // Totals (since it's single service for now)
  const totalCharges = charges;
  const totalPayable = amountPayable;
  const totalCash = Number(patientData?.paidCash) || 0;
  const totalCreditCard = 0; // Future field
  const totalOnline = 0; // Future field

  // Date & time
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // QR Code value
  const qrValue = `Token: ${tokenNumber}
Patient: ${patient}
Doctor: ${doctor}
Service: ${service}
Payable: ${totalPayable}
Cash Paid: ${totalCash}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center text-black w-[300px] space-y-2 print:w-full print:text-xs">
        {/* Token */}
        <div>
          <p className="text-lg">Token</p>
          <h1 className="text-6xl font-bold">{tokenNumber}</h1>
        </div>

        {/* Patient & Doctor */}
        <div className="text-sm mt-1">
          <p><strong>Patient:</strong> {patient}</p>
          <p><strong>Doctor:</strong> {doctor}</p>
        </div>

        {/* Date & Time */}
        <div className="text-sm mt-1">
          <p>{currentTime}</p>
          <p>{currentDate}</p>
        </div>

        {/* Clinic */}
        <div className="bg-black text-white py-1 font-semibold mt-2">
          Jamil Eye Care Sahiwal
        </div>

        {/* Service */}
        <div className="mt-2">
          <div className="bg-black text-white py-1">Private</div>
          <div className="bg-gray-100 py-1 font-semibold">Service</div>
          <p>
            {service} ({charges} Rs) - Payable: {amountPayable}
          </p>
        </div>

        {/* Payment */}
        <div className="text-sm space-y-1 mt-2">
          <p>Total: {totalCharges}</p>
          <p>Payable: {totalPayable}</p>
        </div>

        {/* QR Code */}
        <div className="flex items-center justify-center mt-4">
          <QRCode value={qrValue} size={120} />
        </div>

        {/* Footer */}
        <p className="text-xs mt-2 italic">Please wait for your turn!</p>
        <p className="text-[10px] text-gray-500">Printed on {currentDate}</p>
      </div>
    </div>
  );
};

export default PatientTokenPage;
