import React from 'react';
import logo from './logo.svg';
import Counter from '../redux/Counter';

const TestRedux = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
};

export default TestRedux;
