//Home.js
import React from "react";
import "./Page3chat.css";

const Page3chat = () => {
  return (
    <div style={{ marginLeft: "300px" }}>
      <h1>채팅방 페이지 입니다.</h1>
      <p>혼자 노래 듣고 있나요? </p>
      <p>이제 대화하면서 노래를 들어요</p>
      <p>대화 시작하기</p>
      <div className="chat-rooms">
        <div className="chat-box-rock">
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
