import { useState, useContext, useEffect } from "react";
import { AppointmentContext, PatientContext, VisitContext } from "../context"; // adjust path if needed
import { createVisit } from "../api/visits";
import { useToast } from "../components/Toast"; // ✅ Toast notifications
import { FiTrash } from "react-icons/fi"; // ✅ Delete Icon
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Navigation hook
import Loader from "../components/Loader"; // ✅ Centralized Loader

function ADDNewVisit() {
  // Add the new loading state
  const [isLoading, setIsLoading] = useState(false);

  const { visitData, setVisitData } = useContext(VisitContext);
  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { toast } = useToast(); // ✅ Toast hook
  const navigate = useNavigate(); // ✅ Initialize hook
  const location = useLocation(); // ✅ Get navigation state

  // ✅ Initialize from context if data exists, otherwise use defaults
  const [systemHistory, setSystemHistory] = useState(() => {
    // If New Mode, force empty
    if (location.state?.mode === "new") return [{ disease: "", eye: "", duration: "", enabled: false }];

    if (visitData?.history?.systemHistory?.length > 0) {
      return visitData.history.systemHistory;
    }
    return [{ disease: "", eye: "", duration: "", enabled: false }];
  });

  // ✅ Initialize Ocular History from context
  const [ocularHistory, setOcularHistory] = useState(() => {
    // If New Mode, force empty
    if (location.state?.mode === "new") return [{ disease: "", eye: "", duration: "", enabled: false }];

    if (visitData?.history?.ocularHistory?.length > 0) {
      return visitData.history.ocularHistory;
    }
    return [{ disease: "", eye: "", duration: "", enabled: false }];
  });

  // ✅ Initialize Presenting Complaints from context
  const [presentingCompaints, setPresentingCompaints] = useState(() => {
    // If New Mode, force empty
    if (location.state?.mode === "new") return [{ disease: "", eye: "", duration: "", enabled: false }];

    if (visitData?.history?.presentingComplaints?.length > 0) {
      return visitData.history.presentingComplaints;
    }
    return [{ disease: "", eye: "", duration: "", enabled: false }];
  });

  // ✅ Sync local state to VisitContext whenever it changes
  // BUT skip syncing on first render in "new mode" to avoid spreading old data
  useEffect(() => {
    // Skip syncing if we're in new mode - let the clearing useEffect handle it
    if (location.state?.mode === "new") {
      console.log("⏸️ Skipping context sync - New Mode active");
      return;
    }

    setVisitData(prev => ({
      ...prev,
      history: {
        systemHistory: systemHistory,
        ocularHistory: ocularHistory,
        presentingComplaints: presentingCompaints,
        newDisease: prev?.history?.newDisease || [],
      }
    }));
  }, [systemHistory, ocularHistory, presentingCompaints, setVisitData, location.state?.mode]);

  // ✅ SMART VISIT ID MANAGEMENT
  useEffect(() => {
    // 1. If "New Mode", we MUST clear the Visit ID (start fresh)
    if (location.state?.mode === "new") {
      console.log("🆕 New Visit Mode Detected: Clearing Context and LocalStorage");

      // Clear localStorage directly to prevent stale data
      localStorage.removeItem("visitData");

      // Reset the context state
      setVisitData({
        visitId: "",
        patientId: "", // This ensures localStorage effect doesn't save it back
        history: {},
        visionAndRefraction: {},
        examination: {},
        diagnosis: {},
        prescription: {}
      });

      // Reset local form states
      setSystemHistory([{ disease: "", eye: "", duration: "", enabled: false }]);
      setOcularHistory([{ disease: "", eye: "", duration: "", enabled: false }]);
      setPresentingCompaints([{ disease: "", eye: "", duration: "", enabled: false }]);

      return;
    }

    // 2. Only clear if it's an "Invalid" ID (stuck from bug)
    // If it's a real mongoID (24 chars), KEEP IT so we can edit!
    if (visitData.visitId && visitData.visitId.startsWith(":")) {
      console.log("Cleaning up invalid visitId:", visitData.visitId);
      setVisitData((prev) => ({ ...prev, visitId: "" }));
    }
  }, []);

  // Generic Add Item
  const handleAddItem = (section) => {
    const newItem = { disease: "", eye: "", duration: "", enabled: false };
    if (section === "systemic") setSystemHistory([...systemHistory, newItem]);
    if (section === "ocular") setOcularHistory([...ocularHistory, newItem]);
    if (section === "presenting") setPresentingCompaints([...presentingCompaints, newItem]);
  };

  // Generic Remove Item
  const handleRemoveItem = (section, index) => {
    if (section === "systemic") {
      const updated = [...systemHistory];
      updated.splice(index, 1);
      setSystemHistory(updated);
    } else if (section === "ocular") {
      const updated = [...ocularHistory];
      updated.splice(index, 1);
      setOcularHistory(updated);
    } else if (section === "presenting") {
      const updated = [...presentingCompaints];
      updated.splice(index, 1);
      setPresentingCompaints(updated);
    }
  };

  // Generic field update
  const handleChange = (section, index, field, value) => {
    let updated;
    if (section === "systemic") {
      updated = [...systemHistory];
      updated[index][field] = value;
      setSystemHistory(updated);
    } else if (section === "ocular") {
      updated = [...ocularHistory];
      updated[index][field] = value;
      setOcularHistory(updated);
    } else if (section === "presenting") {
      updated = [...presentingCompaints];
      updated[index][field] = value;
      setPresentingCompaints(updated);
    }
  };

  const handleCheckboxChange = (section, index) => {
    let updated;
    if (section === "systemic") {
      updated = [...systemHistory];
      updated[index].enabled = !updated[index].enabled;
      setSystemHistory(updated);
    } else if (section === "ocular") {
      updated = [...ocularHistory];
      updated[index].enabled = !updated[index].enabled;
      setOcularHistory(updated);
    } else if (section === "presenting") {
      updated = [...presentingCompaints];
      updated[index].enabled = !updated[index].enabled;
      setPresentingCompaints(updated);
    }
  };


  // UPDATED handleSubmit function
  const handleSubmit = async () => {
    setIsLoading(true); // Start loading

    const historyPayload = {
      presentingComplaints: presentingCompaints.filter(
        (item) => item.disease || item.eye || item.duration
      ),
      ocularHistory: ocularHistory.filter(
        (item) => item.disease || item.eye || item.duration
      ),
      systemHistory: systemHistory.filter(
        (item) => item.disease || item.eye || item.duration
      ),
      newDisease: [],
    };

    const payload = {
      patientId: patientData._id,
      appointmentId: appointmentData._id,
      history: historyPayload,
    };

    try {
      console.log("Sending payload to backend:", payload);
      const response = await createVisit(payload);
      toast.success("✅ History saved successfully!"); // ✅ Toast instead of alert
      console.log("Backend response:", response);
      console.log("Visit created with ID:", response.data.data._id);
      setVisitData({
        ...visitData, visitId: response.data.data._id
      });
      // ✅ Auto-navigate to next step
      setTimeout(() => navigate("/patient/visionandrefraction"), 1500);
    } catch (error) {
      console.error("Error submitting visit data:", error);
      toast.error("❌ Failed to save history. Please try again."); // ✅ Toast instead of alert
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // If loading, show the centralized loader component
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader />
        <p className="mt-4 text-primary text-lg">Saving Visit...</p>
      </div>
    );
  }

  // Otherwise, return the form as normal
  return (
    <div className="w-full h-full flex flex-col">
      {/* ... (all your JSX for Systemic History, Ocular History, etc. remains here) ... */}
      {/* Systemic History */}
      {/* Presenting Complaints */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">
          Presenting Complaints
        </h2>
        {presentingCompaints.map((item, index) => (
          <div key={index} className="w-full flex gap-4 items-center">
            {/* Delete Icon - Only show if more than 1 item or allow deleting to 0? User asked for remove option. lets allow removing even the last one or keep 1? User said "starts with 1". I will allow deleting, but maybe "Add" should be outside the map. Yes "Add" is outside. */}
            <button
              onClick={() => handleRemoveItem("presenting", index)}
              className="text-red-500 hover:text-red-700 p-2"
              title="Remove row"
            >
              <FiTrash size={20} />
            </button>

            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Disease"
                value={item.disease}
                onChange={(e) =>
                  handleChange("presenting", index, "disease", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />

              {/* Side dropdown */}
              <select
                value={item.eye}
                onChange={(e) =>
                  handleChange("presenting", index, "eye", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary bg-white"
              >
                <option value="">For L/R/B</option>
                <option value="R">R</option>
                <option value="L">L</option>
                <option value="B">B</option>
              </select>

              <input
                type="text"
                placeholder="Duration"
                value={item.duration}
                onChange={(e) =>
                  handleChange("presenting", index, "duration", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />
            </div>

            {/* Checkbox toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => handleCheckboxChange("presenting", index)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                <div className="dot w-3 h-3 bg-white rounded-full transition"></div>
              </div>
            </label>
          </div>
        ))}

        <div
          onClick={() => handleAddItem("presenting")}
          className="cursor-pointer border border-primary rounded-[5px] w-full flex items-center justify-center text-primary p-2 font-semibold hover:text-highlight mt-2"
        >
          + Add Row
        </div>
      </div>


      {/* Ocular History */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">Ocular History</h2>
        {ocularHistory.map((item, index) => (
          <div key={index} className="w-full flex gap-4 items-center">
            {/* Delete Icon */}
            <button
              onClick={() => handleRemoveItem("ocular", index)}
              className="text-red-500 hover:text-red-700 p-2"
              title="Remove row"
            >
              <FiTrash size={20} />
            </button>

            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Disease"
                value={item.disease}
                onChange={(e) =>
                  handleChange("ocular", index, "disease", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />

              {/* Side dropdown */}
              <select
                value={item.eye}
                onChange={(e) =>
                  handleChange("ocular", index, "eye", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary bg-white"
              >
                <option value="">For L/R/B</option>
                <option value="R">R</option>
                <option value="L">L</option>
                <option value="B">B</option>
              </select>

              <input
                type="text"
                placeholder="Duration"
                value={item.duration}
                onChange={(e) =>
                  handleChange("ocular", index, "duration", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />
            </div>

            {/* Checkbox toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => handleCheckboxChange("ocular", index)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                <div className="dot w-3 h-3 bg-white rounded-full transition"></div>
              </div>
            </label>
          </div>
        ))}

        <div
          onClick={() => handleAddItem("ocular")}
          className="cursor-pointer border border-primary rounded-[5px] w-full flex items-center justify-center text-primary p-2 font-semibold hover:text-highlight mt-2"
        >
          + Add Row
        </div>
      </div>



      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">Systemic History</h2>
        {systemHistory.map((item, index) => (
          <div key={index} className="w-full flex gap-4 items-center">
            {/* Delete Icon */}
            <button
              onClick={() => handleRemoveItem("systemic", index)}
              className="text-red-500 hover:text-red-700 p-2"
              title="Remove row"
            >
              <FiTrash size={20} />
            </button>

            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Disease"
                value={item.disease}
                onChange={(e) =>
                  handleChange("systemic", index, "disease", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />

              {/* Side dropdown */}
              <select
                value={item.eye}
                onChange={(e) =>
                  handleChange("systemic", index, "eye", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary bg-white"
              >
                <option value="">For L/R/B</option>
                <option value="R">R</option>
                <option value="L">L</option>
                <option value="B">B</option>
              </select>

              <input
                type="text"
                placeholder="Duration"
                value={item.duration}
                onChange={(e) =>
                  handleChange("systemic", index, "duration", e.target.value)
                }
                className="w-[33%] border border-primary p-2 rounded-[5px] outline-primary"
              />
            </div>

            {/* Checkbox toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => handleCheckboxChange("systemic", index)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                <div className="dot w-3 h-3 bg-white rounded-full transition"></div>
              </div>
            </label>
          </div>
        ))}

        <div
          onClick={() => handleAddItem("systemic")}
          className="cursor-pointer border border-primary rounded-[5px] w-full flex items-center justify-center text-primary p-2 font-semibold hover:text-highlight mt-2"
        >
          + Add Row
        </div>
      </div>




      {/* Submit Button - UPDATED */}
      <div className="p-4 w-full flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading} // Disable button while loading
          className="bg-primary text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save History
        </button>
      </div>
    </div>
  );
}

export default ADDNewVisit;