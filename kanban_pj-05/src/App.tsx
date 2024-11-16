import React, { useState } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import AppFooter from './AppFooter';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AppMain/>
      <AppFooter/>
    </div>
  );
}

export default App;
