import { Chat } from "./entity/Chat";
function socketInit(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  try {
    io.on("connect", (socket) => {
      console.log(`connect ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
      });

      socket.on("joinRoom", async (crewId, nickname) => {
        const ChatDB = Chat.create({
          nickname,
          message: `${nickname}님이 입장하셨습니다.`,
          crewId,
        });
        Chat.save(ChatDB);
        socket.join(crewId);
        io.to(crewId).emit("recvMessage", { nickname, message: `${nickname}님이 입장하셨습니다.` });
      });

      socket.on("leaveRoom", async (room) => {
        io.leave(room);
      });

      socket.on("sendMessage", async (crewId, { nickname, message }) => {
        const ChatDB = Chat.create({
          nickname,
          message,
          crewId,
        });
        Chat.save(ChatDB);
        io.to(crewId).emit("recvMessage", { nickname, message });
        //io.emit("recvMessage", { name, message });
      });

      socket.on("getAllMessages", async (crewId, { nickname }) => {
        //DB에서 요청 받은 방에대한 모든 메세지 조회후 응답
        const StartChatId = await Chat.findOne({
          select: ["id"],
          where: {
            message: `${nickname}님이 입장하셨습니다.`,
          },
        });
        const filteredChat = await Chat.find({
          select: ["nickname", "message", "createdAt"],
          skip: StartChatId.id,
        });
        socket.emit("getAllMessages", { filteredChat });
      });

      socket.on("error", async (err) => {
        console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

// 유저마다 채팅 테이블을 만드는건 데이터 중복이 있을수있고 동일한 방에 10명이 있다면 메세지 하나를 보낼때마다 10개의 테이블을 수정해야함...

// chat 테이블에 메시지컬럼을 배열이 아닌 형식으로 저장을하고 크루아이디로 그방에 채팅인것을 확인하고 유저가 크루에 입장했을때
//유저테이블에 메세지 id 컬럼을 만든후 그 컬럼에 메세지 id를 저장하는 방식으로 진행해서 하면 어떨까? 이렇게 하면 메세지 중복성도 해결할수있고
// 메세지를 여러번 수정안해도됨

export { socketInit };
