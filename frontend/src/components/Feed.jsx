"use client";
import { useEffect, useState } from 'react'

const Feed = () => {

    useEffect(() => {
        const handleScroll = () => {
          const title = document.getElementById('title');
          const searchBar = document.querySelector('.rounded-lg');
    
          const scrollPosition = window.scrollY;
          title.style.opacity = 1 - scrollPosition / 400;
          searchBar.classList.toggle('sticky', scrollPosition >= 400);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl mb-10 transition-opacity duration-500" id="title">
        Welcome to My Page
      </h1>
      <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-100">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    
    </>
  )
}

export default Feed