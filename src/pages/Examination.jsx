import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"; // ✅ Navigation hook
import { createVisit, updateVisit } from '../api/visits'; // Assuming your API function is here
import { AppointmentContext, PatientContext, VisitContext } from '../context'; // Assuming your contexts are here
import { useToast } from '../components/Toast'; // ✅ Toast notifications
import { FiTrash } from 'react-icons/fi'; // ✅ Delete Icon


// --- STYLES (moved outside function to prevent re-creation) ---
const inputStyle = "p-2 border border-gray-300 rounded-lg w-full flex-grow transition-smooth input-focus hover:border-primary";
const selectStyle = "border border-gray-300 p-2 rounded-lg bg-white w-40 flex-shrink-0 transition-smooth input-focus hover:border-primary cursor-pointer";
const toggleContainerStyle = "relative inline-flex items-center cursor-pointer";
const toggleBaseStyle = "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight";

// ✅ REUSABLE TOGGLE COMPONENT (moved outside to prevent focus loss)
const ToggleSwitch = ({ checked, onChange }) => (
  <label className={toggleContainerStyle}>
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className={toggleBaseStyle}></div>
  </label>
);

// ✅ REUSABLE EXAMINATION SECTION COMPONENT (moved outside to prevent focus loss)
const ExaminationSection = ({ title, items, setter, placeholder, keyPrefix, onRemove, onChange, onAdd }) => (
  <>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${keyPrefix}-${index}`} className="flex items-center gap-3">
          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onRemove(setter, index)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Remove Row"
          >
            <FiTrash size={18} />
          </button>
          <input
            type="text"
            placeholder={placeholder}
            className={inputStyle}
            value={item.disease}
            onChange={(e) => onChange(setter, index, 'disease', e.target.value)}
          />
          <select
            className={selectStyle}
            value={item.eye}
            onChange={(e) => onChange(setter, index, 'eye', e.target.value)}
          >
            <option value="">Select Eye</option>
            <option value="R">R</option>
            <option value="L">L</option>
            <option value="B">B</option>
          </select>
          <ToggleSwitch
            checked={item.notesEnabled}
            onChange={(e) => onChange(setter, index, 'notesEnabled', e.target.checked)}
          />
        </div>
      ))}
      {/* Add Row Button */}
      <button
        type="button"
        onClick={() => onAdd(setter)}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-primary hover:text-primary transition"
      >
        + Add Row
      </button>
    </div>
  </>
);

function Examination() {
  // --- STATE MANAGEMENT ---
  // Default value for 'eye' is now 'L' in all initial states.
  const [lens, setLens] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [ac, setAc] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [iris, setIris] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [pupil, setPupil] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [cornea, setCornea] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [conjunctiva, setConjunctiva] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [lids, setLids] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [vitreous, setVitreous] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [fundus, setFundus] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [cdRatio, setCdRatio] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [opticDisk, setOpticDisk] = React.useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);
  const [findings, setFindings] = React.useState([
    { disease: '', eye: 'L', duration: '', notesEnabled: false },
  ]);
  const [otherExternalFindings, setOtherExternalFindings] = useState([
    { disease: '', eye: 'L', notesEnabled: false },
  ]);

  const { patientData } = useContext(PatientContext);
  const { appointmentData } = useContext(AppointmentContext);
  const { visitData, setVisitData } = useContext(VisitContext);
  const visitId = visitData?.visitId;
  const { toast } = useToast(); // ✅ Toast hook
  const navigate = useNavigate(); // ✅ Initialize hook

  const [isLoading, setIsLoading] = useState(false);

  // ✅ HYDRATE from VisitContext on mount (for when user navigates back)
  React.useEffect(() => {
    if (visitData?.examination) {
      console.log("Hydrating Examination from context:", visitData.examination);
      const exam = visitData.examination;
      if (exam.lens?.length > 0) setLens(exam.lens);
      if (exam.ac?.length > 0) setAc(exam.ac);
      if (exam.iris?.length > 0) setIris(exam.iris);
      if (exam.pupil?.length > 0) setPupil(exam.pupil);
      if (exam.cornea?.length > 0) setCornea(exam.cornea);
      if (exam.conjunctiva?.length > 0) setConjunctiva(exam.conjunctiva);
      if (exam.lids?.length > 0) setLids(exam.lids);
      if (exam.vitreous?.length > 0) setVitreous(exam.vitreous);
      if (exam.fundus?.length > 0) setFundus(exam.fundus);
      if (exam.cdRatio?.length > 0) setCdRatio(exam.cdRatio);
      if (exam.opticDisk?.length > 0) setOpticDisk(exam.opticDisk);
      if (exam.findings?.length > 0) setFindings(exam.findings);
      if (exam.otherExternalFindings?.length > 0) setOtherExternalFindings(exam.otherExternalFindings);
    }
  }, []); // Only run on mount

  // ✅ SYNC to VisitContext whenever local state changes
  React.useEffect(() => {
    setVisitData(prev => ({
      ...prev,
      examination: {
        lens, ac, iris, pupil, cornea, conjunctiva, lids,
        vitreous, fundus, cdRatio, opticDisk, findings, otherExternalFindings
      }
    }));
  }, [lens, ac, iris, pupil, cornea, conjunctiva, lids, vitreous, fundus, cdRatio, opticDisk, findings, otherExternalFindings, setVisitData]);


  const handleStateChange = (setter, index, field, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ✅ Add Row handler
  const handleAddRow = (setter, hasDuration = false) => {
    setter(prev => [...prev, hasDuration
      ? { disease: '', eye: 'L', duration: '', notesEnabled: false }
      : { disease: '', eye: 'L', notesEnabled: false }
    ]);
  };

  // ✅ Remove Row handler
  const handleRemoveRow = (setter, index) => {
    setter(prev => {
      if (prev.length <= 1) return prev; // Keep at least 1 row
      return prev.filter((_, i) => i !== index);
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

      toast.success("✅ Examination saved successfully!"); // ✅ Toast instead of alert
      // ✅ Auto-navigate to next step
      setTimeout(() => navigate("/patient/diagnosisform"), 1500);

    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err.response?.data?.message || err.message;
      toast.error("❌ " + errorMessage); // ✅ Toast instead of alert
    }
    finally {
      setIsLoading(false);
    }
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-semibold">Saving Examination...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">

      {/* ✅ Using Reusable ExaminationSection Component for all sections */}
      <ExaminationSection title="Lens" items={lens} setter={setLens} placeholder="Lens finding" keyPrefix="lens" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="AC (Anterior Chamber)" items={ac} setter={setAc} placeholder="AC finding" keyPrefix="ac" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Iris" items={iris} setter={setIris} placeholder="Iris finding" keyPrefix="iris" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Pupil" items={pupil} setter={setPupil} placeholder="Pupil finding" keyPrefix="pupil" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Cornea" items={cornea} setter={setCornea} placeholder="Cornea finding" keyPrefix="cornea" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Conjunctiva" items={conjunctiva} setter={setConjunctiva} placeholder="Conjunctiva finding" keyPrefix="conjunctiva" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Lids" items={lids} setter={setLids} placeholder="Lids finding" keyPrefix="lids" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Vitreous" items={vitreous} setter={setVitreous} placeholder="Vitreous finding" keyPrefix="vitreous" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Fundus" items={fundus} setter={setFundus} placeholder="Fundus finding" keyPrefix="fundus" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="CD Ratio" items={cdRatio} setter={setCdRatio} placeholder="CD Ratio finding" keyPrefix="cdRatio" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />
      <ExaminationSection title="Optic Disk" items={opticDisk} setter={setOpticDisk} placeholder="Optic Disk finding" keyPrefix="opticDisk" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />

      {/* Finding (has duration field - special handling) */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Finding</h3>
      <div className="space-y-3">
        {findings.map((item, index) => (
          <div key={`finding-${index}`} className="flex items-center gap-3">
            <button type="button" onClick={() => handleRemoveRow(setFindings, index)} className="text-red-500 hover:text-red-700 p-1" title="Remove Row">
              <FiTrash size={18} />
            </button>
            <input type="text" placeholder="Finding" className={inputStyle} value={item.disease} onChange={(e) => handleStateChange(setFindings, index, 'disease', e.target.value)} />
            <select className={selectStyle} value={item.eye} onChange={(e) => handleStateChange(setFindings, index, 'eye', e.target.value)}>
              <option value="">Select Eye</option><option value="R">R</option><option value="L">L</option><option value="B">B</option>
            </select>
            <input type="text" placeholder="Duration" className={inputStyle} value={item.duration} onChange={(e) => handleStateChange(setFindings, index, 'duration', e.target.value)} />
            <ToggleSwitch checked={item.notesEnabled} onChange={(e) => handleStateChange(setFindings, index, 'notesEnabled', e.target.checked)} />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow(setFindings, true)} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-primary hover:text-primary transition">
          + Add Row
        </button>
      </div>

      <ExaminationSection title="Other External Findings" items={otherExternalFindings} setter={setOtherExternalFindings} placeholder="Other finding" keyPrefix="other" onRemove={handleRemoveRow} onChange={handleStateChange} onAdd={handleAddRow} />

      {/* --- ACTION BUTTONS --- */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary hover:bg-highlight text-white px-6 py-2.5 rounded-lg font-semibold shadow-md btn-hover disabled:bg-gray-400 disabled:cursor-not-allowed transition-smooth"
        >
          {isLoading ? "Saving..." : "Save Examination"}
        </button>
      </div>
    </div>
  );
}

export default Examination;