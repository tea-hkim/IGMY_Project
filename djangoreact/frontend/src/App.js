import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Auth from './auth/Auth';
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
      </ul>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
