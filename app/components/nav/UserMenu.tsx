'use client';

import { useCallback, useState, useEffect } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  

  // Close the menu if clicking outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.user-menu')) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCloseMenu]);

  return (
    <>
      <div className="relative z-30 user-menu">
        <div
          onClick={toggleOpen}
          className="
            p-2
            border
            border-gray-300
            flex
            items-center
            gap-2
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            text-gray-700
            bg-white
          "
        > 
          <Avatar src={currentUser?.image || '/defaultImage.png'} />
          <AiFillCaretDown className="text-gray-500" />
        </div>

        {isOpen && (
          <div
            className="
              absolute
              rounded-lg 
              shadow-lg
              w-[200px]
              bg-white
              overflow-hidden
              right-0
              top-14
              text-sm
              flex
              flex-col
              cursor-pointer
              animate-fadeIn
            "
          >
            {currentUser ? (
              <>
                <Link href="/orders">
                  <MenuItem onClick={handleCloseMenu}>Vos commandes</MenuItem>
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="/admin">
                    <MenuItem onClick={handleCloseMenu}>Admin Dashboard</MenuItem>
                  </Link>
                )}
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    signOut();
                  }}
                >
                  Se déconnecter
                </MenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <MenuItem onClick={handleCloseMenu}>Se connecter</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={handleCloseMenu}>S'inscrire</MenuItem>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={handleCloseMenu} />}
    </>
  );
};

export default UserMenu;
