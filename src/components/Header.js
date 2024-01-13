import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  //검색 기능
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // 검색 버튼 클릭 시 처리할 로직을 여기에 추가
    // 예: 검색 결과 페이지로 이동
    // navigate(`/search-results?query=${searchQuery}`);
    navigate(`/search-results`, { state: { query: searchQuery } });
  };

  return (
    <div>
      <div className="navbar">
        <Link className="navbarMenu" to={"/Home"}>
          Home
        </Link>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
