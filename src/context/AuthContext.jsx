import { createContext, useContext, useState, useEffect } from "react";
import { getItemWithExpiry } from "../services/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ FIXED: Check 'token' key (what LoginPage saves) instead of 'isLoggedIn'
  const [isLoggedIn, setIsLoggedIn] = useState(!!getItemWithExpiry("token"));

  // ✅ NEW: Manage User Role
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "doctor"; // Default fallback
  });

  useEffect(() => {
    const checkLogin = setInterval(() => {
      const loggedIn = !!getItemWithExpiry("token"); // ✅ FIXED: Use 'token' key
      setIsLoggedIn(loggedIn);
      // Ensure role is consistent
      if (!loggedIn) {
        localStorage.removeItem("userRole");
        setUserRole(null);
      }
    }, 60 * 1000); // check every minute
    return () => clearInterval(checkLogin);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
