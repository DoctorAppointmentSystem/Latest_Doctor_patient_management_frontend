import { useContext, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { PatientContext, AppointmentContext } from "../context";

const PatientTokenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);

  // ✅ Generate token number if not available
  const tokenNumber = useMemo(() => {
    return appointmentData?.manualToken || Math.floor(100 + Math.random() * 900);
  }, [appointmentData]);

  // ✅ Trigger print and redirect after print or cancel
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000);

    // Redirect to home after print or cancel
    window.onafterprint = () => {
      navigate("/");
    };

    return () => {
      clearTimeout(timer);
      window.onafterprint = null; // cleanup event
    };
  }, [navigate]);

  // Patient & Doctor info
  const doctor = patientData?.doctor || "Doctor Name";
  const patient = patientData?.name || "Patient Name";

  // Reservation info
  const service = patientData?.service || "Follow-up";
  const charges = Number(patientData?.charges) || 0;
  const amountPayable = Number(patientData?.amountPayable) || 0;
  const totalCash = Number(patientData?.paidCash) || 0;

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
Payable: ${amountPayable}
Cash Paid: ${totalCash}`;

  return (
    <>
      {/* ✅ Print-only CSS */}
      <style>
        {`
          @media print {
            @page {
              size: auto; /* Auto size based on content */
              margin: 5mm; /* Small margin for slip print */
            }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0;
              padding: 0;
            }
            .print-area {
              width: fit-content;
              height: auto;
              margin: auto;
            }
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="print-area text-center text-black w-[300px] space-y-2 print:w-auto print:text-xs">
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
            <p>Total: {charges}</p>
            <p>Payable: {amountPayable}</p>
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
    </>
  );
};

export default PatientTokenPage;
