import './App.css'
import NavBar from './Navbar/navbar'
import LandingPage from './LandingPage/LandingPage'
import { Route, Routes } from "react-router-dom";
import Registration from './Registration/registration';
import Journal from './Journals/journals';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </div>
  )
}

export default App
