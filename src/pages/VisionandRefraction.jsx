import React, { useContext, useState } from "react";
import { defaultVisitData } from "../context/visitData";
import { AppointmentContext, PatientContext, VisitContext } from "../context";
import { createVisit } from "../api/visits";

const assessments = [
  "VA", "IOP", "Old Glasses", "Auto Refraction", "Cyclo Auto Refraction",
  "Refraction", "Keratometry", "Retinoscopy", "Optic Disc", "Site Of Incision",
  "Orthoptic Assessment", "Anterior Chamber", "EOM", "Hyphema", "Lens",
  "Gonioscopy", "Hypopyon"
];

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

const EyeAssessmentPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [visit, setVisit] = useState(defaultVisitData);
  // const { visitData, setVisitData } = useContext(VisitContext);
    const { patientData, clearPatientData } = useContext(PatientContext);
    const { appointmentData, clearAppointmentData } = useContext(AppointmentContext);

  const toggleSection = (item) => setActiveSection(prev => prev === item ? "" : item);

  const handleInputChange = (section, side, field, value) => {
    setVisit(prev => ({
      ...prev,
      visionAndRefraction: {
        ...prev.visionAndRefraction,
        [section]: {
          ...prev.visionAndRefraction[section],
          ...(side ? { [side]: { ...prev.visionAndRefraction[section][side], [field]: value } } : { [field]: value })
        }
      }
    }));
  };

  const handleSubmit = async () => {

    try {
      const payload = {
        patientId: patientData._id,
        appointmentId: appointmentData._id,
        visionAndRefraction: visit.visionAndRefraction,
      };

      console.log("Sending payload to backend:", payload);

      const response = await createVisit(payload);
      console.log("Backend response:", response);


      alert("✅ Patient & Visit saved successfully!");

    } catch (err) {
      console.error("Save error:", err);
      alert("❌ " + err.message);
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
          inputs={["VA (L)", "Condition", "é Condition", "é Condition", "é Condition"]}
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
          inputs={["(R) IOP", "Pachymetry R", "(R) Correction Factor", "IOP Final R"]}
          gridCols="grid-cols-1 sm:grid-cols-4"
          onChange={handleInputChange}
          section="iop"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["(L) IOP", "Pachymetry L", "(L) Correction Factor", "IOP Final L"]}
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
          inputs={["VA (R)", "Condition", "é Condition", "é Condition", "é Condition"]}
          onChange={handleInputChange}
          section="autoRefraction"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["VA (L)", "Condition", "é Condition", "é Condition", "é Condition"]}
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
          inputs={["VA (R)", "Condition", "é Condition", "é Condition", "é Condition"]}
          onChange={handleInputChange}
          section="cycloAutoRefraction"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["VA (L)", "Condition", "é Condition", "é Condition", "é Condition"]}
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
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "right", "k1_angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
              <input
                type="text"
                placeholder="k2 R"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "right", "k2", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "right", "k2_angle", e.target.value)}>
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
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "left", "k1_angle", e.target.value)}>
                <option>– angle° –</option>
              </select>
              <input
                type="text"
                placeholder="k2 L"
                className="border rounded p-2 w-[25%]"
                onChange={(e) => handleInputChange("keratometry", "left", "k2", e.target.value)}
              />
              <select className="border rounded p-2 w-[25%]" onChange={(e) => handleInputChange("keratometry", "left", "k2_angle", e.target.value)}>
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
          inputs={["VA (R)", "Condition", "é Condition", "é Condition", "é Condition"]}
          onChange={handleInputChange}
          section="retinoscopy"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={["VA (L)", "Condition", "é Condition", "é Condition", "é Condition"]}
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
            placeholder="Dilated with"
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
          inputs={["--select for (R) Vertical--", "--select for (R) Horizontal--", "--select narration for (R)--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          onChange={handleInputChange}
          section="opticDisc"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["--select for (L) Vertical--", "--select for (L) Horizontal--", "--select narration for (L)--"]}
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
        <InputGrid
          title="== OD =="
          inputs={["--select for (R) Vertical--", "--select for (R) Horizontal--", "--select narration for (R)--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          onChange={(e, side, field, value) => setVisit(prev => ({
            ...prev,
            visionAndRefraction: {
              ...prev.visionAndRefraction,
              anteriorChamber: [
                ...(prev.visionAndRefraction.anteriorChamber || []),
                { side: "right", [field]: value }
              ]
            }
          }))}
          section="anteriorChamber"
          side="right"
        />
        <input
          type="text"
          placeholder="Narration"
          className="border rounded p-2 w-full"
          onChange={(e) => handleInputChange("anteriorChamber", null, "narration", e.target.value)}
        />
        <InputGrid
          title="== OS =="
          inputs={["--select for (L) Vertical--", "--select for (L) Horizontal--", "--select narration for (L)--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          onChange={(e, side, field, value) => setVisit(prev => ({
            ...prev,
            visionAndRefraction: {
              ...prev.visionAndRefraction,
              anteriorChamber: [
                ...(prev.visionAndRefraction.anteriorChamber || []),
                { side: "left", [field]: value }
              ]
            }
          }))}
          section="anteriorChamber"
          side="left"
        />
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
          inputs={Array(9).fill(".........")}
          selectOptions={["Normal", "Restricted"]}
          gridCols="grid-cols-1 sm:grid-cols-3"
          onChange={(section, side, field, value) => setVisit(prev => ({
            ...prev,
            visionAndRefraction: {
              ...prev.visionAndRefraction,
              eom: {
                ...prev.visionAndRefraction.eom,
                right: [...(prev.visionAndRefraction.eom.right || []), value]
              }
            }
          }))}
          section="eom"
          side="right"
        />
        <div className="flex flex-col gap-4">
          <InputGrid
            title="== OS =="
            inputs={Array(9).fill(".........")}
            selectOptions={["Normal", "Restricted"]}
            gridCols="grid-cols-1 sm:grid-cols-3"
            onChange={(section, side, field, value) => setVisit(prev => ({
              ...prev,
              visionAndRefraction: {
                ...prev.visionAndRefraction,
                eom: {
                  ...prev.visionAndRefraction.eom,
                  left: [...(prev.visionAndRefraction.eom.left || []), value]
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
          inputs={["--select for (R) Vertical--", "--select for (R) Horizontal--", "--select narration for (R)--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          gridCols="grid-cols-1 sm:grid-cols-3"
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
          inputs={["--select for (R) Vertical--", "--select for (R) Horizontal--", "--select narration for (R)--"]}
          selectOptions={["NO1 NC1", "NO2 NC2", "NO3 NC3", "NO4 NC4", "NO5 NC5"]}
          onChange={handleInputChange}
          section="lens"
          side="right"
        />
        <InputGrid
          title="== OS =="
          inputs={["--select for (L) Vertical--", "--select for (L) Horizontal--", "--select narration for (L)--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
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
              onChange={(e) => handleInputChange("gonioscopy", i % 2 === 0 ? "right" : "left", i % 2 === 0 ? "vertical" : "horizontal", e.target.value)}
            >
              <option>{i % 2 === 0 ? "--select for (R) Vertical--" : "--select for (R) Horizontal--"}</option>
              {["0.3", "0.4", "0.5"].map((opt, j) => (
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
          inputs={["--select for (R) Vertical--", "--select for (R) Horizontal--"]}
          selectOptions={["0.3", "0.4", "0.5"]}
          gridCols="grid-cols-1 sm:grid-cols-3"
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
        <button
          className="mt-6 bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-highlight transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EyeAssessmentPage;