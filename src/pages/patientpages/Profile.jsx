import { useContext, useState } from "react";
import Loader from "../../components/Loader";
import { updatePatientById } from "../../api/patient";
import { PatientContext } from "../../context";
import { set } from "date-fns";

function Profile() {
  const { patientData, setPatientData, clearPatientData } = useContext(PatientContext);
  const [formData, setFormData] = useState(patientData || {});
  const [saving, setSaving] = useState(false);

  if (!patientData) return <Loader />;

  // for normal fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // for nested fields
  const handleNestedChange = (e, parentKey) => {
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log("Saving patient data:", patientData._id, formData);
      const res = await updatePatientById(patientData._id, formData); // <-- API call
      console.log("Update response:", res);
      alert("Patient updated successfully ✅");
    } catch (error) {
      console.error("Error updating patient:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col gap-3">

        {/* Patient Info */}
        <h2 className="font-bold mt-4">Patient Info</h2>
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
        <input type="text" name="patient_name" value={formData.patient_name || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Patient Name" />
        <input type="text" name="father_name" value={formData.father_name || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Father Name" />
        </div>
        <div className="w-full flex gap-3">
        <input type="text" name="phone_number" value={formData.phone_number || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Phone Number" />
        <input type="number" name="age" value={formData.age || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Age" />
        {/* <input type="text" name="gender" value={formData.gender || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Gender" /> */}
        <select name="gender" value={formData.gender || ""} onChange={handleChange} className="border p-2 rounded w-[25%] bg-white">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>

        </select>
        <input type="date" name="date_of_birth" value={formData.date_of_birth?.split("T")[0] || ""} onChange={handleChange} className="border p-2 rounded w-[25%]" />
        </div>
        <div className="w-full flex gap-3">
        <input type="text" name="address" value={formData.address || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Address" />
        <input type="text" name="city" value={formData.city || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="City" />
        </div>
        <div className="w-full flex gap-3">
        <input type="text" name="check_nub" value={formData.check_nub || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Check Number" />
        <input type="text" name="appointment_by" value={formData.appointment_by || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Appointment By" />
        <input type="text" name="old_mrn" value={formData.old_mrn || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Old MRN" />
        </div>
        </div>
        {/* Guardian Info */}
        <h2 className="font-bold mt-4">Guardian Details</h2>
         <div className="w-full flex flex-col gap-3">
        <div className="w-full flex gap-3">
        <input type="text" name="relation" value={formData.guardian?.relation || ""} onChange={(e) => handleNestedChange(e, "guardian")} className="border p-2 rounded w-full" placeholder="Relation" />
        <input type="text" name="name" value={formData.guardian?.name || ""} onChange={(e) => handleNestedChange(e, "guardian")} className="border p-2 rounded w-full" placeholder="Guardian Name" />
        </div>
        <div className="w-full flex gap-3">
        <input type="text" name="cnic" value={formData.guardian?.cnic || ""} onChange={(e) => handleNestedChange(e, "guardian")} className="border p-2 rounded w-full" placeholder="Guardian CNIC" />
        <input type="email" name="email" value={formData.guardian?.email || ""} onChange={(e) => handleNestedChange(e, "guardian")} className="border p-2 rounded w-full" placeholder="Guardian Email" />
        <input type="text" name="profession" value={formData.guardian?.profession || ""} onChange={(e) => handleNestedChange(e, "guardian")} className="border p-2 rounded w-full" placeholder="Guardian Profession" />
        </div>
        </div>

        {/* Reference History */}
        <h2 className="font-bold mt-4">Reference History</h2>
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
        <input type="text" name="reference_by" value={formData.reference_history?.reference_by || ""} onChange={(e) => handleNestedChange(e, "reference_history")} className="border p-2 rounded w-full" placeholder="Reference By" />
        <input type="text" name="history_type" value={formData.reference_history?.history_type || ""} onChange={(e) => handleNestedChange(e, "reference_history")} className="border p-2 rounded w-full" placeholder="History Type" />
        </div>
        <textarea name="public_notes" value={formData.reference_history?.public_notes || ""} onChange={(e) => handleNestedChange(e, "reference_history")} className="border p-2 rounded w-full" placeholder="Public Notes"></textarea>
        </div>
        {/* Save Button */}
        <button onClick={handleSave} disabled={saving} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-highlight hover:text-primary">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
