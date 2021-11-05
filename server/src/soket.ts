import app from "./index";
//import server from "./index";
const http = require("http");
//const server = http.createServer(app);

//   },
// });
//import server from "./index";
//const io = require("socket.io")(server);

//import io from "./index";

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
// //app.set("port",process.env.SERVER_PORT)

// server.listen(process.env.SERVER_PORT, () => {
//   console.log(`listen Port = ${process.env.SERVER_PORT}`);
// });

try {
  io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`disconnect ${socket.id}`);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      //사용자 조인
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });

    //메시지를 보낸 사용자를 제외한 사용자에게 메세지를 보냄
    socket.on("sendMessage", async (room, { name, message }) => {
      socket.to(room).emit("recvMessage", { name, message });
    });

    socket.on("getAllMessages", async (room) => {
      //DB에서 요청 받은 방에대한 모든 메세지 조회후 응답
      socket.emit("getAllMessages");
    });

    socket.on("error", async (err) => {
      console.log(err);
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = server;
