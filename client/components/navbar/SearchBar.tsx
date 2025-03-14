"use client";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  // Debounced function to handle the search query
  const delayedUpdateSearchText = debounce((text) => {
    setSearchText(text);
    router.push(`/product?search=${text}`);
  }, 1000);

  // Trigger the query only when searchText changes
  const { isPending, data } = useQuery({
    queryKey: ["all-products", searchText], // Query depends on searchText
    queryFn: async () => {
      if (searchText) {
        const response = await $axios.get("/product/allproducts/", {
          params: {
            searchText: searchText || null,
          },
        });
        return response.data;
      }
    },
    enabled: !!searchText, // Only run query if searchText is not empty
  });

  useEffect(() => {
    // Manually trigger search after debounced delay
    if (searchText) {
      router.push(`/product?search=${searchText}`);
    }
  }, [searchText, router]);

  return (
    <div className="relative">
      <Input
        placeholder="What are you looking for?"
        className="pl-6 placeholder:text-sm dark:bg-muted"
        value={searchText} // Use value for controlled input
        onChange={(event) => {
          delayedUpdateSearchText(event.target.value);
        }}
      />
      <CiSearch className="absolute top-[10px] left-1" />
    </div>
  );
};

export default SearchBar;
 