import { useContext, useState, useEffect } from "react";
import { PatientContext } from "../../context";
import { getPatientsById, updatePatientById } from "../../api/patient";

const Notes = () => {
    const { patientData } = useContext(PatientContext);
    const [note, setNote] = useState("");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchNote() {
            setLoading(true);
            setError("");
            try {
                if (patientData?._id) {
                    const res = await getPatientsById(patientData._id);
                    const data = res.data?.data || res.data;
                    setNote(data?.additional_notes || "");
                }
            } catch (err) {
                setError("Failed to fetch note.");
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, [patientData?._id]);

    const handleSave = async () => {
        setSaving(true);
        setError("");
        try {
            await updatePatientById(patientData._id, { additional_notes: note });
            setEditing(false);
        } catch (err) {
            setError("Failed to save note.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        setError("");
        try {
            await updatePatientById(patientData._id, { additional_notes: "" });
            setNote("");
            setEditing(false);
        } catch (err) {
            setError("Failed to delete note.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4">Loading note...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Patient Note</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {editing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 h-24 outline-primary"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Enter note for this patient..."
                        disabled={saving}
                    />
                    <div className="flex gap-2">
                        <button
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-highlight"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setEditing(false)}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleDelete}
                            disabled={saving}
                        >
                            {saving ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {note && note.trim() !== "" ? (
                        <div className="bg-gray-100 p-3 rounded text-gray-800 flex justify-between items-center">
                            <span>{note}</span>
                            <button
                                className="ml-4 text-primary underline hover:text-highlight"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 italic flex justify-between items-center">
                            No note found for this patient.
                            <button
                                className="ml-4 text-primary underline bg-background hover:bg-highlight py-1 px-2 mr-4 rounded"
                                onClick={() => setEditing(true)}
                            >
                                Add Note
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default Notes;