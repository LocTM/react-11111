
import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Study React',
  description: 'Test desc',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='border rounded-sm p-2'>
          <Link className="mr-2" href="/">
            Home
          </Link>
          <span className="mr-2">|</span>
          <Link href="/students">Students</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
 