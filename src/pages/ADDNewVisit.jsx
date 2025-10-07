import { useState, useContext, useEffect } from "react";
import { VisitContext } from "../context"; // adjust path if needed

function ADDNewVisit() {
  // Systemic History
  const [systemHistory, setSystemHistory] = useState([
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
  ]);

  // Ocular History
  const [ocularHistory, setOcularHistory] = useState([
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
  ]);

  // Presenting Complaints
  const [presentingCompaints, setPresentingCompaints] = useState([
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
    { disease: "", eye: "", duration: "", enabled: false },
  ]);

  const { visitData, setVisitData } = useContext(VisitContext);

  const handleAddDisease = () => {
    setPresentingCompaints([
      ...presentingCompaints,
      { disease: "", eye: "", duration: "", enabled: false },
    ]);
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

  const handleSubmit = () => {
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
      newDisease: [], // not used here yet
    };

    console.log("Final Visit Data:", historyPayload);

    // ✅ Merge into VisitContext without losing other sections
    setVisitData((prev) => ({
      ...prev,
      history: historyPayload,
    }));

    alert("History is updated in Visit!");
  };

  // Log updated visitData correctly
  useEffect(() => {
    console.log("Updated visitData:", visitData);
  }, [visitData]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Systemic History */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">Systemic History</h2>
        {systemHistory.map((item, index) => (
          <div key={index} className="w-full flex gap-4">
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
      </div>

      {/* Ocular History */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">Ocular History</h2>
        {ocularHistory.map((item, index) => (
          <div key={index} className="w-full flex gap-4">
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
      </div>

      {/* Presenting Complaints */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-primary text-[26px] font-bold">
          Presenting Complaints
        </h2>
        {presentingCompaints.map((item, index) => (
          <div key={index} className="w-full flex gap-4">
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
          onClick={handleAddDisease}
          className="cursor-pointer border border-primary rounded-[5px] w-full flex items-center justify-center text-primary p-4 font-semibold hover:text-highlight"
        >
          + Add new disease History
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Save History
        </button>
      </div>
    </div>
  );
}

export default ADDNewVisit;
