import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation hook
import { AppointmentContext, PatientContext, VisitContext } from "../context";
import { createVisit, updateVisit } from "../api/visits";
import { getAllMedicines, createMedicine } from "../api/medicine";
import { useToast } from "../components/Toast"; // ✅ Toast notifications
import { LoadingOverlay, LoadingButton } from "../components/LoadingSpinner"; // ✅ Loading components

export default function PrescriptionPage() {
  // State for the individual medicine being added/edited
  const [selected, setSelected] = useState({
    medicine: "",
    dosage: "",
    eye: "B",
    duration: "",
    isFreeProvided: false,
  });

  const [rxList, setRxList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const inputRef = useRef();
  const { toast } = useToast(); // ✅ Toast hook
  const navigate = useNavigate(); // ✅ Initialize hook

  // New state variables for remarks and next visit
  const [remarks, setRemarks] = useState("");
  const [nextVisit, setNextVisit] = useState({ date: "", after: "" });

  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { visitData, setVisitData } = useContext(VisitContext);

  const handleChange = (field) => (e) => {
    setSelected((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === "medicine") setShowDropdown(true);
  };


  // ✅ HYDRATE from VisitContext on mount (same pattern as Examination)
  useEffect(() => {
    if (visitData?.prescription) {
      console.log("Hydrating Prescription from context:", visitData.prescription);
      const rx = visitData.prescription;
      if (rx.medicines?.length > 0) setRxList(rx.medicines);
      if (rx.remarks) setRemarks(rx.remarks);
      if (rx.nextVisit) {
        setNextVisit({
          date: rx.nextVisit.date ? rx.nextVisit.date.split("T")[0] : "",
          after: rx.nextVisit.after || ""
        });
      }
    }
  }, []); // Only run on mount

  // ✅ SYNC to VisitContext whenever local state changes (same pattern as Examination)
  // Only sync if there's actual data to prevent empty initial sync from overwriting context
  useEffect(() => {
    if (rxList.length > 0 || remarks !== "" || nextVisit.date !== "" || nextVisit.after !== "") {
      setVisitData(prev => ({
        ...prev,
        prescription: {
          medicines: rxList,
          remarks: remarks,
          nextVisit: nextVisit
        }
      }));
    }
  }, [rxList, remarks, nextVisit, setVisitData]);

  // Ensure medicines is always an array
  const safeMedicines = Array.isArray(medicines) ? medicines : [];
  const filteredOptions =
    selected.medicine && selected.medicine.trim() !== ""
      ? safeMedicines.filter((m) =>
        (m.name || "").toLowerCase().includes(selected.medicine.toLowerCase())
      )
      : [];
  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNextVisitChange = (field) => (e) => {
    setNextVisit((prev) => ({ ...prev, [field]: e.target.value }));
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
      toast.warning("⚠️ Please fill all medicine fields before adding.");
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
    setIsLoading(true); // ✅ Start loading

    // Get all unique medicine names in rxList
    const enteredMedicines = rxList.map((rx) => rx.medicine.trim().toLowerCase());
    const backendMedicines = (Array.isArray(medicines) ? medicines : []).map((m) => (m.name || "").trim().toLowerCase());
    // Find medicines not in backend
    const newMedicines = enteredMedicines.filter((name) => name && !backendMedicines.includes(name));

    // Add new medicines to backend
    for (const medName of new Set(newMedicines)) {
      try {
        await createMedicine({ name: medName });
      } catch (err) {
        console.error("Error creating new medicine:", medName, err);
      }
    }

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
      // ✅ Validate visitId before calling API
      const currentVisitId = visitData?.visitId;
      if (!currentVisitId || currentVisitId.length !== 24) {
        console.error("Invalid visitId:", currentVisitId);
        toast.error("❌ Visit ID is invalid. Please go back to History and save the visit first.");
        setIsLoading(false);
        return;
      }

      const payload = {
        prescription: payloadPre,
        complete: true,
      };

      console.log("Sending payload to backend:", payload);

      const response = await updateVisit(currentVisitId, payload);
      console.log("Backend response:", response);

      toast.success("✅ Patient & Visit saved successfully!"); // ✅ Toast instead of alert
      // ✅ Auto-navigate to next step (Checkout / Report)
      setTimeout(() => navigate("/report"), 1500);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("❌ " + (err.message || "Failed to save. Please try again.")); // ✅ Toast instead of alert
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };


  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await getAllMedicines();
      // If backend returns {success, total, data: [...]}, use res.data
      let meds = [];
      if (res && Array.isArray(res.data)) {
        meds = res.data;
      } else if (Array.isArray(res)) {
        meds = res;
      }
      console.log("Fetched medicines:", meds);
      setMedicines(meds);
    };
    fetchMedicines();
  }, []);

  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-lg gap-3">
      <div className="bg-white w-full p-4 rounded-lg shadow-md">
        {/* Form */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full" ref={inputRef}>
            <input
              className="flex-1 border border-gray-300 rounded-lg p-2.5 w-full transition-smooth input-focus hover:border-primary"
              placeholder="Enter Medicine"
              value={selected.medicine}
              onChange={handleChange("medicine")}
              onFocus={() => setShowDropdown(true)}
              autoComplete="off"
            />
            {showDropdown && (
              <ul className="absolute z-50 left-0 right-0 bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto mt-1 w-full">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((m, idx) => (
                    <li
                      key={m._id || m.name || idx}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected((prev) => ({ ...prev, medicine: m.name }));
                        setShowDropdown(false);
                      }}
                    >
                      {m.name}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-400">No medicines found</li>
                )}
              </ul>
            )}
            {showDropdown && safeMedicines.length === 0 && (
              <div className="absolute z-50 left-0 right-0 bg-white border border-gray-300 rounded shadow mt-1 w-full px-3 py-2 text-gray-400">
                No medicines available
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <input
              className="border border-gray-300 rounded-lg p-2.5 transition-smooth input-focus hover:border-primary"
              placeholder="Enter Dosage (e.g., 1 drop 3 times a day)"
              value={selected.dosage}
              onChange={handleChange("dosage")}
            />
            <select
              className="border border-gray-300 rounded-lg p-2.5 bg-white transition-smooth input-focus hover:border-primary cursor-pointer"
              value={selected.eye}
              onChange={handleChange("eye")}
            >
              <option value="B">Both Eyes (B)</option>
              <option value="R">Right Eye (R)</option>
              <option value="L">Left Eye (L)</option>
            </select>
            <input
              className="border border-gray-300 rounded-lg p-2.5 transition-smooth input-focus hover:border-primary"
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
            className="flex-1 bg-acent text-primary font-semibold rounded-lg p-3 shadow-md btn-hover hover:bg-highlight transition-smooth"
          >
            {editIndex !== null ? "Update Rx" : "Add to Rx"}
          </button>
          <button
            type="button"
            onClick={() => addToRx(true)}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg p-3 bg-gray-100 btn-hover hover:bg-gray-200 transition-smooth"
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

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay message="Saving Prescription..." />}

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-highlight disabled:opacity-50"
        >
          Save Prescription
        </LoadingButton>
      </div>
    </div>
  );
}