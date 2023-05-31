import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordRepeatChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordRepeat(e.target.value);
  };

  const handleRegister = () => {
    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        console.log("Login successful");
      })
      .catch((error) => {
        console.log("Login failed: ", error.message);
      });
  };

  return (
    <div>
      <h1 className="title">Create an account</h1>
      <div className="registerForm">
        <div>
          <label>Email:</label>
          <input type="email" onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Repeat password:</label>
          <input type="password" onChange={handlePasswordRepeatChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submitButton" onClick={handleRegister}>
          REGISTER
        </button>
        <p>
          Back to <Link to="/">homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
