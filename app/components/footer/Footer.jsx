import Container from "@/app/components/Container"
import FooterList from "./FooterList"
import Link from "next/link"
import { MdWhatsapp} from 'react-icons/md'
import {AiFillInstagram} from 'react-icons/ai'

const Footer = () => {
  return (
   <footer className="bg-slate-700
   text-slate-200 text-sm mt-16 
   ">
    <Container>
        <div className="flex
        flex-col md:flex-row
        justify-between pt-16 pb-8">
            <FooterList>
                <h3 className="text-base font-bold mb-2">Nos Categories</h3>
                <Link href='#'>Habits</Link>
                <Link href='#'>Chaussures</Link>
                <Link href='#'>Montres</Link>
                <Link href='#'>Pantalons</Link>
                <Link href='#'>Autres</Link>
            </FooterList>
            <FooterList>
                <h3 className="text-base font-bold mb-2">Service Client</h3>
                <Link href='https://wa.me/message/ITS5XNP45JZQD1'>Nous contacter</Link>
                <Link href='#'>Retour et remboursement</Link>
            </FooterList>
            <div className="w-full md:w-1/3 mb-6 mb:mb-0">
                <h3 className="text-base font-bold">A propos de nous</h3>
                <p className="mb-2">
                    Owen-Market est une boutique de vente en ligne présent depuis 2021.
                    Avec Owen-Market c&apos;est la qualité à bas prix . <br /> Toujours bien fait
                </p>
                <p>&copy;{new Date().getFullYear()} Owen-Market. Tous droits reservés </p>
            </div>
            <FooterList>
                <h3 className="text-base font-bold mb-2">Nous suivre</h3>
                <div className="flex gap-2">
                    <Link href="https://wa.me/message/ITS5XNP45JZQD1">
                        <MdWhatsapp size={24}/>
                    </Link>
                    <Link href="https://www.instagram.com/market_owen_225?igsh=MXJxcXl5YzU2NW43dg==">
                        <AiFillInstagram size={24}/>
                    </Link>
                </div>
            </FooterList>

            <p>Fait par <Link href="https://wa.me/2250102528848?text=Je%20suis%20interessé%20par%20vos%20services" target="_blank">Young_Geek</Link></p>
        </div>
    </Container>

   </footer>
  )
}

export default Footer
