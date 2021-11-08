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

      socket.on("leaveRoom", async (crewId) => {
        io.leave(crewId);
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
export { socketInit };
