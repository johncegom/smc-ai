import React, { useEffect, createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isNeedToAuth, setIsNeedToAuth] = useState(false);
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    const checkAuthStatus = () => {
      const currentDate = makeCurrentDate();
      if (currentDate > user.timeToLive) {
        handleLogout();
      }
    };
    checkAuthStatus();
  }, [isNeedToAuth]);

  const triggerAuthCheck = () => {
    setIsNeedToAuth((flag) => !flag);
  };

  const handleLogout = () => {
    setUser({
      phoneNumber: user.phoneNumber,
      isAuthenticated: false,
      timeToLive: 0,
    });
  };

  const makeCurrentDate = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return Number(
      year.toString() +
        month.toString().padStart(2, "0") +
        day.toString().padStart(2, "0")
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        triggerAuthCheck,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
