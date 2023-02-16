import React from 'react'

const RightBar = () => {
  return (
    <aside className="max-h-screen sticky top-12 col-[2] row-[4] xl:col-[4] xl:row-[2] lg:col-[3] lg:row-[2/2_span] bg-gray-50 pr-4 sm:pr-6 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
        <div className="h-full py-6 pl-6">
        {/* <!-- Start right column area --> */}
        <div className="relative h-full" style={{minHeight: '16rem'}}>
            <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200 flex justify-center items-center">
            Aside
            </div>
        </div>
        {/* <!-- End right column area --> */}    
        </div>
    </aside>
  )
}

export default RightBar