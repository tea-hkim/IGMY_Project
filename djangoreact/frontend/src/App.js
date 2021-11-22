import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <h1>App</h1>
      <ul>
        <li>
          <Link to="/">메인 페이지</Link>
        </li>
        <li>
          <Link to="/login">로그인 페이지</Link>
        </li>
        <li>
          <Link to="/register">회원가입 페이지</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
