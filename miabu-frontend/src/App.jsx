import './index.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { TopBar, LeftBar, RightBar } from './components';
import { Discover, YourEvaluations, Signin, EvaluationDetails, Register, CreateItem} from './pages';


function App() {

  const location = useLocation();
  let AuthPage;

  /* Authentification */
  if (location.pathname === "/register" | location.pathname === "/sign-in") {
    AuthPage =
    <>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>

  /* Utilisateur Poste */
  }else if(location.pathname === "/create"){
    AuthPage =
    <>
      <Routes>
        <Route path="/create" element={<CreateItem />} />
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
        <Route path="/create" element={<CreateItem />} />
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