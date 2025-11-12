import React, { useState, useEffect, useCallback, memo, useContext } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiBell, FiChevronRight, FiChevronDown, FiChevronLeft} from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { MdRecentActors } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { create } from "zustand";
import { Routes, Route, Link } from "react-router-dom";
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
const Navigation = memo(({ collapsed }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const navItems = [
    { icon: FiHome, label: "Home",pagelink:"/" },
    { icon: TbReportSearch, label: "Daily Cash Report", pagelink:"/dailycashreport" },
    { 
      icon: FaList, 
      label: "Patients List",
      pagelink:"/patientlist",
    //   subItems: ["General", "Security", "Notifications"]
    },
    // { icon: MdRecentActors, label: "Patients Recent OPD",pagelink:"/PatientRecentOPD" },
    // { icon: FiBell, label: "Today's Reservation", pagelink:"/todaysreservation" },
    // { 
    //   icon: FiUser, 
    //   label: "Prefrences",
    //   subItems: ["Personal Info", "Account Settings", "Privacy"],
    //   pagelink:"/prefrences"
    // },
    // { 
    //   icon: FaCalendarPlus, 
    //   label: "OPD",
    //   subItems: ["Personal Info", "Account Settings", "Privacy"],
    //   pagelink:"/OPD"
    // }
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

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Ensure full reload for auth state
  };
  const { clearPatientData } = useContext(PatientContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const {clearPatientData} = useContext(PatientContext);

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (!mobile) {
      setMobileMenuOpen(false);
    }
  }, []);




  useEffect(() => {
    // localStorage.removeItem("isLoggedIn");

    clearPatientData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const getpatientbyId = async () => {
    try{
    const res = [];

    console.log(res.data);
  } catch(error) {
    console.log(error)
  }
  }

  getpatientbyId();
  
  

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
              Navbar
            </div>
          </div> 
        </header>
        <div className="">
          <div className="p-2">
            <Routes>
              <Route path="/" element={<AppHome />} />
              <Route path="/patientlist" element={<PatientList />} />
              <Route path="/dailycashreport" element={<DailyCashReport/>}/>
              <Route path="/patientrecentopd" element={<PatientRecentOPD/>}/>
              <Route path="/opd" element={<OPD/>}/>
              <Route path="/prefrences" element={<Prefrences/>}/>
              <Route path="/todaysreservation" element={<TodaysReservation/>}/>
              <Route path="/addpatient" element={<AddNewPatient />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/discounttypes" element={<DiscountTypes />} />
              <Route path="/examination" element={<Examination />} />
              <Route path="/TodayReservation" element={<TodayReservation />} />
              <Route path="/DailyCashReport" element={<DailyCashReport />} />
              <Route path="/patientscreen" element={<Patientscreen />} />
              {/* <Route path="/token" element={<PatientTokenPage />} /> */}
              <Route path="/cashReport" element={<ShowCashReportPage />} />
            </Routes>
            
             
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
