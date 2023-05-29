"use client";

import InputField from "./InputField";

import fakeData from "@/app/constants";
import ItemCard from "./ItemCard";

const Feed = () => {
    
  return (
    <>
    
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Recherchez une épreuve...'
          required
          className='search_input peer'
        />
      </form>
      
      <ItemCard item={fakeData}/>
    </>
  )
}

export default Feed