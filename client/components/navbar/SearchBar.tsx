"use client";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    router.push(`/products?search=${searchText}`);
  }, [searchText, router]);
  return (
    <div className="relative  ">
      <Input
        placeholder="What are you looking for?"
        className="pl-6 placeholder:text-sm dark:bg-muted  "
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      <>
        <CiSearch className="absolute top-[10px] left-1 " />
      </>
    </div>
  );
};
export default SearchBar;
