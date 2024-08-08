import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


// render the notifs outside of the body element
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Suits Finance | Sign Up',
  description: 'Create your Suits Finance account.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position={'top-left'} />
        {children}
      </body>
    </html>
  )
}