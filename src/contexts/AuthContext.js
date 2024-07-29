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

  const requestNewAccessCode = async (phoneNumber) => {
    const url = "/CreateNewAccessCode";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    };
    try {
      const response = await fetch(url, option);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      const accessCode = data.accessCode;
      console.log(accessCode);
    } catch (error) {
      console.error(error.message);
    }
  };

  const validateAccessCode = async (phoneNumber, accessCode) => {
    const url = "/ValidateAccessCode";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessCode, phoneNumber }),
    };

    try {
      const response = await fetch(url, option);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const result = data.success;
      console.log(result);

      if (result) {
        const timeToLive = makeTimeToLive();
        setUser({
          phoneNumber: phoneNumber,
          isAuthenticated: true,
          timeToLive: timeToLive,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    setUser({
      phoneNumber: user.phoneNumber,
      isAuthenticated: false,
      timeToLive: 0,
    });
  };

  const makeTimeToLive = () => {
    const date = new Date();

    let expireDay = date.getDate();
    let month = date.getMonth() + 1;
    let expireMonth = month + 1;
    let expireYear = date.getFullYear();

    if (expireMonth > 12) {
      expireMonth = 1;
      expireYear++;
    }

    return Number(
      expireYear.toString() +
        expireMonth.toString().padStart(2, "0") +
        expireDay.toString().padStart(2, "0")
    );
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
        triggerAuthCheck,
        requestNewAccessCode,
        validateAccessCode,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
