import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'

const SideBar = () => {
  return (
    <div className="h-screen bg-white">

        <div className="flex flex-col justify-start items-center my-8">
          <Link to="/" className="text-black">Questions</Link>
          <Link to="/about" className="text-black ">Evaluations</Link>
        </div>

        <div>
          <Footer />
        </div>

    </div>
  )
}

export default SideBar