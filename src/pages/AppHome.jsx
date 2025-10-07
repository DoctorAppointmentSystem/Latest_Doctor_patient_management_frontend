import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function AppHome() {
  const appointmentTypes = [
    "Procedure",
    "Emergency",
    "Appointment",
    "Walk-in",
    "Follow-up",
    "Diagnostic",
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header with Date */}
      <div className="text-primary font-medium text-sm mb-2 cursor-pointer hover:underline">
        Patient's Reservation For June 25, 2025
      </div>

      {/* Search & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 ">
        <input
          type="text"
          placeholder="Search Token No"
          className="border-1 border-secondary p-4 rounded-lg w-[25%] outline-primary"
        />
        <input
          type="text"
          placeholder="Search Patient Info"
          className="border-1 border-secondary p-4 rounded-lg w-[25%] outline-primary"
        />
        <button className="border border-secondary text-primary px-3 py-2 rounded-3xl text-sm hover:bg-highlight hover:border-none lg:w-[10%] w-auto">
          Refresh
        </button>
        <button className="border border-secondary text-primary px-3 py-2 rounded-3xl text-sm hover:bg-highlight hover:border-none lg:w-[20%] w-auto">
          Show Pending Check-in
        </button>
        <button className="flex items-center gap-x-2 whitespace-nowrap border border-secondary text-primary px-3 py-2 rounded-3xl text-sm hover:bg-highlight hover:border-none lg:w-[10%] w-auto">
          ☰ More Filter
        </button>
      </div>

      {/* Doctor Info */}
      <div className="bg-white border-l-4 border-primary shadow p-4 mb-4 rounded">
        <div className="border-1 border-secondary w-[350px] rounded-lg p-4 hover:border-black">
          <p className="text-sm font-semibold">Dr Ahmad Zeshan Jamil</p>
          <div className="flex gap-3 text-xs mt-1">
            <span className="bg-acent text-primary px-2 py-0.5 rounded">
              OPD: 10
            </span>
            <span className="bg-acent text-primary px-2 py-0.5 rounded">
              Token: 10
            </span>
            <span className="text-gray-500">Last Enter: 9:00 am</span>
          </div>
        </div>
      </div>

      {/* Appointment Types */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-primary text-sm font-semibold mb-3 flex items-center">
          Appointment Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Procedure</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>

          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Emergency</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>

          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Appointment</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>

          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Walk-in</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>

          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Follow-up</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>

          <div className="border-1 border-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-primary font-medium mb-2">Diagnostic</h3>
            <Link to={"/patientscreen"}>
              <button className="flex items-center justify-center gap-2 bg-acent text-primary px-4 py-4 rounded text-sm w-full hover:bg-highlight">
                <FaUserPlus className="text-primary text-xs" />
                Add Patient
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Doctor Advised Services */}
      <div className="text-sm text-gray-700 mb-2">
        <span className="text-primary font-medium">
          Doctor Advised Services:
        </span>{" "}
        <span>
          Create{" "}
          <span className="text-primary underline cursor-pointer">
            appointments
          </span>{" "}
          from recommended{" "}
          <span className="text-primary underline cursor-pointer">
            diagnostics
          </span>{" "}
          and{" "}
          <span className="text-primary underline cursor-pointer">
            procedures
          </span>
        </span>
      </div>

      {/* Create Entry Button */}
      <button className="bg-acent text-primary px-4 py-2 rounded shadow text-sm hover:bg-highlight">
        Create Entry
      </button>
    </div>
  );
}

export default AppHome;
