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

      //crewId, userId
      socket.on("joinRoom", async (crewId, userId) => {
        // db에 최초 접속시에만 메세지확인해서 없으면 저장 있으면 저장 노노
        const ChatDB = Chat.create({
          message: `${userId}번 유저가 입장하셨습니다.`,
          crewId,
          userId,
        });
        const { createdAt } = await Chat.save(ChatDB);
        socket.join(crewId);
        io.to(crewId).emit(
          "recvMessage",
          "server",
          "server",
          `${userId}번 유저가 입장하셨습니다.`,
          createdAt
        );
      });

      socket.on("leaveRoom", async (crewId) => {
        io.leave(crewId);
      });

      socket.on("sendMessage", async (userId, crewId, nickname, message) => {
        const ChatDB = Chat.create({
          nickname,
          message,
          crewId,
          userId,
        });
        const { createdAt } = await Chat.save(ChatDB);
        io.to(crewId).emit("recvMessage", userId, nickname, message, createdAt);
        //io.emit("recvMessage", { name, message });
      });

      socket.on("getAllMessages", async (userId) => {
        //DB에서 요청 받은 방에대한 모든 메세지 조회후 응답
        const StartChatId = await Chat.findOne({
          select: ["id"],
          where: {
            //message: `${nickname}님이 입장하셨습니다.`,
            userId,
          },
        });
        const filteredChat = await Chat.find({
          select: ["nickname", "message", "createdAt"],
          skip: StartChatId.id,
        });
        socket.emit("getAllMessages", filteredChat);
      });

      socket.on("error", async (err) => {
        console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

export { socketInit };
