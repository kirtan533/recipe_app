"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SeachBar({ initialSearch = "", onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push(`/recipes`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-red-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 transition cursor-pointer"
      >
        <span className="flex items-center">
          <IoIosSearch className="mr-2" /> Search
        </span>
      </button>
    </form>
  );
}
