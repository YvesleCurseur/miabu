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

        <nav className="fixed top-0 left-0 right-0 w-full z-10 bg-white text-black p-4 flex justify-between items-center sm:space-x-5">
          {/* Title */}
          <Link to="/">
            <div className='flex'>
              <div>
                <img src="./logo.png" alt="Miabu Susu" className='block pr-2 h-8 w-auto sm:pr-0 sm:h-0 sm:block' />
              </div>
              <div>
                <h1 className="text-lg flex sm:text-sm">Miabu<p className='font-bold text-lg sm:text-sm'>Susu</p></h1>
              </div>
            </div>
          </Link>
          {/* Search Bar */}
          <div className='flex space-x-5'>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='absolute pt-2.5 pl-2'>
                  <CiSearch className='h-5 w-5 text-gray-400'/>
                </div>
                <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                className="block w-80 bg-white border border-gray-300 py-[9px] pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm sm:w-14"
                placeholder="Recherchez des épreuves"
                />
              </form>
            </div>

            <div>
              <button type="submit" className='text-sm w-full px-4 py-2 text-white bg-rose-600 hover:bg-rose-700'>
                <Link to="/create">
                  Postez
                </Link>
              </button> 
            </div>  
          </div> 
        

            {/* Buttons For Connexion */}
            {/* <div className='flex space-x-5'>
              <div>
                <button type="submit" className='text-sm w-full px-4 py-2 text-white bg-rose-600 hover:bg-rose-700'>
                  <Link to="/register">
                    Inscription
                  </Link>
                </button>                                                      
              </div>

              <div>
                <button type="submit" className='text-sm w-full px-4 py-2 text-blue-500 bg-gray-200 hover:bg-gray-300'>
                  <Link to="/sign-in">
                    Connexion
                  </Link>
                </button>    
              </div>
            </div> */}

            {/* Connexion button */}
            <div className="flex space-x-5">
              <div>
                <img className="ml-4 h-10 w-10 rounded-full" src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dpr=2&auto=format&fit=crop&w=27&h=27&q=60&crop=faces&bg=fff" alt="user" />
              </div>
              <div className="relative">
                <button ref={menuRef} className="inline-block text-gray-500" onClick={() => setIsOpen(!isOpen)}>
                  v
                </button>
                <div className={`absolute right-0 mt-2 bg-white ${isOpen ? '' : 'hidden'}`}>
                  <ul className="list-none">
                    {items.map(item => (
                      <li key={item.id} className="p-2">{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        <hr className="border-t-1 border-gray-300" />
    </>
  );
}

export default Header;
