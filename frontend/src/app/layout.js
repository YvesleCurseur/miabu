import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Miabu SUSU',
  description: 'A place to share notes',
}

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className='app'>
            <Navbar />
          </main>
          
          <main className='main'>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default Rootlayout;