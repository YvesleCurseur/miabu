"use client";

import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import ProviderSession from '@/components/ProviderSession'

import { Provider } from 'react-redux'
import store from './store'

export const metadata = {
  title: 'Miabu SUSU',
  description: 'A place to share notes',
}

const Rootlayout = ({ children }) => {
  return (
      <Provider store={store}>
        <html lang="en">
          <body>    
            <ProviderSession>
              <main className='app'>
                <Navbar />
              </main>
              
              <main className='app'>
                {children}
              </main>
            </ProviderSession>
          </body>
        </html>
      </Provider>
  )
}

export default Rootlayout;