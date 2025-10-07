// RxForm.jsx
import React, { useState } from "react";

export default function PrescriptionPage() {
  const [selected, setSelected] = useState({
    medicine: "",
    dosage: "",
    for_: "",
    duration: "",
  });

  const [rxList, setRxList] = useState([]); // all prescribed medicines
  const [editIndex, setEditIndex] = useState(null); // track which item is being edited
  const [nextVisitDate, setNextVisitDate] = useState(""); // track calendar date

  const handleChange = (field) => (e) => {
    setSelected((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const addToRx = () => {
    if (selected.medicine && selected.dosage && selected.for_ && selected.duration) {
      if (editIndex !== null) {
        // update existing item
        const updatedList = [...rxList];
        updatedList[editIndex] = selected;
        setRxList(updatedList);
        setEditIndex(null);
      } else {
        // add new item
        setRxList((prev) => [...prev, selected]);
      }

      // reset form
      setSelected({
        medicine: "",
        dosage: "",
        for_: "",
        duration: "",
      });
    } else {
      alert("⚠️ Please fill all fields before adding to Rx");
    }
  };

  const handleEdit = (index) => {
    setSelected(rxList[index]); // load item into form
    setEditIndex(index); // track which item is being edited
  };

  const handleRemove = (index) => {
    setRxList((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      // if currently editing removed item → reset form
      setSelected({
        medicine: "",
        dosage: "",
        for_: "",
        duration: "",
      });
      setEditIndex(null);
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

          <div className="flex flex-wrap gap-2 mt-2">
            <input
              className="flex-1 border border-gray-300 rounded p-2 outline-primary"
              placeholder="Enter Dosage"
              value={selected.dosage}
              onChange={handleChange("dosage")}
            />
            <input
              className="flex-1 border border-gray-300 rounded p-2 outline-primary"
              placeholder="Enter For (e.g. Pain, Fever)"
              value={selected.for_}
              onChange={handleChange("for_")}
            />
            <input
              className="flex-1 border border-gray-300 rounded p-2 outline-primary"
              placeholder="Enter Duration"
              value={selected.duration}
              onChange={handleChange("duration")}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addToRx}
            className="flex-1 bg-acent text-primary font-medium rounded p-3 hover:bg-highlight"
          >
            {editIndex !== null ? "Update Rx" : "Add to Rx"}
          </button>
          <button
            type="button"
            className="flex-1 border border-background text-gray-700 rounded p-3 bg-background"
          >
            Add to Rx as free provided
          </button>
        </div>

        {/* Summary / Remarks */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="w-[40%] border border-primary text-primary rounded px-4 py-2 hover:bg-background"
          >
            Summary
          </button>
          <input
            type="text"
            placeholder="Rx Header remarks Prior to Rx"
            className="w-[50%] border border-background rounded p-2 md:w-full outline-primary"
          />
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
                <span>
                  <b>{rx.medicine}</b> — {rx.dosage}, {rx.for_}, {rx.duration}
                </span>
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
        ></textarea>
      </div>
      {/* Next Visit Date */}
        <div className="mt-4 bg-white w-full p-4 rounded-lg shadow-md">
          <label className="block mb-1 font-medium">Next Visit Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2 outline-primary"
            value={nextVisitDate}
            onChange={(e) => setNextVisitDate(e.target.value)}
          />
        </div>
    </div>
  );
}
