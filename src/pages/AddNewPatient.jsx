import { Link } from "react-router-dom";

function AddNewPatient() {
    return (
        <div className="flex flex-col gap-4">
             <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
                <div className="w-[49%] border-1 border-black p-4 rounded-lg flex items-center  justify-center">
                    Total Patient Registered
                </div>
                <Link to="/addpatient" className="w-[49%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center  justify-center">+ ADD Patient</Link>
            </div>

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
                <select placeholder="Patient ID" className="w-[30%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">Patient ID 1</option>
                    <option value="2">Patient ID 2</option>
                    <option value="3">Patient ID 3</option>
                </select>
                <input type="text" placeholder="Patient Name" className="w-[35%] border-1 border-black p-4 rounded-lg mb-2" />
                <input type="text" placeholder="Father/Husband Name" className="w-[35%] border-1 border-black p-4 rounded-lg mb-2" />
            </div>

            <div className="flex gap-2 w-full">
                <select className="w-[25%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                </select>

                <input type="text" placeholder="Age in years" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="# years" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="date" placeholder="Date of Birth" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />
            </div>

            <div className="flex gap-2 w-full">
                <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">+92</option>
                    <option value="2">+91</option>
                    <option value="3">+1</option>
                </select>

                <select className="w-[30%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">300</option>
                    <option value="2">400</option>
                    <option value="3">500</option>
                </select>

                <input type="text" placeholder="Phone Number" className="w-[60%] border-1 border-black p-4 rounded-lg mb-2" />
            </div>

            <div className="flex gap-2 w-full">
                <input type="text" placeholder="Address" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="City" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="Check Nub" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <select className="w-[25%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">Self</option>
                    <option value="2">Father</option>
                    <option value="3">Mother</option>
                    <option value="4">Husband</option>
                    <option value="5">Wife</option>
                    <option value="6">Brother</option>
                    <option value="7">Sister</option>
                    <option value="8">Other</option>
                </select>
            </div>

            <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">Personal Information (Optional)</h2>

            <div className="flex gap-2 w-full">
                <input type="text" placeholder="Old" className="w-[25%] border-1 border-black p-4 rounded-lg mb-2" />

                <select className="w-[10%] border-1 border-black p-4 rounded-lg mb-2">
                    <option value="1">***********</option>
                    <option value="2">***********</option>
                    <option value="3">***********</option>
                </select>


                <input type="text" placeholder="Guardian Name" className="w-[85%] border-1 border-black p-4 rounded-lg mb-2" />
            </div>

            <div className="flex gap-2 w-full">
                <input type="text" placeholder="13 Digit Cnic Number" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="email" placeholder="xxx@gamil.com" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="Profession" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

            </div>

            <h2 className="w-full text-primary flex items-center justify-center font-semibold tet-xl mt-2">References and History (optional)</h2>

            <div className="flex gap-2 w-full">
                <input type="text" placeholder="Referenced by" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="Histroy of" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="Private" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />

                <input type="text" placeholder="***********" className="w-[33%] border-1 border-black p-4 rounded-lg mb-2" />
            </div>

            <div className="flex items-center justify-between
         w-full gap-2">
                <Link to="/patient" className="bg-primary hover:bg-highlight hover:text-primary py-2 px-4 text-white rounded-lg">Create Patient</Link>

                <button className="bg-highlight py-2 px-4 text-primary rounded-lg">Reset page</button>
            </div>

        </div>
        </div>
    )
}

export default AddNewPatient