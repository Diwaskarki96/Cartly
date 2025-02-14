import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
const SearchBar = () => {
  return (
    <div className="relative  ">
      <Input
        placeholder="What are you looking for?"
        className="pl-6 placeholder:text-sm dark:bg-muted  "
      />

      <>
        <CiSearch className="absolute top-[10px] left-1 " />
      </>
    </div>
  );
};
// left-[215px] md:left-[195px]
export default SearchBar;
