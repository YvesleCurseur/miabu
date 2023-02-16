import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'

const LeftBar = () => {
  return (
    <aside className="max-h-screen xl:sticky lg:static top-12 col-[2] row-[2] border-b border-gray-200 bg-white xl:border-b-0 xl:border-r xl:border-gray-200">
      <div className="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
        {/* <!-- Start left column area --> */}
        <div className="relative h-full" style={{minHeight: '12rem'}}>
          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200 flex justify-center items-center">
            Aside
          </div>
        </div>
        {/* <!-- End left column area --> */}
      </div>
    </aside>
  )
}

export default LeftBar