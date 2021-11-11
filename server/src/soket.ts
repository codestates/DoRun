import { Chat } from "./entity/Chat";
import { User } from "./entity/User";
import { getRepository, MoreThanOrEqual } from "typeorm";

function socketInit(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    transports: ["websocket"],
  });
  // const { createClient } = require("redis");
  // const redisAdapter = require("@socket.io/redis-adapter");
  // const pubClient = createClient({
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,
  //   password: process.env.REDIS_PASSWORD,
  // });
  // const subClient = pubClient.duplicate();

  // io.adapter(redisAdapter(pubClient, subClient));
  const processPID = require("process"); //PID test

  try {
    io.on("connect", (socket) => {
      console.log(`connect ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
      });

      //crewId, userId
      socket.on("joinRoom", async (crewId, userId, nickname) => {
        // db에 최초 접속시에만 메세지확인해서 없으면 저장 있으면 저장 노노
        //클라에서 userId로 비교하는게 아니고 message로 비교
        const StartChatId = await Chat.findOne({
          where: { userId, crewId },
        });
        socket.join(crewId);
        if (!StartChatId) {
          const ChatDB = Chat.create({
            message: `${nickname}님이 입장하셨습니다.`,
            crewId,
            userId,
            serverMsg: true,
          });
          const { createdAt, message, serverMsg } = await Chat.save(ChatDB);

          io.to(crewId).emit(
            "recvMessage",
            userId,
            "",
            message, //`${nickname}님이 입장하셨습니다.`,
            createdAt,
            serverMsg
          );
        }
        // const ChatDB = Chat.create({
        //   message: `${nickname}님이 입장하셨습니다.`,
        //   crewId,
        //   userId,
        // });
        // const { createdAt } = await Chat.save(ChatDB);
        // socket.join(crewId);

        // io.to(crewId).emit(
        //   "recvMessage",
        //   "server",
        //   "server",
        //   `${nickname}님이 입장하셨습니다.`,
        //   createdAt
        // );
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
        //message = message + processPID.pid;
        io.to(crewId).emit("recvMessage", userId, nickname, message, createdAt);
        //io.emit("recvMessage", { name, message });
      });

      socket.on("getAllMessages", async (userId, crewId) => {
        /// crewId 추가 where에도추가
        //DB에서 요청 받은 방에대한 모든 메세지 조회후 응답
        const StartChatId = await Chat.findOne({
          select: ["id", "crewId"],
          where: {
            //message: `${nickname}님이 입장하셨습니다.`,
            userId,
            crewId,
          },
        });
        if (!!StartChatId) {
          const filteredChat = await getRepository(Chat).find({
            //select: ["id", "nickname", "message", "createdAt"],
            id: MoreThanOrEqual(StartChatId.id),
            crewId: StartChatId.crewId,
          });
          socket.emit("getAllMessages", filteredChat);
        }

        // const filteredChat = await Chat.find({
        //   select:
        //   skip: StartChatId.id,
        //   where: {
        //     crewId: StartChatId.crewId,
        //   },
        // });
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
