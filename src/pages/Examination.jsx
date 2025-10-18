import React, { useContext, useState } from 'react';
import { createVisit, updateVisit } from '../api/visits'; // Assuming your API function is here
import { AppointmentContext, PatientContext, VisitContext } from '../context'; // Assuming your contexts are here

function Examination() {
  // --- STATE MANAGEMENT ---
  // Default value for 'eye' is now 'L' in all initial states.
  const [lens, setLens] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [ac, setAc] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [iris, setIris] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [pupil, setPupil] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [cornea, setCornea] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [conjunctiva, setConjunctiva] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [lids, setLids] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [vitreous, setVitreous] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [fundus, setFundus] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [cdRatio, setCdRatio] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [opticDisk, setOpticDisk] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [findings, setFindings] = React.useState([
    { disease: '', eye: 'L', duration: '', notesEnabled: false },
    { disease: '', eye: 'L', duration: '', notesEnabled: false },
  ]);
  const [otherExternalFindings, setOtherExternalFindings] = useState([
    { disease: '', eye: 'L', notesEnabled: false },
    { disease: '', eye: 'L', notesEnabled: false },
  ]);

  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { visitData, setVisitData } = useContext(VisitContext);
  const visitId = visitData?.visitId;

  const [isLoading, setIsLoading] = useState(false);


  const handleStateChange = (setter, index, field, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    console.log("visitId:", visitId);
    setIsLoading(true);
    const allSections = [
        { name: 'lens', data: lens },
        { name: 'ac', data: ac },
        { name: 'iris', data: iris },
        { name: 'pupil', data: pupil },
        { name: 'cornea', data: cornea },
        { name: 'conjunctiva', data: conjunctiva },
        { name: 'lids', data: lids },
        { name: 'vitreous', data: vitreous },
        { name: 'fundus', data: fundus },
        { name: 'cdRatio', data: cdRatio },
        { name: 'opticDisk', data: opticDisk },
        { name: 'findings', data: findings },
        { name: 'otherExternalFindings', data: otherExternalFindings },
    ];
    
    const payloadExamination = {};

    allSections.forEach(section => {
        const filteredData = section.data.filter(item => item.disease && item.disease.trim() !== '');
        if (filteredData.length > 0) {
            payloadExamination[section.name] = filteredData;
        }
    });

    try {
      const payload = {
        examination: payloadExamination,
      };

      console.log(visitData.visitId)
      console.log("Sending payload to backend:", JSON.stringify(payload, null, 2));

      const response = await updateVisit(visitId, payload);
      console.log("Backend response:", response);

      alert("✅ Patient & Visit saved successfully!");

    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err.response?.data?.message || err.message;
      alert("❌ " + errorMessage);
    }
    finally {
      setIsLoading(false);
    }
  };
  
  // --- STYLES ---
  const inputStyle = "p-2 border border-primary rounded-[5px] outline-primary w-full flex-grow";
  const selectStyle = "border border-primary p-2 rounded-[5px] outline-primary bg-white w-40 flex-shrink-0";
  const toggleContainerStyle = "relative inline-flex items-center cursor-pointer";
  // NOTE: 'bg-highlight' should be a custom color in your tailwind.config.js
  const toggleBaseStyle = "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight";

  // --- REUSABLE TOGGLE COMPONENT ---
  const ToggleSwitch = ({ checked, onChange }) => (
    <label className={toggleContainerStyle}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className={toggleBaseStyle}></div>
    </label>
  );

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold">Saving Examination...</p>
        </div>
    );
  } 

  return (
    <div className="space-y-6 pb-6">
      
      {/* Lens */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Lens</h3>
      <div className="space-y-3">
        {lens.map((item, index) => (
          <div key={`lens-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Lens finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setLens, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setLens, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setLens, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* AC */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">AC</h3>
      <div className="space-y-3">
        {ac.map((item, index) => (
          <div key={`ac-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="AC finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setAc, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setAc, index, 'eye', e.target.value)}>
               <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setAc, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Iris */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Iris</h3>
      <div className="space-y-3">
        {iris.map((item, index) => (
          <div key={`iris-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Iris finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setIris, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setIris, index, 'eye', e.target.value)}>
               <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setIris, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>
      
      {/* Pupil */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Pupil</h3>
      <div className="space-y-3">
        {pupil.map((item, index) => (
          <div key={`pupil-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Pupil finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setPupil, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setPupil, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setPupil, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Cornea */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Cornea</h3>
      <div className="space-y-3">
        {cornea.map((item, index) => (
          <div key={`cornea-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Cornea finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setCornea, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setCornea, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setCornea, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Conjunctiva */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Conjunctiva</h3>
      <div className="space-y-3">
        {conjunctiva.map((item, index) => (
          <div key={`conjunctiva-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Conjunctiva finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setConjunctiva, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setConjunctiva, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setConjunctiva, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Lids */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Lids</h3>
      <div className="space-y-3">
        {lids.map((item, index) => (
          <div key={`lids-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Lids finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setLids, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setLids, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setLids, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Vitreous */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Vitreous</h3>
      <div className="space-y-3">
        {vitreous.map((item, index) => (
          <div key={`vitreous-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Vitreous finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setVitreous, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setVitreous, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setVitreous, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Fundus */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Fundus</h3>
      <div className="space-y-3">
        {fundus.map((item, index) => (
          <div key={`fundus-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Fundus finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setFundus, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setFundus, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setFundus, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* CD Ratio */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">CD Ratio</h3>
      <div className="space-y-3">
        {cdRatio.map((item, index) => (
          <div key={`cdRatio-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="CD Ratio finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setCdRatio, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setCdRatio, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setCdRatio, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Optic Disk */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Optic Disk</h3>
      <div className="space-y-3">
        {opticDisk.map((item, index) => (
          <div key={`opticDisk-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Optic Disk finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setOpticDisk, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setOpticDisk, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setOpticDisk, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Finding */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Finding</h3>
      <div className="space-y-3">
        {findings.map((item, index) => (
          <div key={`finding-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setFindings, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setFindings, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <input type="text" placeholder="Duration" className={inputStyle} value={item.duration} onChange={(e) => handleStateChange(setFindings, index, 'duration', e.target.value)} />
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setFindings, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* Other External Findings */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Other External Findings</h3>
      <div className="space-y-3">
        {otherExternalFindings.map((item, index) => (
          <div key={`other-${index}`} className="flex items-center gap-3">
            <input type="text" placeholder="Other finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setOtherExternalFindings, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setOtherExternalFindings, index, 'eye', e.target.value)}>
               <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setOtherExternalFindings, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex justify-end gap-4 mt-8">
          <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-primary hover:bg-highlight text-background px-6 py-2 rounded font-semibold disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Examination"}
          </button>
        </div>
    </div>
  );
}

export default Examination;