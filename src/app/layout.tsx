import Footer from './components/Footer'
import './globals.css'
import { Raleway } from 'next/font/google'

export const metadata = {
  title: 'Codenerds - Development and Design Agency',
  description: 'Codenerds is a leading development and design agency. We specialize in creating innovative and custom solutions to turn your dream projects into reality.',
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
