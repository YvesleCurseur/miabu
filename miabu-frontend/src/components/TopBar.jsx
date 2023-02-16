import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { BellIcon } from '@heroicons/react/24/outline'
// import { useOnClickOutside } from 'react-use';
import { Link } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  const menuRef = useRef(null);

  // Add a click event listener to the document to close the dropdown menu when clicked outside of it
  useEffect(() => {

    const handleClick = e => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };

  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the search here, using the searchQuery state variable
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="min-h-[4rem] sticky top-0 z-10 col-[1/-1] row-[1] flex justify-center items-center bg-indigo-600 text-white">
        Nav
      </nav>
    </>
  );
}

export default Header;
