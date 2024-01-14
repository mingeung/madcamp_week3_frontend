import React, { useState } from "react";
import "./Page5resultComposition.css";
import { MutatingDots } from "react-loader-spinner";
import "./Page5resultComposition.css";

export default function Page5resultComposition() {
  const [loading, setLoading] = useState(true);
  const nickname = "민승"; //임시 닉네임
  return (
    <div className="ai-result-container">
      {loading ? (
        <div>
          <MutatingDots
            className="loader"
            height="90"
            width="80"
            radius="13"
            color="#7C93C3"
            ariaLabel="loading"
          />
          <p className="load-text">
            AI가 {nickname}님 취향의 곡을 작곡하는 중이에요
          </p>
        </div>
      ) : (
        <div>결과!</div>
      )}
    </div>
  );
}
