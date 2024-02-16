import React, { useState } from "react";
import "./registration.css"; // Import the CSS file

const Registration = () => {
  const [showRegView, setShowRegView] = useState(false);

  const toggleRightPanel = () => {
    setShowRegView((prev) => !prev);
  };

  return (
      <div className="reg-container" id="reg-container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>{showRegView ? 'Sign in' : 'Register'}</h1>
            <span>or use your account</span>
            {
                showRegView && (
                    <input type="text" placeholder="Username" />
                )
            }
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={toggleRightPanel}>{showRegView ? 'Register': 'Sign in'}</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>{showRegView ? 'Enter your personal details and start journey with us' : 'Login and continue your journey'}</p>
              <button
                className="ghost"
                id="signUp"
                onClick={toggleRightPanel}
              >
                {showRegView ? 'Sign in' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Registration;
