import Container from "@/app/components/Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdWhatsapp } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200 text-sm mt-16 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <FooterList>
            <h3 className="text-lg font-semibold mb-3">Nos Catégories</h3>
            <Link href='#' className="hover:text-yellow-500 transition">Habits</Link>
            <Link href='#' className="hover:text-yellow-500 transition">Chaussures</Link>
            <Link href='#' className="hover:text-yellow-500 transition">Montres</Link>
            <Link href='#' className="hover:text-yellow-500 transition">Pantalons</Link>
            <Link href='#' className="hover:text-yellow-500 transition">Autres</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-lg font-semibold mb-3">Service Client</h3>
            <Link href='https://wa.me/message/ITS5XNP45JZQD1' className="hover:text-yellow-500 transition">Nous contacter</Link>
            <Link href='#' className="hover:text-yellow-500 transition">Retour et remboursement</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-3">À propos de nous</h3>
            <p className="mb-3 leading-relaxed">
              Owen-Market est une boutique de vente en ligne présente depuis 2021.
              Avec Owen-Market, c&apos;est la qualité à bas prix. <br />
              Toujours bien fait.
            </p>
          </div>

          <FooterList>
            <h3 className="text-lg font-semibold mb-3">Nous suivre</h3>
            <div className="flex gap-4">
              <Link href="https://wa.me/message/ITS5XNP45JZQD1" className="hover:text-yellow-500 transition">
                <MdWhatsapp size={30} />
              </Link>
              <Link href="https://www.instagram.com/market_owen_225?igsh=MXJxcXl5YzU2NW43dg==" className="hover:text-yellow-500 transition">
                <AiFillInstagram size={30} />
              </Link>
            </div>
          </FooterList>
        </div>

        <div className="border-t border-slate-600 mt-8 pt-4 text-center flex items-center justify-center">
          <p className="flex-col md:flex">
          <p className="mx-2">&copy;{new Date().getFullYear()} Owen-Market. Tous droits réservés.</p>   ||

            Realisé par {' '}
            <Link href="https://wa.me/2250102528848?text=Je%20suis%20interessé%20par%20vos%20services" target="_blank" className="text-yellow-400 mx-2 hover:text-yellow-500 transition" >
              Young_Geek
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
