"use client";
import { useState } from "react";
import Cart from "./Cart";
import { DarkMode } from "./DarkMode";
import Links from "./Links";
import SearchBar from "./SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import SideNavBar from "./SideNavBar";
import { Sheet, SheetTrigger } from "../ui/sheet";
const NavBar = () => {
  const [nav, setNav] = useState<boolean>(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="h-[100px] w-full flex justify-center items-center border-b-[1.5px] px-4 ">
      <div className="h-[38px] w-[1170px] flex justify-between items-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Cartly</h1>
        <Links />
        <div className="flex  ml-2 gap-3 items-center md:justify-between">
          <SearchBar />
          <DarkMode />
          <Cart />
          <Sheet>
            <SheetTrigger className="md:hidden" onClick={handleNav}>
              {nav ? <RxCross1 size={25} /> : <GiHamburgerMenu size={25} />}
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-opacity-30  backdrop-blur-sm ease-in-out duration-500  ${
          nav ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav && <SideNavBar setNav={setNav} />}
      </div>
    </div>
  );
};

export default NavBar;
