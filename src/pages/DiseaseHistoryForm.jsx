import React from 'react';

function DiseaseHistoryForm() {
  // Row input component
  const HistoryRow = ({ placeholder }) => (
    <div className="mb-2 p-2 bg-white rounded shadow">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
        {/* White content box */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          {/* Patient Header */}
          <div className="mb-4 flex gap-4 items-start border-b pb-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Patient"
              className="w-24 h-24 object-cover rounded shadow"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Viky viky (75 years, 11 months, Male)
                <span className="text-green-500 ml-2">+923006578779</span>
              </p>
              <p className="text-sm text-gray-700">
                House No 123, Street No 456, City, Country
              </p>
              <p className="text-sm text-gray-500">here some description</p>
            </div>
          </div>

          {/* Systemic History Section */}
          <div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Systemic History</h3>
            {[...Array(4)].map((_, i) => (
              <HistoryRow key={`systemic-${i}`} placeholder="Systemic History max-250 character" />
            ))}
          </div>

          {/* Ocular History Section */}
          <div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Ocular History</h3>
            {[...Array(4)].map((_, i) => (
              <HistoryRow key={`ocular-${i}`} placeholder="Ocular History max-250 character" />
            ))}
          </div>

          {/* Presenting Complaints Section */}
          <div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Presenting Complaints</h3>
            {[...Array(4)].map((_, i) => (
              <HistoryRow key={`complaint-${i}`} placeholder="Presenting Complaints max-250 char." />
            ))}
          </div>

          {/* Add New Disease History */}
          <div className="text-blue-600 text-sm mt-3 cursor-pointer hover:underline">
            + add new disease history
          </div>
        </div>
      </main>

      {/* Right Panel */}
      <div className="w-[280px] border-l bg-gray-50 flex flex-col overflow-y-auto">
        <div className="border-b px-4 py-2 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
          💊 Templates, Notes & more..
        </div>

        {/* Tab Header */}
        <div className="flex justify-between px-4 py-2 border-b text-sm font-medium text-gray-700">
          <button className="bg-blue-600 text-white px-4 py-1 rounded shadow">
            View
          </button>
          <span>Visit: 1</span>
          <span className="cursor-pointer hover:underline">Procedure</span>
          <span className="cursor-pointer hover:underline">Diagnostic</span>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 text-center text-gray-400 text-sm">
          No data selected.
        </div>
      </div>
    </div>
  );
}

export default DiseaseHistoryForm;
