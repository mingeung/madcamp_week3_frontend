import React, { useEffect } from "react";
import io from "socket.io-client";
import "./Page3chatRock.css";
const socket = io("http://localhost:3000");

export default function Page3chatRock() {
  useEffect(() => {
    socket.emit("init", { name: "minseung" });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: "300px" }}>록 채팅방입니다</h1>
      <div className="rock-chat-room">
        <div className="Box">
          <div className="ChatBox"></div>
          <div className="InputBox">
            <input placeholder="내용" />
            <input placeholder="이름" />
            <button>등록</button>
          </div>
        </div>
      </div>
      <input />
    </div>
  );
}
