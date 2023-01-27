import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import SideBar from './components/SideBar';
import { Discover, YourEvaluations, Signin, Login, EvaluationDetails, Register } from './pages';


function App() {

  const location = useLocation();
  let Page;

  if (location.pathname === "/register" | location.pathname === "/signin") {
    Page = 
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  } else {
    Page = 
    <div className="flex">
      <SideBar />
        <div className="px-6 flex xl:flex-row ">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/your-evalutions" element={<YourEvaluations />} />
              <Route path="/evaluation/:id" element={<EvaluationDetails />} />
            </Routes>
        </div>
    </div>
  }

  return (
    <div className='App'>
      <div className="">
        <Header />
        {Page}
      </div>
    </div>
  );
}

export default App;