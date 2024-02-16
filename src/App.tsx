import React, { useState, useEffect } from "react";
import './App.css'
import NavBar from './Navbar/navbar'
import LandingPage from './LandingPage/LandingPage'
import { Route, Routes } from "react-router-dom";
import Registration from './Registration/registration';
import Journal from './Journals/journals';
import { useNavigate } from "react-router-dom";

function App() {

  const [authUser, setAuthUser] = useState<{token:string, userId?: number}>({token: '', userId: undefined})
  const navigate = useNavigate()
  useEffect(() => {
    // Function to get the token from the cookie
    const getTokenFromCookie = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
          return cookie.substring(6); // Extract token value
        }
      }
      return '';
    };

    const storedToken = getTokenFromCookie();
    if (storedToken) {
      setAuthUser({
        token: storedToken,
      })
      
    } else {
      navigate("/");   
    }

  }, []);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/journal" element={<Journal authUser={authUser} setAuthUser={setAuthUser} />} />
      </Routes>
    </div>
  )
}

export default App
