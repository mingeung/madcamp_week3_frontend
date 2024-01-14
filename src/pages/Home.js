//Home.js
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  //검색 기능
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results`, { state: { query: searchQuery } });
  };
  return (
    <div className="container">
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
      <div className="box">
        <h1>메인 페이지 입니다.</h1>
      </div>
    </div>
  );
};

export default Home;
