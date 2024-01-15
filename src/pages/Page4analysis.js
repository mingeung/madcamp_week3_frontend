//Home.js
import React, { useState } from "react";
import "./Page4analysis.css";

const Page4analysis = () => {
  // const [nickname, setNickname] = useState("");
  const nickname = "민승";

  return (
    <div className="container">
      <div className="analysis-banner">
        <p className="analysis-title">노래 취향 분석</p>
        <p className="analysis-intro">AI가 분석해주는 나의 노래 취향</p>
      </div>
      <div className="analysis-main">
        <p className="analysis-compelete">
          AI가 {nickname}님의 노래 취향을 분석했어요!
        </p>
        <div className="analysis-result-box">
          <div className="analysis-box">해시태그</div>
          <div className="analysis-text">여러 해시태그들이 올 예정...</div>
          <div className="analysis-box">비슷한 느낌의 노래 추천</div>
          <div className="analysis-text">여러 노래가 올 예정...</div>
        </div>
      </div>
    </div>
  );
};

export default Page4analysis;
