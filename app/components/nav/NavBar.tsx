// @ts-nocheck

import Container from "@/app/components/Container";
import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { Redressed } from "next/font/google";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 w-full bg-white z-30">
      <div className="py-4 border-b border-gray-200">
        <Container>
          <div className="flex items-center justify-between gap-4 md:gap-0">
            {/* Logo and Home link */}
            <Link href="/" className="flex items-center">
              <Image
                src="/owen.png"
                alt="Owen Market"
                height={50}
                width={50}
                className="mr-2"
              />
              <span className={`${redressed.className} font-bold text-3xl text-gray-800`}>
                Owen Market
              </span>
            </Link>

            {/* Search bar on larger screens */}
            <div className="hidden md:flex flex-1 justify-center">
              <SearchBar />
            </div>

            {/* Cart and User Menu */}
            <div className="flex items-center gap-6 md:gap-10">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 shadow-inner py-2">
        <Container>
          <Categories />
        </Container>
      </div>
    </header>
  );
};

export default NavBar;
