import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const mapAuthCodeToMessage = (authCode) => {
  switch (authCode) {
    case "auth/wrong-password":
      return "Password is not corrected";
    case "auth/user-not-found":
      return "Email is invalid";
    default:
      return "Error";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("Login failed: ", mapAuthCodeToMessage(error.code));
        setError(mapAuthCodeToMessage(error.code));
      });
  };

  return (
    <div>
      <h1 className="title">Login account</h1>
      <div className="loginForm">
        <div className="emailSection">
          <label>Email:</label>
          <input type="email" onChange={handleEmailChange} />
        </div>
        <div className="passwordSection">
          <label>Password:</label>
          <input type="password" onChange={handlePasswordChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submitButton" onClick={handleLogin}>
          LOGIN
        </button>
        <p>
          If you don't have account, you can{" "}
          <Link to="/register">register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
