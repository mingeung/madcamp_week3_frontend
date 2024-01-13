//Home.js
import React from "react";
import { useState } from "react";

const Page5composigion = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div style={{ marginLeft: "500px" }}>
      <h1>작곡하기</h1>
      <h3>이제 내가 좋아하는 노래를 직접 만들어 들어요</h3>
      <p>작곡하고 싶은 장르를 선택해주세요</p>
      <button>클래식</button>
      <button>재즈</button>
      <button>팝</button>
      <button>발라드</button>
      <button>힙합</button>
    </div>
  );
};

export default Page5composigion;
