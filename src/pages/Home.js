//Home.js
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  //검색 기능
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onClickGoRock = () => {
    navigate("/chat-rock");
  };
  //분석 페이지로 이동
  const onClickGoAnalysis = () => {
    navigate("/analysis");
  };
  //통계 페이지로 이동
  const onClickGoStats = () => {
    navigate("/statistics");
  };
  //작곡 페이지로 이동
  const onCliGoComposition = () => {
    navigate("/composition");
  };

  const handleSearch = () => {
    navigate(`/search-results`, { state: { query: searchQuery } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <FaSearch onClick={handleSearch} className="search-button" />
      </div>
      <div className="main-box">
        <p className="main-title">같은 노래 취향을 가진 사람과 대화하기</p>
        <div className="main-chat-rooms">
          <div className="chat-box-rock" onClick={onClickGoRock}>
            {" "}
            <p className="chat-name">Rock</p>
          </div>

          <div className="chat-box-kpop">
            {" "}
            <p className="chat-name">K-pop</p>
          </div>

          <div className="chat-box-ballade">
            {" "}
            <p className="chat-name">Ballade</p>
          </div>

          <div className="chat-box-dance">
            {" "}
            <p className="chat-name">Dance</p>
          </div>

          <div className="chat-box-jpop">
            {" "}
            <p className="chat-name">J-pop</p>
          </div>
        </div>

        <div className="ai-room-box">
          <p className="main-title">나는 어떤 노래를 좋아할까?</p>
          <div className="flex-row">
            <div className="myTasteByAi" onClick={onClickGoAnalysis}>
              <p className="ai-mini-title">AI로</p>
              <p className="ai-title">내 노래취향 분석하기</p>
            </div>
            <div className="myStaticAi" onClick={onClickGoStats}>
              <p className="ai-mini-title">내가 이번주에 많이 들은 노래는?</p>
              <p className="ai-title">나의 노래 통계 보기</p>
            </div>
          </div>
        </div>
        <div style={{ marginRight: "30px" }}>
          <div className="songwrite-room">
            <p className="make-my-song">AI로 나만의 노래 만들기</p>
            <p className="make-myself">
              이제 내가 들을 노래는 내가 만들어 들어요
            </p>
            <button className="btn-start" onClick={onCliGoComposition}>
              바로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
