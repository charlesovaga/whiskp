import { Header } from '../shared/widgets';
import './global.css';
import { Poppins, Roboto } from 'next/font/google'
import Providers from "./providers"

export const metadata = {
  title: 'B2bAgroAfrica',
  description: "Delicious food delivered fast to your doorstep. Explore a wide variety of cuisines from local restaurants with our reliable and affordable food delivery service.",
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", '300', '400', '500', '600', '700' , '800', '900'],
  variable: '--font-poppins',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "200", '300', '400', '500',  '700', '900'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <Providers>
        <Header/>
        {children}
        </Providers>
        </body>
    </html>
  )
}
