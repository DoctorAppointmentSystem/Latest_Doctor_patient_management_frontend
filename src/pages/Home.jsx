import React, { useState, useEffect, useCallback, memo, useContext } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiBell, FiChevronRight, FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { MdRecentActors } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { create } from "zustand";
import { Outlet, Link } from "react-router-dom"; // ✅ FIXED: Use Outlet instead of Routes
import { useNavigate } from 'react-router-dom';
import DailyCashReport from "./DailyCashReport";
import PatientRecentOPD from "./PatientRecentOPD";
import OPD from "./OPD";
import Prefrences from "./Prefrences";
import TodaysReservation from "./TodaysReservation"
import AddNewPatient from "../pages/AddNewPatient";
import AppHome from "./AppHome";
import PatientList from "./PatientList";
import AppointmentPage from "./AppointmentPage";
import DiscountTypes from "./DiscountTypes"
import Examination from "../pages/Examination"
import DiagnosisForm from "./DiagnosisForm";
import PrescriptionPage from "./Prescriptionpage";
import TodayReservation from "./TodaysReservation";
import Patientscreen from "./Patientsscreen";
import PatientTokenPage from "./PatientTokenPage";
import ShowCashReportPage from "./ShowCashReportPage";
import { PatientContext } from "../context";


const useSidebarStore = create((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const SidebarToggle = memo(({ collapsed, setCollapsed, isMobile, toggleMobileMenu }) => {
  return (
    <button
      onClick={() => isMobile ? toggleMobileMenu() : setCollapsed(!collapsed)}
      className="p-2 hover:bg-highlight rounded-lg hover:text-primary"
    >
      {isMobile ? (
        collapsed ? <FiMenu /> : <FiX />
      ) : (
        collapsed ? <FiChevronRight /> : <FiChevronLeft />
      )}
    </button>
  );
});

// Updated: Navigation component with clickable options
// This component should be inside your Layout.js file

// Logout Confirmation Modal Component
const LogoutConfirmModal = memo(({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl transform transition-all">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Logout Confirmation</h3>
          <p className="text-gray-600 mb-6">Kya aap waqai logout karna chahte hain?</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const Navigation = memo(({ collapsed }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const navItems = [
    { icon: FiHome, label: "Home", pagelink: "/" },
    { icon: TbReportSearch, label: "Daily Cash Report", pagelink: "/dailycashreport" },
    { icon: MdRecentActors, label: "Expenses", pagelink: "/expenses" },
    {
      icon: FaList,
      label: "Patients List",
      pagelink: "/patientlist",
    },
    // Logout removed from here - moved to sidebar bottom
  ];

  const handleItemClick = (label) => {
    setSelectedItem(selectedItem === label ? null : label);
  };

  return (
    <nav className="mt-4">
      <ul className="space-y-2 px-2">
        {navItems.map(({ icon: Icon, label, subItems, pagelink }) => (
          <div key={label} className="relative">
            <Link
              to={pagelink}
              onClick={() => handleItemClick(label)}
              onMouseEnter={() => collapsed && setHoveredItem(label)}
              onMouseLeave={() => collapsed && setHoveredItem(null)}
              className={`
                flex items-center p-3 rounded-lg hover:bg-highlight hover:text-primary
                ${collapsed ? "justify-center" : "justify-between"}
                ${selectedItem === label ? "bg-acent text-primary" : ""}
              `}
            >
              <div className="flex items-center">
                <Icon className="w-6 h-6" />
                {!collapsed && <span className="ml-3">{label}</span>}
              </div>
              {!collapsed && subItems && (
                <FiChevronDown
                  className={`transition-transform duration-200 ${selectedItem === label ? "transform rotate-180" : ""}`}
                />
              )}
            </Link>

            {/* Show dropdown if selected */}
            {subItems && !collapsed && selectedItem === label && (
              <div className="mt-1 ml-8 space-y-1">
                {subItems.map((subItem) => (
                  <a
                    key={subItem}
                    href="#"
                    className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            )}

            {/* Hover card when collapsed */}
            {subItems && hoveredItem === label && collapsed && (
              <div
                className="
                  absolute top-0 left-full
                  w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50
                  ml-2
                "
              >
                {subItems.map((subItem) => (
                  <a
                    key={subItem}
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
});

// Separate Logout Button Component - for sidebar bottom
const LogoutButton = memo(({ collapsed, onLogout }) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 px-2">
      <button
        onClick={onLogout}
        className={`
          flex items-center p-3 rounded-lg w-full
          bg-red-600 hover:bg-red-700 text-white
          transition-colors duration-200
          ${collapsed ? "justify-center" : "justify-start"}
        `}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {!collapsed && <span className="ml-3 font-medium">Logout</span>}
      </button>
    </div>
  );
});

const Layout = () => {
  const navigate = useNavigate();
  const { clearPatientData } = useContext(PatientContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Show confirmation modal when logout button is clicked
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Actually perform logout when confirmed
  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Ensure full reload for auth state
  };

  // Cancel logout
  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (!mobile) {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    clearPatientData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Added: Overlay for mobile menu
  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}
      onClick={() => setMobileMenuOpen(false)}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />

      <Overlay />

      <aside
        className={`
          fixed top-0 h-full bg-primary text-background transition-all duration-300 z-50
          ${isMobile ? (mobileMenuOpen ? "left-0" : "-left-64") : "left-0"}
          ${collapsed && !isMobile ? "w-20" : "w-64"}
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold ${collapsed && !isMobile ? "hidden" : "block"}`}>Dashboard</h1>
          <SidebarToggle
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
        <Navigation collapsed={collapsed && !isMobile} />

        {/* Logout Button - Positioned at bottom of sidebar */}
        <LogoutButton collapsed={collapsed && !isMobile} onLogout={handleLogoutClick} />
      </aside>

      <main
        className={`
          flex-1 transition-all duration-300
          ${isMobile ? "ml-0" : (collapsed ? "ml-20" : "ml-64")}
        `}
      >
        <header className="shadow-sm p-4  bg-primary text-background">
          <div className="flex items-center justify-center ">
            <div className="flex items-center w-full md:w-auto text-[36px] font-bold">
              {isMobile && (
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiMenu className="w-6 h-6" />
                </button>
              )}
              <span className="text-xl font-bold text-primary">
                Jamil Eye Care
              </span>
            </div>
          </div>
        </header>
        <div className="">
          <div className="p-2">
            {/* ✅ FIXED: Use Outlet instead of duplicate Routes - App.jsx handles routing */}
            <Outlet />


          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
