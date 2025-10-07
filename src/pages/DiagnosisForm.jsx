import { useState } from "react";

const DiagnosisForm = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow rounded-lg space-y-6">

      {/* Diagnosis Section */}
      <div>
        <h2
          className="text-primary font-semibold cursor-pointer"
          onClick={() => toggleSection("diagnosis")}
        >
          Diagnosis
        </h2>

        {activeSection === "diagnosis" && (
          <div className="space-y-4 mt-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Diagnosis _ max-250 character"
                  className="w-[40%] flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <select className="w-[40%] border border-gray-300 rounded px-2 py-2 text-sm">
                  <option>For L</option>
                  <option>For R</option>
                  <option>For B</option>
                </select>
               <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                    <div className="dot  w-3 h-3 bg-white rounded-full transition"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Treatment Plan */}
      <div>
        <h2
          className="text-primary font-semibold cursor-pointer"
          onClick={() => toggleSection("treatment")}
        >
          Treatment Plan
        </h2>

        {activeSection === "treatment" && (
          <div className="space-y-4 mt-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Diagnosis _ max-250 character"
                  className="w-[40%] flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <select className="w-[40%] border border-gray-300 rounded px-2 py-2 text-sm">
                  <option>For L</option>
                  <option>For R</option>
                  <option>For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                    <div className="dot  w-3 h-3 bg-white rounded-full transition"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Management Plan Section */}
      <div>
        <h2
          className="text-primary font-semibold cursor-pointer"
          onClick={() => toggleSection("management")}
        >
          Management Plan
        </h2>

        {activeSection === "management" && (
          <div className="space-y-4 mt-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Management Plan max-250 character"
                  className="w-[50%] flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <select className="w-[50%] border border-gray-300 rounded px-2 py-2 text-sm">
                  <option>For R</option>
                  <option>For L</option>
                  <option>For B</option>
                </select>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-highlight flex items-center justify-start p-1 peer-checked:justify-end">
                    <div className="dot  w-3 h-3 bg-white rounded-full transition"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisForm;
