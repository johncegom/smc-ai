import { useState, useContext } from "react";
import "../assests/Login.css";
import "../assests/ultilize.css";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [phoneNumber, setTelNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isWaitOTPCode, setIsWaitOTPCode] = useState(false);
  const { user, requestNewAccessCode, validateAccessCode } =
    useContext(AuthContext);

  const sendVerificationCode = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      let formatedTelNumber = phoneNumber.replace(/\s/g, "");
      requestNewAccessCode(formatedTelNumber);
      setTelNumber(formatedTelNumber);
      setIsWaitOTPCode(!isWaitOTPCode);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpCode) {
      validateAccessCode(phoneNumber, otpCode);
    }
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
            <input
              id="tel-num"
              className="form__input"
              type="tel"
              onChange={(e) => setTelNumber(e.target.value)}
              value={phoneNumber}
            />
            <button className="btn__login btn--primary-color" type="submit">
              Send Verification Code
            </button>
          </form>
        ) : (
          <form action="submit" onSubmit={handleSubmit} className="form__login">
            <p>
              SmCAI has sent an OTP code to your phone number:{" "}
              <b>{phoneNumber}</b>
            </p>
            <input
              id="otp-code"
              className="form__input"
              type="text"
              inputMode="numeric"
              maxLength="6"
              pattern="[0-9]{6}"
              onChange={(e) => setOtpCode(e.target.value)}
              value={otpCode}
            />
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
