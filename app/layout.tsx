import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next"


const poppins = Poppins({ subsets: ['latin'], weight:['400','700'] })

export const metadata: Metadata = {
  title: 'Owen-Market - Votre Marketplace de Confiance pour Achats Sécurisés en Ligne',
  description: 'Découvrez Owen-Market, la plateforme e-commerce de référence pour des transactions sécurisées, une large gamme de produits et un service client fiable. Achetez en toute confiance et une livraison rapide en Afrique de l\'Ouest.',
}

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700 `}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color:'#fff'
          }
        }}/>
      <CartProvider>
      <div className='flex flex-col min-h-screen'>
        <NavBar/>
        <main className='flex-grow'>{children}</main>
        <Footer/>
        </div>
      </CartProvider>
      <SpeedInsights />
        </body>
    </html>
  )
}
