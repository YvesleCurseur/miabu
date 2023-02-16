import './index.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Header, SideBar, RightBar } from './components';
import { Discover, YourEvaluations, Signin, EvaluationDetails, Register } from './pages';


function App() {

  const location = useLocation();

  let Page;

  if (location.pathname === "/register" | location.pathname === "/sign-in") {
    Page = 
    <div>

      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  } else {
    Page = 
    <div>
        <div className="">
          <SideBar />
            <div className="">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/your-evalutions" element={<YourEvaluations />} />
                <Route path="/evaluation/:id" element={<EvaluationDetails />} />
              </Routes>
            </div>
          <RightBar />
        </div>
    </div>

  }

  return (
    <div>
      <div className="fixed top-0 left-0 h-full w-1/2" aria-hidden="true"></div>
      <div className="fixed top-0 right-0 h-full w-1/2" aria-hidden="true"></div>
      <div className="relative grid grid-cols-[2rem_1fr_2rem] xl:grid-cols-[minmax(2rem,1fr)_16rem_minmax(200px,calc(80rem-32rem))_16rem_minmax(2rem,1fr)] lg:grid-cols-[2rem_minmax(200px,calc(100%-16rem))_16rem_2rem] min-h-screen">

      <Header />
      {Page}
      
      </div>
    </div>
  );
}

export default App;