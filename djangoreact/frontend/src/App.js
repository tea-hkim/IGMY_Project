import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { login } from './redux/authSlice';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CameraPage from './pages/CameraPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScanSuccessPage from './pages/ScanSuccessPage';
import ScanFailPage from './pages/ScanFailPage';
import PillBoxPage from './pages/PillBoxPage';
import DirectSearchPage from './pages/DirectSearchPage';
import AboutUsPage from './pages/about-us-page';
import AboutServicePage from './pages/about-service-page';
import PillDetailPage from './pages/PillDetailPage';
import ResetPasswordConfimPage from './pages/ResetPasswordConfimPage';
import Social from './auth/Social';
import { REACT_APP_HOST_IP_ADDRESS } from './env';

function App() {
  const dispatch = useDispatch();

  const initializeUser = async () => {
    const REFRESH_URL = `${REACT_APP_HOST_IP_ADDRESS}api/token/refresh/`;
    const formData = new FormData();
    const localRefreshToken = localStorage.getItem('refresh');
    const sessionRefreshToken = sessionStorage.getItem('refresh');

    if (!localRefreshToken && !sessionRefreshToken) return;

    if (localRefreshToken) {
      formData.append('refresh', localRefreshToken);
    } else formData.append('refresh', sessionRefreshToken);

    try {
      const { data } = await axios.post(REFRESH_URL, formData);
      const { access, username } = data;
      if (access) {
        axios.defaults.headers.common.Authorization = `Bearer ${access}`;
        dispatch(login({ username, access }));
      }
    } catch (error) {
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('refresh');
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfimPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/scansuccess" element={<ScanSuccessPage />} />
        <Route path="/scanfail" element={<ScanFailPage />} />
        <Route path="/pillbox" element={<PillBoxPage />} />
        <Route path="/direct" element={<DirectSearchPage />} />
        <Route path="/pilldetail" element={<PillDetailPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/about-service" element={<AboutServicePage />} />
        <Route path="/oauth/callback/kakao" element={<Social />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
