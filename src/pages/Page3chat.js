import React from "react";
import "./Page3chat.css";
import { useNavigate } from "react-router-dom";

const Page3chat = () => {
  const navigate = useNavigate();

  const onClickGoRock = () => {
    navigate("/chat-rock");
  };
  return (
    <div className="container">
      <div className="banner">
        <p>아무말 </p>
        <p className="title">채팅방</p>
        <p className="intro-text">혼자 노래 듣고 있나요? </p>
        <p className="intro-text">이제 대화하면서 노래를 들어요</p>
        <p className="go-talk">대화 시작하기</p>
      </div>

      <div className="chat-rooms">
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
    </div>
  );
};

export default Page3chat;
