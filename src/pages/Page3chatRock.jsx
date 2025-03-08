// import React, { useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
//
const Chat = () => {
//   const [stompClient, setStompClient] = useState(null);
//   const [chatRoomId, setChatRoomId] = useState('');
//   const [connected, setConnected] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//
//   // WebSocket 연결 및 STOMP 클라이언트 생성
//   const connect = () => {
//     if (!chatRoomId) {
//       alert('채팅방 ID를 입력해주세요.');
//       return;
//     }
//
//     const socket = new SockJS('/stomp/chat'); // 백엔드 엔드포인트와 일치
//     const client = Stomp.over(socket);
//
//     client.connect(
//         {},
//         (frame) => {
//           console.log('Connected: ' + frame);
//           setConnected(true);
//           setStompClient(client);
//           // 구독: /sub/chat/room/{roomId} 경로로 들어오는 메시지 수신
//           client.subscribe(`/sub/chat/room/${chatRoomId}`, (messageOutput) => {
//             setMessages((prevMessages) => [...prevMessages, messageOutput.body]);
//           });
//         },
//         (error) => {
//           console.error('STOMP 연결 에러:', error);
//         }
//     );
//   };
//
//   // 메시지 전송 함수
//   const sendMessage = () => {
//     if (!stompClient || !chatRoomId) {
//       alert('먼저 채팅방에 연결하세요.');
//       return;
//     }
//     if (messageInput.trim() === '') {
//       alert('메시지를 입력하세요.');
//       return;
//     }
//
//     const message = {
//       sender: 'user1', // 실제 사용자 ID로 변경 가능
//       content: messageInput,
//       timestamp: new Date()
//     };
//
//     // 백엔드의 /pub/chat.sendMessage/{chatRoomId} 경로로 메시지 전송
//     stompClient.send(`/pub/chat.sendMessage/${chatRoomId}`, {}, JSON.stringify(message));
//     setMessageInput('');
//   };
//
//   return (
//       <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//         <h1>React Chat Client</h1>
//         {!connected ? (
//             <div>
//               <label htmlFor="chatRoomId">Chat Room ID:</label>
//               <input
//                   type="text"
//                   id="chatRoomId"
//                   value={chatRoomId}
//                   onChange={(e) => setChatRoomId(e.target.value)}
//                   placeholder="채팅방 ID 입력"
//               />
//               <button onClick={connect}>연결</button>
//             </div>
//         ) : (
//             <div>
//               <div
//                   style={{
//                     border: '1px solid #ccc',
//                     padding: '10px',
//                     height: '300px',
//                     overflowY: 'scroll',
//                     marginBottom: '10px'
//                   }}
//               >
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg}</div>
//                 ))}
//               </div>
//               <div>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     placeholder="메시지 입력"
//                 />
//                 <button onClick={sendMessage}>메시지 전송</button>
//               </div>
//             </div>
//         )}
//       </div>
//   );
};

export default Chat;
