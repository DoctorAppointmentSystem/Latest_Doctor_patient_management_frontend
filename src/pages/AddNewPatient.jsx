import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPatient } from "../api/patient";
import { useToast } from "../components/Toast";

function AddNewPatient() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        patient_name: "",
        f_h_Name: "", // Father/Husband Name
        gender: "Male",
        age: "",
        dob: "",
        phoneNumber: "", // Combined or separate? Backend likely expects one string.
        address: "",
        city: "",
        cnic: "",
        email: "",
        profession: "",
        guardianName: "",
        // Add other fields as needed based on backend schema
        reference: "",
        history: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.patient_name || !formData.gender || !formData.phoneNumber) {
            toast.error("Please fill in required fields: Name, Gender, Phone");
            return;
        }

        setIsLoading(true);
        try {
            await createPatient(formData);
            toast.success("✅ Patient Created Successfully!");
            setTimeout(() => {
                navigate("/patientlist"); // Or whereever you want to go
            }, 1000);
        } catch (error) {
            console.error("Create patient error:", error);
            toast.error(error.response?.data?.message || "Failed to create patient");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
                <div className="w-[49%] border-1 border-black p-4 rounded-lg flex items-center  justify-center">
                    Total Patient Registered
                </div>
                <Link to="/addpatient" className="w-[49%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center  justify-center">+ ADD Patient</Link>
            </div>

            {/* ... stats section ... */}
            <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
                <div className="w-[32%] border-1 border-primary border-b-6 border-b-primary p-4 rounded-lg flex items-center  justify-center">
                    OPD
                </div>
                <div className="w-[32%] border-1 border-primary border-b-6 border-b-primary p-4 rounded-lg flex items-center  justify-center">
                    Diagnostic
                </div>
                <div className="w-[32%] border-1 border-primary border-b-6 border-b-primary p-4 rounded-lg flex items-center  justify-center">
                    Procedure
                </div>
            </div>

            <div className="bg-primary text-background w-full flex items-center justify-center p-1 font-semibold">+add new patient</div>


            <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-between gap-2">

                <h2 className=" text-primary text-xl font-semibold mt-3">
                    Name & Gender
                </h2>

                <div className="bg-highlight text-primary flex items-center justify-center w-full">========Required========</div>

                <div className="flex gap-2 w-full">
                    {/* <select placeholder="Patient ID" className="w-[30%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">Patient ID 1</option>
                </select> */}
                    {/* Removed Patient ID select as usually auto-generated */}
                    <input
                        type="text"
                        name="patient_name"
                        value={formData.patient_name}
                        onChange={handleChange}
                        placeholder="Patient Name"
                        className="w-[45%] border-1 border-black p-4 rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        name="f_h_Name"
                        value={formData.f_h_Name}
                        onChange={handleChange}
                        placeholder="Father/Husband Name"
                        className="w-[45%] border-1 border-black p-4 rounded-lg mb-2"
                    />
                </div>

                <div className="flex gap-2 w-full">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-[25%] border-1 border-black p-4 rounded-lg mb-2"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age (Years)"
                        className="w-[35%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="Date of Birth"
                        className="w-[35%] border-1 border-black p-4 rounded-lg mb-2"
                    />
                </div>

                <div className="flex gap-2 w-full">
                    {/* Simplified Phone Input for now */}
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number (e.g. 03001234567)"
                        className="w-full border-1 border-black p-4 rounded-lg mb-2"
                    />
                </div>

                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-[40%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-[30%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                    {/* Removed extra fields for simplicity unless required */}
                </div>

                <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">Personal Information (Optional)</h2>

                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        placeholder="Guardian Name"
                        className="w-full border-1 border-black p-4 rounded-lg mb-2"
                    />
                </div>

                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="13 Digit Cnic Number"
                        className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="xxx@gamil.com"
                        className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                    <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        placeholder="Profession"
                        className="w-[33%] border-1 border-black p-4 rounded-lg mb-2"
                    />

                </div>

                <div className="flex items-center justify-between w-full gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-primary hover:bg-highlight hover:text-primary py-3 px-6 text-white rounded-lg font-bold w-full disabled:bg-gray-400"
                    >
                        {isLoading ? "Creating..." : "Create Patient"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddNewPatient