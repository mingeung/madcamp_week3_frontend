import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { CiSearch } from "react-icons/ci";
function Header() {
  //검색 기능
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results`, { state: { query: searchQuery } });
  };

  return (
    <div>
      <div class="ml-0 w-[100%] h-[80px] mt-10 ">
        <div class="flex flex-row justify-between items-center w-[250px] h-[50px] pr-3 rounded-[10px] bg-dark-gray">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            class=" pl-[15px] rounded-16 placeholder-white/70 text-[14px] text-white focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <CiSearch onClick={handleSearch} class=" text-white text-[30px]" />
        </div>
      </div>
    </div>
  );
}

export default Header;
