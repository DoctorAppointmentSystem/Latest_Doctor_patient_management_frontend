import React, { useContext, useEffect, useState } from "react";
import { defaultVisitData } from "../context/visitData";
import { AppointmentContext, PatientContext, VisitContext } from "../context";
import { createVisit, getVisitById, updateVisit } from "../api/visits";

/* -------------------- helpers & defaults -------------------- */

// create a full default visionAndRefraction object matching your schema shape
const defaultVisionAndRefraction = () => ({
  va: {
    right: { value: "", condition1: "", condition2: "", condition3: "", condition4: "" },
    left:  { value: "", condition1: "", condition2: "", condition3: "", condition4: "" },
  },
  iop: {
    right: { value: "", pachymetry: "", correctionFactor: "", iopFinal: "" },
    left:  { value: "", pachymetry: "", correctionFactor: "", iopFinal: "" },
    narration: "",
    selectedMethod: "",
  },
  oldGlasses: {
    right: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
    left:  { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
    ipdD: "", ipdN: "", remarks: "",
  },
  autoRefraction: {
    right: { sph: "", cyl: "", axis: "", textField: "" },
    left:  { sph: "", cyl: "", axis: "", textField: "" },
    ipdD: "", ipdN: "", remarks: "",
  },
  cycloAutoRefraction: {
    right: { sph: "", cyl: "", axis: "", textField: "" },
    left:  { sph: "", cyl: "", axis: "", textField: "" },
    ipdD: "", ipdN: "", remarks: "",
  },
  refraction: {
    right: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
    left:  { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
    ipdD: "", ipdN: "", type: "", remarks: "",
  },
  keratometry: {
    right: { k1: "", k1angle: "", k2: "", k2angle: "", al: "", p: "", aConstant: "", iol: "", aimIol: "" },
    left:  { k1: "", k1angle: "", k2: "", k2angle: "", al: "", p: "", aConstant: "", iol: "", aimIol: "" },
    methodUsed: "", narration: "",
  },
  retinoscopy: {
    right: { sph: "", cyl: "", angle: "", reflexes: "" },
    left:  { sph: "", cyl: "", angle: "", reflexes: "" },
    distance: "", method: "", dilatedWith: "", narration: ""
  },
  opticDisc: {
    right: { vertical: "", horizontal: "", narration: "" },
    left:  { vertical: "", horizontal: "", narration: "" },
    narration: ""
  },
  siteOfIncision: { right: { angle: "" }, left: { angle: "" }, narration: "" },
  orthopticAssessment: { eom: "", hb: "", narration: "" },
  anteriorChamber: [], // array of entries { eye, flare, cells, acDetails }
  eom: { right: [], left: [] }, // arrays of strings
  hyphema: { right: "", left: "", both: "", narration: "" },
  lens: { right: { nuclear: "", cortical: "", posterior: "" }, left: { nuclear: "", cortical: "", posterior: "" }, narration: "" },
  gonioscopy: { right: { superior: "", medial: "", lateral: "", inferior: "" }, left: { superior: "", medial: "", lateral: "", inferior: "" } },
  hypopyon: { right: "", left: "", narration: "" },
  narration: "" // top-level narration
});

// isPlainObject helper
const isPlainObject = v => v && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date);

// deep merge: merges nested plain objects, preserves missing sibling fields, uses source arrays/primitives when provided
function deepMergeKeep(target = {}, source = {}) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    const sVal = source[key];
    const tVal = out[key];
    if (isPlainObject(sVal) && isPlainObject(tVal)) {
      out[key] = deepMergeKeep(tVal, sVal);
    } else if (isPlainObject(sVal) && tVal === undefined) {
      out[key] = deepMergeKeep({}, sVal);
    } else {
      // arrays/primitives/explicit null/empty arrays: take source
      out[key] = sVal;
    }
  }
  return out;
}

// Build payload for visionAndRefraction by merging default + existing visit + current UI state
function buildVisionPayload(existingVision = {}, uiVision = {}) {
  const defaults = defaultVisionAndRefraction();
  const mergedExisting = deepMergeKeep(defaults, existingVision || {});
  const merged = deepMergeKeep(mergedExisting, uiVision || {});
  // defensive: ensure arrays are arrays
  if (!merged.eom) merged.eom = { right: [], left: [] };
  if (!Array.isArray(merged.eom.right)) merged.eom.right = merged.eom.right ? [merged.eom.right] : [];
  if (!Array.isArray(merged.eom.left)) merged.eom.left = merged.eom.left ? [merged.eom.left] : [];
  if (!Array.isArray(merged.anteriorChamber)) merged.anteriorChamber = merged.anteriorChamber ? [...merged.anteriorChamber] : [];
  return merged;
}

