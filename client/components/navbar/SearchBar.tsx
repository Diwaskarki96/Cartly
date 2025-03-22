"use client";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  // Fetch search results only after Enter is pressed
  const { isLoading, data } = useQuery({
    queryKey: ["search-products", submittedText.trim()],
    queryFn: async () => {
      if (submittedText.trim()) {
        try {
          const response = await $axios.get("/product/allproducts/", {
            params: { search: submittedText.trim() }, // API search param
          });
          console.log("API Request Sent:", submittedText.trim());
          console.log("API Response:", response.data);
          return response.data;
        } catch (err) {
          console.error("API Error:", err.response?.data || err.message);
          throw new Error("Failed to fetch products");
        }
      }
      return [];
    },
    enabled: !!submittedText.trim(), // Only trigger API call if there is a search text
  });

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSubmittedText(searchText); // Trigger API call with the entered text
      router.push(`/product?search=${searchText.trim()}`);
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder="What are you looking for?"
        className="pl-6 placeholder:text-sm dark:bg-muted"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleKeyPress} // Trigger API on Enter
      />
      <CiSearch className="absolute top-[10px] left-1" />
    </div>
  );
};

export default SearchBar;
