"use client";

import { useTheme } from "next-themes";
import { deleteCookie } from "cookies-next/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidenavSheet from "./SidenavSheet";
import { User } from "lucide-react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cart from "./Cart";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header className={isSticky ? "sticky" : ""}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <SidenavSheet />
          <div className="flex-grow text-center">
            <Link
              href="/"
              className="text-[#F5A09B] text-2xl font-great-vibes font-bold tracking-wide"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Micael e Agata
            </Link>
          </div>

          <div className="flex items-center lg:order-2 space-x-2">
            <Cart />
            {currentUser ? (
              <div
                onClick={() => {
                  deleteCookie("token");
                  window.location.reload();
                }}
                className="p-1 bg-gray-300 shadow rounded-full cursor-pointer"
              >
                <User className="text-gray-500" />
              </div>
            ) : (
              <Link href="/sign-in">
                {/* <Button className="ml-2 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white hidden lg:block">
                  Entrar
                </Button> */}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            {currentUser?.isAdmin && (
              <>
                <li>
                  <Link href="/auth/admin/create-product" className="navbar-link">
                    Listar Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/auth/admin" className="navbar-link">
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="block lg:hidden mt-2">
          <ul className="flex flex-col space-y-2">
            {currentUser?.isAdmin && (
              <>
                <li>
                  <Link href="/auth/admin/create-product" className="navbar-link">
                    Listar Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/auth/admin" className="navbar-link">
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;