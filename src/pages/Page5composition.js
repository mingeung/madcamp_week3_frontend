//Home.js
import React, { useState } from "react";
import "./Page5composition.css";
import { useNavigate } from "react-router-dom";

const Page5composition = () => {
  const [buttonStates, setButtonStates] = useState({
    classic: false,
    jazz: false,
    pop: false,
    ballad: false,
    hipHop: false,
  });
  const navigate = useNavigate();
  const [inputSinger, setInputSinger] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [genreError, setGenreError] = useState(false);
  const [inputErrror, setInputError] = useState(false);
  // const [nickname, setNickname] = useState("");
  const nickname = "민승";

  const handleInputSigner = (e) => {
    setInputSinger(e.target.value);
  };
  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const handleButtonClick = (genre) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [genre]: !prevStates[genre],
    }));
    setGenreError(false);
  };

  const handleCompositionStart = () => {
    //장르 선택 여부 체크
    const isGenreSelected = Object.values(buttonStates).some(
      (isSelected) => isSelected
    );
    setGenreError(!isGenreSelected);
    //가수와 노래 제목 입력 여부 체크
    setInputError(!inputTitle || !inputSinger);

    if (isGenreSelected && inputTitle && inputSinger) {
      //작곡 페이지로 넘어가기
      onClickResultPage();
    }
  };

  //작곡 결과 페이지로 이동
  const onClickResultPage = () => {
    navigate("/result-composition");
  };

  return (
    <div style={{ marginLeft: "500px" }}>
      <div className="head">
        <h1>작곡하기</h1>
        <h3>이제 내가 좋아하는 노래를 직접 만들어 들어요</h3>
      </div>
      <div className="select-genres">
        <p>작곡하고 싶은 장르를 선택해주세요</p>
        {genreError && <p>**장르를 선택해주세요**</p>}
        <button
          onClick={() => handleButtonClick("classic")}
          className={buttonStates.classic ? "selected" : ""}
        >
          클래식
        </button>
        <button
          onClick={() => handleButtonClick("jazz")}
          className={buttonStates.jazz ? "selected" : ""}
        >
          재즈
        </button>
        <button
          onClick={() => handleButtonClick("pop")}
          className={buttonStates.pop ? "selected" : ""}
        >
          팝
        </button>
        <button
          onClick={() => handleButtonClick("ballad")}
          className={buttonStates.ballad ? "selected" : ""}
        >
          발라드
        </button>
        <button
          onClick={() => handleButtonClick("hipHop")}
          className={buttonStates.hipHop ? "selected" : ""}
        >
          힙합
        </button>
      </div>
      <div className="favorite-songs">
        <p>{nickname}님이 좋아하는 노래를 말해주세요!</p>
        {inputErrror && <p>**빈칸을 입력해주세요**</p>}
        <p>가수</p>
        <input
          type="text"
          name="favorite-singer"
          placeholder="가수"
          value={inputSinger}
          onChange={handleInputSigner}
        />
        <p>제목</p>
        <input
          type="text"
          name="favorite-song"
          placeholder="제목"
          value={inputTitle}
          onChange={handleInputTitle}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          handleCompositionStart();
        }}
      >
        AI 작곡 시작하기
      </button>
    </div>
  );
};

export default Page5composition;
