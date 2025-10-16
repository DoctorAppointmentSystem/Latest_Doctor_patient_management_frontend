import React, { useContext, useState } from "react";
import { AppointmentContext, PatientContext, VisitContext } from "../context";
import { createVisit, updateVisit } from "../api/visits";

export default function PrescriptionPage() {
  // State for the individual medicine being added/edited
  const [selected, setSelected] = useState({
    medicine: "",
    dosage: "",
    eye: "B", // Defaulted 'eye' to 'B'
    duration: "",
    isFreeProvided: false, // Added to match the backend model
  });

  const [rxList, setRxList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  // New state variables for remarks and next visit
  const [remarks, setRemarks] = useState("");
  const [nextVisit, setNextVisit] = useState({ date: "", after: "" });

    const { patientData } = useContext(PatientContext);
    const { appointmentData } = useContext(AppointmentContext);
    const { visitData, setVisitData } = useContext(VisitContext);

  const handleChange = (field) => (e) => {
    setSelected((prev) => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleNextVisitChange = (field) => (e) => {
    setNextVisit((prev) => ({...prev, [field]: e.target.value }));
  };

  const addToRx = (isFree = false) => {
    if (selected.medicine && selected.dosage && selected.duration) {
      const newMedicine = { ...selected, isFreeProvided: isFree };

      if (editIndex !== null) {
        // Update existing item
        const updatedList = [...rxList];
        updatedList[editIndex] = newMedicine;
        setRxList(updatedList);
        setEditIndex(null);
      } else {
        // Add new item
        setRxList((prev) => [...prev, newMedicine]);
      }

      // Reset form
      setSelected({
        medicine: "",
        dosage: "",
        eye: "B",
        duration: "",
        isFreeProvided: false,
      });
    } else {
      alert("⚠️ Please fill all medicine fields before adding.");
    }
  };

  const handleEdit = (index) => {
    setSelected(rxList[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setRxList((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setSelected({
        medicine: "",
        dosage: "",
        eye: "B",
        duration: "",
        isFreeProvided: false,
      });
      setEditIndex(null);
    }
  };

  // Function to create the payload and log it
  const handleSubmit = async () => {
    const payloadPre = {
      medicines: rxList,
      remarks: remarks,
      nextVisit: {
        date: nextVisit.date ? new Date(nextVisit.date).toISOString() : null,
        after: nextVisit.after,
      },
    };

    console.log("Final Payload to be sent:", JSON.stringify(payloadPre, null, 2));
try {
      const payload = {
        patientId: patientData._id,
        appointmentId: appointmentData._id,
        prescription: payloadPre,
        complete: true,
      };

      console.log("Sending payload to backend:", payload);

      const response = await updateVisit(visitData.visitId, payload);
      console.log("Backend response:", response);


      alert("✅ Patient & Visit saved successfully!");

    } catch (err) {
      console.error("Save error:", err);
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-lg gap-3">
      <div className="bg-white w-full p-4 rounded-lg shadow-md">
        {/* Form */}
        <div className="flex flex-col gap-2">
          <input
            className="flex-1 border border-gray-300 rounded p-2 outline-primary"
            placeholder="Enter Medicine"
            value={selected.medicine}
            onChange={handleChange("medicine")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <input
              className="border border-gray-300 rounded p-2 outline-primary"
              placeholder="Enter Dosage (e.g., 1 drop 3 times a day)"
              value={selected.dosage}
              onChange={handleChange("dosage")}
            />
            <select
              className="border border-gray-300 rounded p-2 outline-primary bg-white"
              value={selected.eye}
              onChange={handleChange("eye")}
            >
              <option value="B">Both Eyes (B)</option>
              <option value="R">Right Eye (R)</option>
              <option value="L">Left Eye (L)</option>
            </select>
            <input
              className="border border-gray-300 rounded p-2 outline-primary"
              placeholder="Enter Duration (e.g., 7 days)"
              value={selected.duration}
              onChange={handleChange("duration")}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => addToRx(false)}
            className="flex-1 bg-acent text-primary font-medium rounded p-3 hover:bg-highlight"
          >
            {editIndex !== null ? "Update Rx" : "Add to Rx"}
          </button>
          <button
            type="button"
            onClick={() => addToRx(true)}
            className="flex-1 border border-background text-gray-700 rounded p-3 bg-background"
          >
            Add as Free Provided
          </button>
        </div>
      </div>

      {/* Prescribed Section */}
      <div className="bg-white w-full p-4 rounded-lg shadow-md">
        <h2 className="bg-background text-center rounded p-1">Rx Prescribed</h2>
        {rxList.length === 0 ? (
          <p className="text-center text-gray-500 mt-2">
            No medicines prescribed yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {rxList.map((rx, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <span>
                    <b>{rx.medicine}</b> — {rx.dosage} ({rx.eye}) for {rx.duration}
                  </span>
                  {rx.isFreeProvided && (
                    <span className="ml-2 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => handleEdit(index)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemove(index)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Remarks */}
        <textarea
          className="w-full mt-4 border border-gray-300 rounded p-2 h-24 outline-primary"
          placeholder="Additional Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>
      </div>
      {/* Next Visit Date */}
      <div className="mt-4 bg-white w-full p-4 rounded-lg shadow-md">
        <label className="block mb-2 font-medium">Next Visit</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
                type="date"
                className="w-full border border-gray-300 rounded p-2 outline-primary"
                value={nextVisit.date}
                onChange={handleNextVisitChange("date")}
            />
            <input
                type="text"
                placeholder="Follow-up after (e.g., 2 Weeks)"
                className="w-full border border-gray-300 rounded p-2 outline-primary"
                value={nextVisit.after}
                onChange={handleNextVisitChange("after")}
            />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-hightlight"
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
}