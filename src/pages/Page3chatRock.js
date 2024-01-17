import { useAuth } from "../AuthContext";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Page3chatRock.css";

const Page3chatRock = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = io("ws://localhost:80/"); // 서버의 웹소켓 주소로 변경해야 합니다.
  const { user_id } = useAuth();
  // 초기 메시지 불러오기 및 웹소켓 연결 설정
  useEffect(() => {
    // 웹소켓 연결 설정
    socket.on("connect", () => {
      console.log("웹소켓 연결 성공");
    });

    // 웹소켓 메시지 수신
    socket.on("receive_message", (data) => {
      setMessages([
        ...messages,
        { user_id: data.user_id, message: data.message },
      ]);
    });

    // 초기 메시지 불러오기
    fetchChatMessages();
  }, [messages, socket]);

  // 채팅 메시지 불러오기
  const fetchChatMessages = async () => {
    try {
      const response = await fetch("/chat/messages/rock_room");
      if (!response.ok) {
        throw new Error("채팅 메시지를 불러오는 중 오류 발생");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("new_message", {
        room_id: "rock_room",
        user_id: user_id,
        message: input,
      });

      // 화면에 메시지 추가
      setMessages([...messages, { user_id: user_id, message: input }]);
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="rock-chat-room">
      <div className="chat-room-head">
        <div className="chat-room-name">Rock Chat Room</div>
      </div>
      <div className="ChatBox">
        {messages.map((message, index) => (
          <div key={index} className="Chat">
            <p className="ChatLog">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="InputBox">
        <input
          type="text"
          className="input-text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="btn-send" onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default Page3chatRock;
