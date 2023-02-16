import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'

const SideBar = () => {
  return (
    // divide-y divide-gray-300
    <aside className="max-h-screen xl:sticky lg:static top-12 col-[2] row-[2] border-b border-gray-200 bg-white xl:border-b-0 xl:border-r xl:border-gray-200">
        <div className="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">

          {/* Start left column */}
          <div className="relative h-full" style={{minHeight: '12rem'}}>
            <div className='absolute inset-0 rounded-lg border-2 border-dashed border-gray-200 flex justify-center items-center'>
                
                Hello
                
                {/* <div className=''>
                  Menu
                </div>

                <div className=''>
                  <Link 
                    to="/questions"
                    className="px-10 py-3 flex hover:bg-rose-100"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                    Découverte
                  </Link>
                </div>

                <div className=''>
                  <Link 
                    to="/evaluations" 
                    className="px-10 py-3 flex hover:bg-rose-100"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                    Evaluations
                  </Link>
                </div>

                <div className=''>
                  Navigation Personnelle
                </div>

                <div className='text-center'>
                  <Link 
                    to="/your-questions" 
                    className="flex hover:bg-rose-100"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                    Vos questions
                  </Link>
                </div>

                <div className='text-center'>
                  <Link 
                    to="/your-evaluations" 
                    className="px-10 py-3 flex hover:bg-rose-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Vos votes
                  </Link>
                </div>

              </div>

              <div className=''>
                <Footer />
              </div> */}
            </div>
          </div>

          </div>
          
          

    </aside>
  )
}

export default SideBar