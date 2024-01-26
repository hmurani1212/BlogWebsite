import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Sign from './Components/Sign';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="Sign" element={<Sign />} />
            <Route path="Login" element={<Login />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
