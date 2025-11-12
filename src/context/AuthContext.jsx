import { createContext, useContext, useState, useEffect } from "react";
import { getItemWithExpiry } from "../services/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getItemWithExpiry("isLoggedIn"));

  useEffect(() => {
    const checkLogin = setInterval(() => {
      const loggedIn = !!getItemWithExpiry("isLoggedIn");
      setIsLoggedIn(loggedIn);
    }, 60 * 1000); // check every minute
    return () => clearInterval(checkLogin);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
