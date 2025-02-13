import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
const SearchBar = () => {
  return (
    <div className="relative ">
      <Input
        placeholder="What are you looking for?"
        className="pr-6"
        width="230px"
      />

      <>
        <CiSearch
          className="absolute top-[10px] left-[195px] font-extrabold"
          fontWeight="bold"
        />
      </>
    </div>
  );
};

export default SearchBar;
