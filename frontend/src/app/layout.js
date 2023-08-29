"use client";

import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import ProviderSession from '@/components/ProviderSession'

import { Provider } from 'react-redux'
import store from './store'

import MetaTags from '@/components/MetaTags';

const Rootlayout = ({ children }) => {
  return (
      <Provider store={store}>
        <html lang="en">
          <MetaTags title="MiabuSUSU" description="Un endroit ou on partage ses anciens sujets d'examens nationaux" />
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