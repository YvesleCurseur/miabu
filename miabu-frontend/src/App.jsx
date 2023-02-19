import './index.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { TopBar, LeftBar, RightBar } from './components';
import { Discover, YourEvaluations, Signin, EvaluationDetails, Register } from './pages';


function App() {

  const location = useLocation();
  let AuthPage;

  if (location.pathname === "/register" | location.pathname === "/sign-in") {
    AuthPage =
    <>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  }else{
    AuthPage =
    <>
      <LeftBar />
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/your-evalutions" element={<YourEvaluations />} />
        <Route path="/evaluation/:id" element={<EvaluationDetails />} />
      </Routes>
      <RightBar />
    </>
  }

  return (
    <div>
        <TopBar />
        {AuthPage}
    </div>
  );
}

export default App;