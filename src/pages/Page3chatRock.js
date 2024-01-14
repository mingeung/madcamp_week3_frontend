//Pgae3chatRock.js
import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import "./Page3chatRock.css";
const socket = io("http://localhost:3000");

export default function Page3chatRock() {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });

  useEffect(() => {
    socket.emit("init", { name: "minseung" });

    return () => {
      socket.close();
    };
  }, []);
  //receive message 이벤트에 대한 콜백 등록
  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    });
  }, []);
  //버튼을 클릭했을 때 sen message 이벤트 발생
  const buttonHandler = useCallback(() => {
    console.log("버튼 클릭");
    socket.emit("send message", { name: chat.name, message: chat.message });
  }, [chat]);

  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value });
    },
    [chat]
  );
  const changeName = useCallback(
    (e) => {
      setChat({ name: e.target.value, message: chat.message });
    },
    [chat]
  );

  return (
    <div className="container">
      <h1>록 채팅방입니다</h1>
      <div className="rock-chat-room">
        <div className="Box">
          <div className="ChatBox">
            {chatArr.map((ele) => (
              <div className="Chat">
                <div>{ele.name}</div>
                <div className="ChatLog"> {ele.message}</div>
              </div>
            ))}
          </div>
          <div className="InputBox">
            <input placeholder="내용" onChange={changeMessage} />
            <input placeholder="이름" onChange={changeName} />
            <button onClick={buttonHandler}>등록</button>
          </div>
        </div>
      </div>
      <input />
    </div>
  );
}
