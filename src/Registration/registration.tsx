import React, { useState } from "react";
import "./registration.css"; // Import the CSS file
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [showRegView, setShowRegView] = useState(false);

  const [userDetails, setUserDetails] = useState({});

  const [message, setMessage] = useState({});

  const navigate = useNavigate()

  const toggleRightPanel = () => {
    setShowRegView((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // document.cookie =  `token=hello;max-age=604800;domain=example.com`
    // console.log('psdx', document.cookie)
    e.preventDefault();
    if (
      (showRegView && !userDetails.username) ||
      !userDetails.email ||
      !userDetails.password ||
      (!showRegView && !userDetails.email) ||
      !userDetails.password
    ) {
      setMessage({
        severity: "error",
        text: "Missing required field",
      });
      return;
    }
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = "";
    const config = {
      data: {
        Authorization: `Bearer $token`,
      },
    };
    try {
      const url = `${baseURL}/${showRegView ? "user" : "auth/login"}`;
      const result = await axios.post(url, userDetails, config);
      if(!showRegView) {
        const token = result.data.access_token
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Expires in 7 days
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        navigate("/journal");     
      }
      else {
        toggleRightPanel()
      }
      setMessage({
        severity: "success",
        text: `Success. ${showRegView ? 'Please login with the credentials you just created' : ''}`,
      });
    } catch (e) {
      setMessage({
        severity: "error",
        text:  showRegView ? "Error creating user" : "Error logging you in",
      });
    }
  };

  return (
    <div className="reg-container" id="reg-container">
      <div className="form-container sign-in-container">
        <form>
          <h1>{showRegView ? "Sign in" : "Register"}</h1>
          <span>or use your account</span>
          {showRegView && (
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
          )}
          <input
            style={{ color: "black" }}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            style={{ color: "black" }}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <button onClick={handleSubmit}>
            {showRegView ? "Register" : "Sign in"}
          </button>
          {message.text && (
            <Alert style={{ marginTop: "12px" }} severity={message.severity}>
              {message.text}
            </Alert>
          )}
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>
              {showRegView
                ? "Enter your personal details and start your journey with us"
                : "Login and continue your journey"}
            </p>
            <button className="ghost" id="signUp" onClick={toggleRightPanel}>
              {showRegView ? "Sign in" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
