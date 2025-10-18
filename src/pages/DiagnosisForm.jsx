import { useContext, useState } from "react";
import { createVisit, updateVisit } from "../api/visits";
import { AppointmentContext, PatientContext, VisitContext } from "../context";

const DiagnosisForm = () => {
  const [activeSection, setActiveSection] = useState("diagnosis"); // Start with the first section open

  // State for each section, designed to hold multiple entries
  const [diagnoses, setDiagnoses] = useState([
    { text: "", eye: "L", isFinal: false },
    { text: "", eye: "L", isFinal: false },
  ]);

  const [treatments, setTreatments] = useState([
    { text: "", eye: "L", isFinal: false },
    { text: "", eye: "L", isFinal: false },
  ]);

  const [managements, setManagements] = useState([
    { text: "", eye: "L", isFinal: false },
    { text: "", eye: "L", isFinal: false },
  ]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };



    const { patientData } = useContext(PatientContext);
    const { appointmentData } = useContext(AppointmentContext);
    const { visitData, setVisitData } = useContext(VisitContext);

  // Generic handler to update state for any section
  const handleStateChange = (setter, index, field, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

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
    
    
          alert("✅ Patient & Visit saved successfully!");
    
        } catch (err) {
          console.error("Save error:", err);
          alert("❌ " + err.message);
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
                <input
                  type="text"
                  placeholder={`Diagnosis ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  value={item.text}
                  onChange={(e) => handleStateChange(setDiagnoses, index, "text", e.target.value)}
                />
                <select 
                  className="border border-gray-300 rounded px-2 py-2 text-sm w-24"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setDiagnoses, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer">
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
          </div>
        )}
      </div>

      <hr/>

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
                <input
                  type="text"
                  placeholder={`Treatment ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  value={item.text}
                  onChange={(e) => handleStateChange(setTreatments, index, "text", e.target.value)}
                />
                <select 
                  className="border border-gray-300 rounded px-2 py-2 text-sm w-24"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setTreatments, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer">
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
          </div>
        )}
      </div>

      <hr/>

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
                <input
                  type="text"
                  placeholder={`Management Plan ${index + 1} (max 250 characters)`}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  value={item.text}
                  onChange={(e) => handleStateChange(setManagements, index, "text", e.target.value)}
                />
                <select 
                  className="border border-gray-300 rounded px-2 py-2 text-sm w-24"
                  value={item.eye}
                  onChange={(e) => handleStateChange(setManagements, index, "eye", e.target.value)}
                >
                  <option value="L">For L</option>
                  <option value="R">For R</option>
                  <option value="B">For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer">
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
          </div>
        )}
      </div>
      
      {/* --- ACTION BUTTON --- */}
      <div className="flex justify-end pt-4">
        <button 
            type="button" 
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-highlight transition"
        >
          Save Diagnosis
        </button>
      </div>
    </div>
  );
};

export default DiagnosisForm;