import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
function Header() {
  //검색 기능
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results`, { state: { query: searchQuery } });
  };

  return (
    <div>
      <div className="navbar">
        <Link className="navbarMenu" to={"/Home"}>
          <GoHomeFill />
        </Link>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <FaSearch onClick={handleSearch} className="search-button" />
        </div>
      </div>
    </div>
  );
}

export default Header;
