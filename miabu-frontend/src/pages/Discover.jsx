import React from 'react'
import { ItemCard } from '../components'
import { itemsCard } from '../utils/constant'

const Discover = () => {

  return (

    <main className="mt-24 ml-[16.5rem] mr-80 ">
      {itemsCard.map((item) => (
        <ItemCard 
          key={item.id}
          item={item}
        />
      ))}
    </main>

  )
}

export default Discover