/* -------------------- small UI helpers components -------------------- */

const InputGrid = ({ title, inputs, selectOptions, gridCols = "grid-cols-3 md:grid-cols-5", onChange, section, side }) => (
  <div>
    <div className="text-center text-gray-600 font-semibold mb-2">{title}</div>
    <div className={`grid ${gridCols} gap-5`}>
      {inputs.map((placeholder, i) => {
        const fieldKey = placeholder.toLowerCase().replace(/[\(\)\s]/g, "_").replace("é_", "");
        return selectOptions ? (
          <select
            key={i}
            className="border rounded p-2"
            onChange={(e) => onChange(section, side, fieldKey, e.target.value)}
          >
            <option value="">{placeholder}</option>
            {selectOptions.map((opt, j) => (
              <option key={j} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            key={i}
            type="text"
            placeholder={placeholder}
            className="border rounded p-2"
            onChange={(e) => onChange(section, side, fieldKey, e.target.value)}
          />
        );
      })}
    </div>
  </div>
);

const GlassesSection = ({ onChange, section, side }) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="w-full flex gap-4">
      {["sph R", "cyl R", "axis R", "bcva R"].map((p, i) => (
        <input
          key={i}
          type="text"
          placeholder={p}
          className="border rounded p-2 w-[24%]"
          onChange={(e) => onChange(section, side, p.toLowerCase().replace(" r", ""), e.target.value)}
        />
      ))}
    </div>
    <div className="w-full flex gap-4">
      {["add R", "va NR", "va NR"].map((p, i) => (
        <input
          key={i}
          type="text"
          placeholder={p}
          className="border rounded p-2 w-[33%]"
          onChange={(e) => onChange(section, side, i === 0 ? "add" : `va_nr_${i + 1}`, e.target.value)}
        />
      ))}
    </div>
  </div>
);

const BottomRow = ({ onChange, section }) => (
  <div className="w-full flex gap-4">
    <div className="w-[50%] flex gap-4">
      <input
        type="text"
        placeholder="IPD D"
        className="border rounded p-2 w-[50%]"
        onChange={(e) => onChange(section, null, "ipdD", e.target.value)}
      />
      <input
        type="text"
        placeholder="IPD N"
        className="border rounded p-2 w-[50%]"
        onChange={(e) => onChange(section, null, "ipdN", e.target.value)}
      />
    </div>
    <input
      type="text"
      placeholder="Remarks"
      className="border rounded p-2 w-[50%]"
      onChange={(e) => onChange(section, null, "remarks", e.target.value)}
    />
  </div>
);

/* -------------------- main component -------------------- */

const assessments = [
  "VA", "IOP", "Old Glasses", "Auto Refraction", "Cyclo Auto Refraction",
  "Refraction", "Keratometry", "Retinoscopy", "Optic Disc", "Site Of Incision",
  "Orthoptic Assessment", "Anterior Chamber", "EOM", "Hyphema", "Lens",
  "Gonioscopy", "Hypopyon"
];

const EyeAssessmentPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [visit, setVisit] = useState(defaultVisitData);
  const [serverVisit, setServerVisit] = useState(null); // holds fetched server version
  const { visitData, setVisitData } = useContext(VisitContext);
  const { patientData, clearPatientData } = useContext(PatientContext);
  const { appointmentData, clearAppointmentData } = useContext(AppointmentContext);
  const visitId = visitData?.visitId;

  const toggleSection = (item) => setActiveSection(prev => prev === item ? "" : item);

  // update handler: merges into UI state (only changes what user edits)
  const handleInputChange = (section, side, field, value) => {
    setVisit(prev => {
      const vision = { ...(prev.visionAndRefraction || defaultVisionAndRefraction()) };
      if (side) {
        vision[section] = { ...(vision[section] || {}) };
        vision[section][side] = { ...(vision[section]?.[side] || {}), [field]: value };
      } else {
        vision[section] = { ...(vision[section] || {}), [field]: value };
      }
      return { ...prev, visionAndRefraction: vision };
    });
  };

  // helper: append anterior chamber entry
  const addAnteriorChamberEntry = (eye, entry) => {
    setVisit(prev => {
      const vision = { ...(prev.visionAndRefraction || defaultVisionAndRefraction()) };
      vision.anteriorChamber = [...(vision.anteriorChamber || []), { eye, ...entry }];
      return { ...prev, visionAndRefraction: vision };
    });
  };

  // fetch existing visit
  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await getVisitById(visitId);
        const data = response?.data?.data || response?.data || null;
        if (data) {
          setServerVisit(data);
          // merge server data into UI state but keep our structure defaults
          const mergedVision = buildVisionPayload(data.visionAndRefraction || {}, (visit.visionAndRefraction || {}));
          setVisit(prev => ({ ...prev, ...data, visionAndRefraction: mergedVision }));
        }
      } catch (err) {
        console.error("fetch visit error:", err);
      }
    };
    fetchVisitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitId]);

  const handleSubmit = async () => {
    try {
      // build merged payload: server values (if any) + UI edits
      const existingVision = serverVisit?.visionAndRefraction || {};
      const uiVision = visit?.visionAndRefraction || {};
      const visionPayload = buildVisionPayload(existingVision, uiVision);

      const payload = {
        visionAndRefraction: visionPayload,
        // include other sections if you collect them (history/examination/prescription)
        // history: visit.history ? deepMergeKeep(serverVisit?.history || {}, visit.history) : undefined,
      };

      console.log("Sending payload to backend:", payload);
      const response = await updateVisit(visitId, payload);
      console.log("Backend response:", response?.data || response);
      // update serverVisit with returned data so subsequent edits merge correctly
      const updatedData = response?.data?.data || response?.data || null;
      if (updatedData) {
        setServerVisit(updatedData);
        setVisit(prev => ({ ...prev, ...updatedData, visionAndRefraction: buildVisionPayload(updatedData.visionAndRefraction || {}, prev.visionAndRefraction || {}) }));
      }
      alert("✅ Visit updated successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ " + (err?.message || "Update failed"));
    }
  };

  const sectionConfigs = {
    VA: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["value", "condition1", "condition2", "condition3", "condition4"]}
          onChange={handleInputChange}
          section="va"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["value", "condition1", "condition2", "condition3", "condition4"]}
          onChange={handleInputChange}
          section="va"
          side="left"
        />
      </div>
    ),
    IOP: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["value", "pachymetry", "correctionFactor", "iopFinal"]}
          gridCols="grid-cols-1 sm:grid-cols-4"
          onChange={handleInputChange}
          section="iop"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["value", "pachymetry", "correctionFactor", "iopFinal"]}
          gridCols="grid-cols-1 sm:grid-cols-4"
          onChange={handleInputChange}
          section="iop"
          side="left"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="border rounded p-2"
            onChange={(e) => handleInputChange("iop", null, "selectedMethod", e.target.value)}
          >
            <option>--select method--</option>
            <option value="applanation">Applanation</option>
            <option value="noncontact">Non-contact</option>
          </select>
          <input
            type="text"
            placeholder="Narration"
            className="border rounded p-2"
            onChange={(e) => handleInputChange("iop", null, "narration", e.target.value)}
          />
        </div>
      </div>
    ),
    "Old Glasses": (
      <div className="space-y-6">
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OD ==</div>
          <GlassesSection onChange={handleInputChange} section="oldGlasses" side="right" />
        </div>
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OS ==</div>
          <GlassesSection onChange={handleInputChange} section="oldGlasses" side="left" />
        </div>
        <BottomRow onChange={handleInputChange} section="oldGlasses" />
      </div>
    ),
    "Auto Refraction": (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["sph", "cyl", "axis", "textField"]}
          onChange={handleInputChange}
          section="autoRefraction"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["sph", "cyl", "axis", "textField"]}
            onChange={handleInputChange}
            section="autoRefraction"
            side="left"
          />
          <BottomRow onChange={handleInputChange} section="autoRefraction" />
        </div>
      </div>
    ),
    "Cyclo Auto Refraction": (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["sph", "cyl", "axis", "textField"]}
          onChange={handleInputChange}
          section="cycloAutoRefraction"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["sph", "cyl", "axis", "textField"]}
            onChange={handleInputChange}
            section="cycloAutoRefraction"
            side="left"
          />
          <BottomRow onChange={handleInputChange} section="cycloAutoRefraction" />
        </div>
      </div>
    ),
    Refraction: (
      <div className="space-y-6">
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OD ==</div>
          <GlassesSection onChange={handleInputChange} section="refraction" side="right" />
        </div>
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OS ==</div>
          <GlassesSection onChange={handleInputChange} section="refraction" side="left" />
        </div>
        <BottomRow onChange={handleInputChange} section="refraction" />
        <input
          type="text"
          placeholder="Remarks"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("refraction", null, "remarks", e.target.value)}
        />
      </div>
    ),
    Keratometry: (
      <div className="space-y-6">
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OD ==</div>
          <div className="flex flex-col gap-3">
            <div className="w-full flex gap-2">
              <input
                type="text"
                placeholder="k1 R"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "right", "k1", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "right", "k1angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
              <input
                type="text"
                placeholder="k2 R"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "right", "k2", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "right", "k2angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
            </div>
            <div className="w-full flex gap-2">
              <div className="w-[50%] flex gap-2">
                {["AL R", "P R", "A Constant R"].map((p, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={p}
                    className="border rounded p-2 w-[33%]"
                    onChange={(e) => handleInputChange("keratometry", "right", p.toLowerCase().replace(" r", ""), e.target.value)}
                  />
                ))}
              </div>
              <div className="flex w-full gap-2">
                {["IOL R", "Aim IOL R"].map((p, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={p}
                    className="border rounded p-2 w-[50%]"
                    onChange={(e) => handleInputChange("keratometry", "right", p.toLowerCase().replace(" r", "").replace("aim ", ""), e.target.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center text-gray-600 font-semibold mb-2">== OS ==</div>
          <div className="flex flex-col gap-3">
            <div className="w-full flex gap-2">
              <input
                type="text"
                placeholder="k1 L"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "left", "k1", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "left", "k1angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
              <input
                type="text"
                placeholder="k2 L"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "left", "k2", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "left", "k2angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
            </div>
            <div className="w-full flex gap-2">
              <div className="w-[50%] flex gap-2">
                {["AL L", "P L", "A Constant L"].map((p, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={p}
                    className="border rounded p-2 w-[33%]"
                    onChange={(e) => handleInputChange("keratometry", "left", p.toLowerCase().replace(" l", ""), e.target.value)}
                  />
                ))}
              </div>
              <div className="flex w-full gap-2">
                {["IOL L", "Aim IOL L"].map((p, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={p}
                    className="border rounded p-2 w-[50%]"
                    onChange={(e) => handleInputChange("keratometry", "left", p.toLowerCase().replace(" l", "").replace("aim ", ""), e.target.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <input
            type="text"
            placeholder="Method used"
            className="border rounded p-2"
            onChange={(e) => handleInputChange("keratometry", null, "methodUsed", e.target.value)}
          />
          <input
            type="text"
            placeholder="Narration"
            className="border rounded p-2"
            onChange={(e) => handleInputChange("keratometry", null, "narration", e.target.value)}
          />
        </div>
      </div>
    ),
    Retinoscopy: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["sph", "cyl", "angle", "reflexes"]}
          onChange={handleInputChange}
          section="retinoscopy"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["sph", "cyl", "angle", "reflexes"]}
            onChange={handleInputChange}
            section="retinoscopy"
            side="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <select
              className="border rounded p-2"
              onChange={(e) => handleInputChange("retinoscopy", null, "distance", e.target.value)}
            >
              <option>– Distance –</option>
              {["6 meters", "3 meters", "1 meter"].map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="border rounded p-2"
              onChange={(e) => handleInputChange("retinoscopy", null, "method", e.target.value)}
            >
              <option>– Method –</option>
              {["Snellen", "LogMAR", "E Chart"].map((opt, i) => (
                <option key={i} value={opt.toLowerCase()}>{opt}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Dilated with"
              className="border rounded p-2"
              onChange={(e) => handleInputChange("retinoscopy", null, "dilatedWith", e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Narration"
            className="border rounded p-2 w-full"
            onChange={(e) => handleInputChange("retinoscopy", null, "narration", e.target.value)}
          />
        </div>
      </div>
    ),
    "Optic Disc": (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["vertical", "horizontal", "narration"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          onChange={handleInputChange}
          section="opticDisc"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["vertical", "horizontal", "narration"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          onChange={handleInputChange}
          section="opticDisc"
          side="left"
        />
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("opticDisc", null, "narration", e.target.value)}
        />
      </div>
    ),
    "Site Of Incision": <BottomRow onChange={handleInputChange} section="siteOfIncision" />,
    "Orthoptic Assessment": <BottomRow onChange={handleInputChange} section="orthopticAssessment" />,
    "Anterior Chamber": (
      <div className="space-y-6">
        <div>
          <InputGrid
            title="== OD =="
            inputs={["flare", "cells", "acDetails"]}
            selectOptions={["None", "Mild", "Moderate", "Severe"]}
            onChange={(section, side, field, value) => addAnteriorChamberEntry("R", { [field]: value })}
            section="anteriorChamber"
            side="right"
          />
        </div>
        <div>
          <InputGrid
            title="== OS =="
            inputs={["flare", "cells", "acDetails"]}
            selectOptions={["None", "Mild", "Moderate", "Severe"]}
            onChange={(section, side, field, value) => addAnteriorChamberEntry("L", { [field]: value })}
            section="anteriorChamber"
            side="left"
          />
        </div>
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("anteriorChamber", null, "narration", e.target.value)}
        />
      </div>
    ),
    EOM: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={Array(9).fill("movement")}
          selectOptions={["Normal", "Restricted"]}
          gridCols="grid-cols-1 sm:grid-cols-3"
          onChange={(section, side, field, value) => setVisit(prev => ({
            ...prev,
            visionAndRefraction: {
              ...prev.visionAndRefraction,
              eom: {
                ...((prev.visionAndRefraction && prev.visionAndRefraction.eom) || { right: [], left: [] }),
                right: [...((prev.visionAndRefraction && prev.visionAndRefraction.eom && prev.visionAndRefraction.eom.right) || []), value]
              }
            }
          }))}
          section="eom"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={Array(9).fill("movement")}
            selectOptions={["Normal", "Restricted"]}
            gridCols="grid-cols-1 sm:grid-cols-3"
            onChange={(section, side, field, value) => setVisit(prev => ({
              ...prev,
              visionAndRefraction: {
                ...prev.visionAndRefraction,
                eom: {
                  ...((prev.visionAndRefraction && prev.visionAndRefraction.eom) || { right: [], left: [] }),
                  left: [...((prev.visionAndRefraction && prev.visionAndRefraction.eom && prev.visionAndRefraction.eom.left) || []), value]
                }
              }
            }))}
            section="eom"
            side="left"
          />
          <input
            type="text"
            placeholder="Narration"
            className="border rounded p-2 w-full"
            onChange={(e) => handleInputChange("eom", null, "narration", e.target.value)}
          />
        </div>
      </div>
    ),
    Hyphema: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["value", "narration"]}
          onChange={handleInputChange}
          section="hyphema"
          side="right"
        />
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("hyphema", null, "narration", e.target.value)}
        />
      </div>
    ),
    Lens: (
      <div className="space-y-6">
        <InputGrid
          title="== OD =="
          inputs={["nuclear", "cortical", "posterior"]}
          onChange={handleInputChange}
          section="lens"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["nuclear", "cortical", "posterior"]}
          onChange={handleInputChange}
          section="lens"
          side="left"
        />
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("lens", null, "narration", e.target.value)}
        />
      </div>
    ),
    Gonioscopy: (
      <div className="space-y-6">
        <div className="text-center text-gray-600 font-semibold mb-2">== OS ==</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array(6).fill().map((_, i) => (
            <select
              key={i}
              className="border rounded p-2"
              onChange={(e) => handleInputChange("gonioscopy", i % 2 === 0 ? "right" : "left", i % 2 === 0 ? "superior" : "medial", e.target.value)}
            >
              <option>{i % 2 === 0 ? "--select for (R) Vertical--" : "--select for (R) Horizontal--"}</option>
              {["Open", "Closed", "Narrow"].map((opt, j) => (
                <option key={j} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("gonioscopy", null, "narration", e.target.value)}
        />
      </div>
    ),
    Hypopyon: (
      <div className="space-y-6">
        <InputGrid
          title=""
          inputs={["value", "narration"]}
          onChange={handleInputChange}
          section="hypopyon"
          side="right"
        />
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("hypopyon", null, "narration", e.target.value)}
        />
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {assessments.map((item, index) => (
            <li key={index}>
              <button
                className="w-full text-left text-primary font-semibold bg-gray-100 p-3 rounded-md hover:bg-highlight transition"
                onClick={() => toggleSection(item)}
              >
                {item}
              </button>
              {activeSection === item && (
                <div className="mt-4 bg-white rounded-md p-4 shadow-sm">
                  {sectionConfigs[item]}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-end">
          <button
            className="mt-6 bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-highlight transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EyeAssessmentPage;
