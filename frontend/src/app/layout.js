import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Miabu SUSU',
  description: 'A place to share notes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className='main'>
          {children}
        </main>
      </body>
    </html>
  )
}
