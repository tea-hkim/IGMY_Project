import React from 'react';
import TestRedux from './components/TestRedux';
import './App.css';
import Auth from './auth/Auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Auth />
        </p>
      </header>
    </div>
  );
}

export default App;
