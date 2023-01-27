import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'

const SideBar = () => {
  return (
    <div className="h-screen bg-white">

        <div className="flex flex-col justify-start items-center my-8">
          <div>
            Menu
          </div>

          <Link to="/questions" className="text-black">Questions</Link>
          <Link to="/evaluations" className="text-black ">Evaluations</Link>

          <div>
            Navigation Personnelle
          </div>

          <Link to="/your-questions" className="text-black">Vos questions</Link>
          <Link to="/your-evaluations" className="text-black ">Vos évaluations</Link>
        </div>

        <div>
          <Footer />
        </div>

    </div>
  )
}

export default SideBar