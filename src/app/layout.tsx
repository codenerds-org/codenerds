import Footer from './components/Footer'
import './globals.css'
import { Raleway } from 'next/font/google'

export const metadata = {
  title: 'Codenerds',
  description: 'We make your dream projects reality',
}

const raleway = Raleway({
  display: 'swap',
  subsets: ['latin-ext'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {children}
        <Footer />
      </body>

    </html>
  )
}
