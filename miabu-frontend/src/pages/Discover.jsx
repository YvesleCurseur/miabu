import React from 'react'
import { ItemCard } from '../components'
import { itemsCard } from '../utils/constant'

const Discover = () => {

  return (
    <main className="bg-white col-[2] row[3] xl:col-[3] xl:row-[2] min-h-[150vh]">
      <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
        {/* <!-- Start main area--> */}
        <div className="relative h-full" style={{minHeight: '36rem'}}>
          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200 flex justify-center items-center">
            Main
          </div>
        </div>
        {/* <!-- End main area --> */}
      </div>
    </main>
  )
}

export default Discover