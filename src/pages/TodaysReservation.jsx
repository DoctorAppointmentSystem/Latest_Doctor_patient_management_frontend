import React, { useState } from 'react';
import { FiSearch, FiRefreshCw, FiPlus, FiFilter } from 'react-icons/fi';

function TodayReservation() {
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  // Main reservation screen
  if (!showAddPatientForm) {
    return (
      <div className="p-6 bg-white min-h-screen text-sm">
        <h1 className="text-xl font-semibold text-blue-800 mb-6">
          🩺 Patient's Reservation For August 2, 2025
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input type="text" placeholder="Search Token No" className="border p-2 rounded w-52" />
          <input type="text" placeholder="Search Patient Info" className="border p-2 rounded w-64" />
          <button className="bg-blue-500 text-white p-2 rounded flex items-center gap-1">
            <FiSearch /> Search
          </button>
          <button className="border border-blue-500 text-blue-500 p-2 rounded flex items-center gap-1">
            <FiRefreshCw /> Refresh
          </button>
          <button className="border border-blue-500 text-blue-500 p-2 rounded">Show Pending Check-in</button>
          <button className="border border-blue-500 text-blue-500 p-2 rounded flex items-center gap-1">
            <FiFilter /> More Filter
          </button>
        </div>

        <div className="bg-white border-l-4 border-green-500 rounded shadow p-4 mb-6 max-w-md">
          <h2 className="text-lg font-semibold">Dr. Ahmad Zeshan Jamil</h2>
          <p className="text-gray-500">OPD: 26632 &nbsp; | &nbsp; Total: 28,890</p>
          <p className="text-gray-400 text-sm">Last Check-in: 9:38 a.m</p>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-blue-700 font-semibold mb-4">Appointment Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Procedure', 'Emergency', 'Appointment', 'Walk-in', 'Follow-up', 'Diagnostic'].map((type) => (
              <div
                key={type}
                className="border border-gray-200 bg-white rounded-md shadow-sm p-4 flex flex-col justify-between"
              >
                <span className="text-sm font-medium text-gray-700 mb-3">{type}</span>
                <button
                  onClick={() => setShowAddPatientForm(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <FiPlus className="text-sm" /> Add Patient
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-blue-700 underline cursor-pointer">
          Doctor Advised Services:{' '}
          <span className="text-blue-600">
            Create appointments from recommended diagnostics and procedures
          </span>
        </div>

        <div className="fixed bottom-6 right-6 z-40">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <FiPlus /> Create Entry
          </button>
        </div>
      </div>
    );
  }

  // Add New Patient screen (your original modal content)
  return (
    <div className="p-6 bg-white min-h-screen text-sm">
      {/* Back button */}
      <button
        onClick={() => setShowAddPatientForm(false)}
        className="text-blue-600 underline text-sm mb-4"
      >
        ← Back to Reservations
      </button>

      <div className="bg-white w-full max-w-2xl rounded shadow p-6 mx-auto">
        {/* Add New Patient Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-4 font-semibold">
          + Add New Patient
        </button>

        <p className="text-gray-600 text-sm mb-2">
          Search Patient with anything like name, address, mobile, MR#, etc. (min 3 characters) or Scan QR:
        </p>

        <input
          type="text"
          placeholder="Search Patient (search will start after min 3 character)"
          className="w-full border border-blue-300 rounded p-2 mb-4 outline-blue-500"
        />

        <div className="text-gray-400 italic text-sm">No results found.</div>
      </div>
    </div>
  );
}

export default TodayReservation;
