import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { login } from './redux/authSlice';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CameraPage from './pages/CameraPage';
import FindPwPage from './pages/FindPwPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScanSuccessPage from './pages/ScanSuccessPage';
import ScanFailPage from './pages/ScanFailPage';
import PillBoxPage from './pages/PillBoxPage';
import DirectSearchPage from './pages/DirectSearchPage';

function App() {
  const dispatch = useDispatch();

  const initializeUser = async () => {
    const REFRESH_URL = 'http://localhost:8000/api/token/refresh/';
    const formData = new FormData();
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken) return;

    formData.append('refresh', refreshToken);

    try {
      const { data } = await axios.post(REFRESH_URL, formData);
      const { access, username } = data;
      dispatch(login({ username, access }));
    } catch (error) {
      localStorage.removeItem('refresh');
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/scan-success" element={<ScanSuccessPage />} />
        <Route path="/scan-sail" element={<ScanFailPage />} />
        <Route path="/pillbox" element={<PillBoxPage />} />
        <Route path="/direct" element={<DirectSearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
