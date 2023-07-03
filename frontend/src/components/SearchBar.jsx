import { useState } from "react";

const SearchBar = ({ onSearch }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearch(searchQuery);
      }
    };

  return (

    <form className='relative w-full flex-center mt-10'>
        <input
            type='text'
            placeholder='Recherchez une épreuve...'
            required
            className='search_input peer'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
    </form>

  )
}

export default SearchBar