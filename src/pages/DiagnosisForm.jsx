import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation hook
import { createVisit, updateVisit } from "../api/visits";
import { AppointmentContext, PatientContext, VisitContext } from "../context";
import { useToast } from "../components/Toast"; // ✅ Toast notifications
import { FiTrash } from "react-icons/fi"; // ✅ Delete Icon

const DiagnosisForm = () => {
  const [activeSection, setActiveSection] = useState("diagnosis"); // Start with the first section open

  // State for each section, designed to hold multiple entries
  const [diagnoses, setDiagnoses] = useState([
    { text: "", eye: "L", isFinal: false },
  ]);

  const [treatments, setTreatments] = useState([
    { text: "", eye: "L", isFinal: false },
  ]);

  const [managements, setManagements] = useState([
    { text: "", eye: "L", isFinal: false },
  ]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };



  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { visitData, setVisitData } = useContext(VisitContext);
  const { toast } = useToast(); // ✅ Toast hook
  const navigate = useNavigate(); // ✅ Initialize hook

  // Generic handler to update state for any section
  const handleStateChange = (setter, index, field, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ✅ Add Row handler
  const handleAddRow = (setter) => {
    setter((prev) => [...prev, { text: "", eye: "L", isFinal: false }]);
  };

  // ✅ Remove Row handler
  const handleRemoveRow = (setter, index) => {
    setter((prev) => {
      if (prev.length <= 1) return prev; // Keep at least 1 row
      return prev.filter((_, i) => i !== index);
    });
  };

  // ✅ HYDRATE from VisitContext on mount (for when user navigates back)
  React.useEffect(() => {
    if (visitData?.diagnosis) {
      console.log("Hydrating Diagnosis from context:", visitData.diagnosis);
      const diag = visitData.diagnosis;
      if (diag.diagnoses?.length > 0) setDiagnoses(diag.diagnoses);
      if (diag.treatments?.length > 0) setTreatments(diag.treatments);
      if (diag.managements?.length > 0) setManagements(diag.managements);
    }
  }, []); // Only run on mount

  // ✅ SYNC to VisitContext whenever local state changes
  React.useEffect(() => {
    setVisitData(prev => ({
      ...prev,
      diagnosis: {
        diagnoses, treatments, managements
      }
    }));
  }, [diagnoses, treatments, managements, setVisitData]);


  const handleSubmit = async () => {
    // Filter out any rows that haven't been filled in
    const filteredDiagnoses = diagnoses.filter(d => d.text.trim() !== "");
    const filteredTreatments = treatments.filter(t => t.text.trim() !== "");
    const filteredManagements = managements.filter(m => m.text.trim() !== "");

    const payloadForm = {
      diagnoses: filteredDiagnoses,
      treatmentPlans: filteredTreatments, // Note the key name matches the corrected schema
      managementPlans: filteredManagements,
    };

    console.log("Payload to be sent to backend:", JSON.stringify(payloadForm, null, 2));

    try {
      const payload = {
        diagnosis: payloadForm,
      };

      console.log("Sending payload to backend:", payload);

      const response = await updateVisit(visitData.visitId, payload);
      console.log("Backend response:", response);


      toast.success("✅ Diagnosis saved successfully!"); // ✅ Toast instead of alert
      // ✅ Auto-navigate to next step
      setTimeout(() => navigate("/patient/Prescriptionpage"), 1500);

    } catch (err) {
      console.error("Save error:", err);
      toast.error("❌ " + err.message); // ✅ Toast instead of alert
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow rounded-lg space-y-4">
      {/* Diagnosis Section */}
      <div>
        <h2
          className="text-primary text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection("diagnosis")}
        >
          Diagnosis
        </h2>

        {activeSection === "diagnosis" && (
          <div className="space-y-4 mt-2">
            {diagnoses.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveRow(setDiagnoses, index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove Row"
                >
                  <FiTrash size={18} />
                </button>
                <input
                  type="text"
                  placeholder={`Diagnosis ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm transition-smooth input-focus hover:border-primary"
                  value={item.text}
                  onChange={(e) => handleStateChange(setDiagnoses, index, "text", e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-lg px-2 py-2 text-sm w-24 transition-smooth input-focus hover:border-primary cursor-pointer"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setDiagnoses, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.isFinal}
                    onChange={(e) => handleStateChange(setDiagnoses, index, "isFinal", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
            {/* Add Row Button */}
            <button
              type="button"
              onClick={() => handleAddRow(setDiagnoses)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-primary hover:text-primary transition"
            >
              + Add Row
            </button>
          </div>
        )}
      </div>

      <hr />

      {/* Treatment Plan */}
      <div>
        <h2
          className="text-primary text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection("treatment")}
        >
          Treatment Plan
        </h2>
        {activeSection === "treatment" && (
          <div className="space-y-4 mt-2">
            {treatments.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveRow(setTreatments, index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove Row"
                >
                  <FiTrash size={18} />
                </button>
                <input
                  type="text"
                  placeholder={`Treatment ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm transition-smooth input-focus hover:border-primary"
                  value={item.text}
                  onChange={(e) => handleStateChange(setTreatments, index, "text", e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-lg px-2 py-2 text-sm w-24 transition-smooth input-focus hover:border-primary cursor-pointer"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setTreatments, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.isFinal}
                    onChange={(e) => handleStateChange(setTreatments, index, "isFinal", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
            {/* Add Row Button */}
            <button
              type="button"
              onClick={() => handleAddRow(setTreatments)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-primary hover:text-primary transition"
            >
              + Add Row
            </button>
          </div>
        )}
      </div>

      <hr />

      {/* Management Plan Section */}
      <div>
        <h2
          className="text-primary text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection("management")}
        >
          Management Plan
        </h2>

        {activeSection === "management" && (
          <div className="space-y-4 mt-2">
            {managements.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveRow(setManagements, index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove Row"
                >
                  <FiTrash size={18} />
                </button>
                <input
                  type="text"
                  placeholder={`Management Plan ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm transition-smooth input-focus hover:border-primary"
                  value={item.text}
                  onChange={(e) => handleStateChange(setManagements, index, "text", e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-lg px-2 py-2 text-sm w-24 transition-smooth input-focus hover:border-primary cursor-pointer"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setManagements, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.isFinal}
                    onChange={(e) => handleStateChange(setManagements, index, "isFinal", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
            {/* Add Row Button */}
            <button
              type="button"
              onClick={() => handleAddRow(setManagements)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-primary hover:text-primary transition"
            >
              + Add Row
            </button>
          </div>
        )}
      </div>

      {/* --- ACTION BUTTON --- */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold shadow-md btn-hover hover:bg-highlight transition-smooth"
        >
          Save Diagnosis
        </button>
      </div>
    </div>
  );
};

export default DiagnosisForm;