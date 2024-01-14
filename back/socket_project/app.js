//app.js
WDS_SOCKET_PORT = 0;
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000:80",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = 3000;

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("init", (payload) => {
    console.log(payload);
  });

  socket.on("send message", (item) => {
    console.log(item.name + ": " + item.message);
    io.emit("receive message", { name: item.name, message: item.message });
  });
});

console.log("서버 시작 전");
httpServer.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});

module.exports = app;
