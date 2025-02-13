import Cart from "./Cart";
import { DarkMode } from "./DarkMode";
import Links from "./Links";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <div className="h-[100px] w-full flex justify-center items-center border-b-[1.5px]">
      <div className="h-[38px] w-[1170px] flex justify-between">
        <div className="text-2xl font-bold text-muted-foreground">Cartly</div>
        <Links />
        <div className="flex w-[347px] justify-between">
          <SearchBar />
          <DarkMode />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
