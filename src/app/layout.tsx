import { Metadata } from 'next'
import Footer from './components/Footer'
import './globals.css'
import { Raleway } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Codenerds - Development and Design Agency',
  description: 'Codenerds is a leading development and design agency. We specialize in creating innovative and custom solutions to turn your dream projects into reality.',
  alternates: {
    canonical: 'https://codenerds.tech/',
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "favicon",
      url: "/favicon.png"
    }
  },
  appleWebApp: {
    statusBarStyle: "black-translucent"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  openGraph: {
    url: "https://codenerds.tech/",
    title: "Codenerds - Development and Design Agency",
    description: "Codenerds is a leading development and design agency. We specialize in creating innovative and custom solutions to turn your dream projects into reality.",
    images: [
      {
        url: "/og.png",
        width: 1360,
        height: 1000,
        alt: "Codenerds - Development and Design Agency"
      }
    ],
  },
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
