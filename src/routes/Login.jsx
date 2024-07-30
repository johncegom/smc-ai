import { useState, useContext } from "react";
import "../assests/Login.css";
import "../assests/ultilize.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [phoneNumber, setTelNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isWaitOTPCode, setIsWaitOTPCode] = useState(false);
  const [selectCountryCode, setSelectCountryCode] = useState("+84");
  const [errorReport, setErrorReport] = useState({});
  const { user, setUser } = useContext(AuthContext);

  const countryCodes = [
    { key: "+84", country: "Vietnam" },
    { key: "+1", country: "USA" },
    { key: "+44", country: "UK" },
    { key: "+61", country: "Australia" },
    { key: "+81", country: "Japan" },
    { key: "+82", country: "South Korea" },
    { key: "+86", country: "China" },
    { key: "+91", country: "India" },
    { key: "+92", country: "Pakistan" },
    { key: "+33", country: "France" },
    { key: "+49", country: "Germany" },
    { key: "+39", country: "Italy" },
    { key: "+34", country: "Spain" },
    { key: "+7", country: "Russia" },
    { key: "+63", country: "Philippines" },
  ];

  const sendVerificationCode = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      let formatedTelNumber = phoneNumber.replace(/\s/g, "");
      formatedTelNumber = selectCountryCode + formatedTelNumber;
      const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
      if (!regex.test(formatedTelNumber)) {
        setErrorReport({
          isError: true,
          error: "Phone number is not international phone number format.",
        });
      } else {
        requestNewAccessCode(formatedTelNumber);
        setTelNumber(formatedTelNumber);
        setIsWaitOTPCode(!isWaitOTPCode);
      }
    }
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
      setErrorReport({ isError: true, error: error.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpCode) {
      validateAccessCode(phoneNumber, otpCode);
      setOtpCode("");
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
      const data = await response.json();
      const result = data.success;

      if (result) {
        const timeToLive = makeTimeToLive();
        setUser({
          phoneNumber: phoneNumber,
          isAuthenticated: true,
          timeToLive: timeToLive,
        });
      } else {
        setErrorReport({ isError: true, error: data.message });
      }
    } catch (error) {
      setErrorReport({ isError: true, error: error.message });
    }
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

  if (user.isAuthenticated) {
    return <Navigate to="/" replace="true" />;
  }

  return (
    <>
      <main className="container flex flex--col">
        <h1 className="login__title">
          Do your best work <br />
          with <span>SmC AI</span>
        </h1>

        {!isWaitOTPCode ? (
          <form
            action="submit"
            onSubmit={sendVerificationCode}
            className="form__login"
          >
            <p>
              Enter a mobile phone number that you have access to. This number
              will be use to login in SmC AI.
            </p>
            <section className="flex">
              <select
                id="country-code"
                name="country-code"
                defaultValue={selectCountryCode}
                onChange={(e) => setSelectCountryCode(e.target.value)}
                className="form__input"
              >
                {countryCodes?.map((countryCode) => {
                  return (
                    <option key={countryCode.key} value={countryCode.key}>
                      {countryCode.key} ({countryCode.country})
                    </option>
                  );
                })}
              </select>
              <input
                id="tel-num"
                className="form__input"
                type="tel"
                placeholder="337673871"
                size="20"
                minLength="9"
                maxLength="11"
                onChange={(e) => {
                  setErrorReport({ isError: false });
                  setTelNumber(e.target.value);
                }}
                value={phoneNumber}
              />
            </section>
            {errorReport.isError && (
              <p className="error-banner">{errorReport.error}</p>
            )}
            <button className="btn__login btn--primary-color" type="submit">
              Send Verification Code
            </button>
          </form>
        ) : (
          <form action="submit" onSubmit={handleSubmit} className="form__login">
            <p>
              SmC AI has sent an OTP code to your phone number:{" "}
              <b>{phoneNumber}</b>
            </p>
            <input
              id="otp-code"
              className="form__input"
              type="text"
              inputMode="numeric"
              minLength="6"
              maxLength="6"
              onChange={(e) => {
                setErrorReport({ isError: false });
                setOtpCode(e.target.value);
              }}
              value={otpCode}
            />
            {errorReport.isError && (
              <p className="error-banner">{errorReport.error}</p>
            )}

            <button className="btn__login btn--secondary-color" type="submit">
              Submit
            </button>
          </form>
        )}
      </main>
    </>
  );
}

export default Login;
