import { Chat } from "./entity/Chat";
import { User } from "./entity/User";
import { getRepository, MoreThanOrEqual } from "typeorm";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisClient } from "redis";

async function socketInit(server) {
  const io = require("socket.io")(server, {
    transports: ["websocket"],
  });
  if (process.env.NODE_ENV !== "dev") {
    const pubClient = new RedisClient({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });
    const subClient = pubClient.duplicate();

    io.adapter(createAdapter(pubClient, subClient));
  }

  try {
    io.on("connect", (socket) => {
      console.log(`connect ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
      });
      socket.on("joinRoom", async (crewId, userId, nickname) => {
        console.log(crewId);
        socket.join(String(crewId));

        const StartChatId = await Chat.findOne({
          where: { userId, crewId },
        });

        if (!StartChatId) {
          const ChatDB = Chat.create({
            message: `${nickname}님이 입장하셨습니다.`,
            crewId,
            userId,
            serverMsg: true,
          });
          const { createdAt, message, serverMsg } = await Chat.save(ChatDB);

          io.to(String(crewId)).emit("recvMessage", { userId, message, createdAt, serverMsg });
        }
      });

      socket.on("leaveRoom", async (crewId) => {
        io.leave(String(crewId));
      });

      socket.on("sendMessage", async (userId, crewId, nickname, message) => {
        const ChatDB = Chat.create({
          nickname,
          message,
          crewId,
          userId,
        });
        const { createdAt } = await Chat.save(ChatDB);
        const userInfo = await User.find({ id: userId });
        const profileImg = await User.findOne({ select: ["image"], where: { id: userId } });
        if (!profileImg) {
          io.to(String(crewId)).emit("recvMessage", {
            userId,
            nickname,
            message,
            image: "https://dorun-image.s3.ap-northeast-2.amazonaws.com/images/defaultImg.png",
            createdAt,
          });
        } else {
          io.to(String(crewId)).emit("recvMessage", {
            userId,
            nickname,
            message,
            image: profileImg.image,
            createdAt,
          });
        }
        //message = message + processPID.pid;
        // io.to(crewId).emit("recvMessage", userId, nickname, message, createdAt);
        // io.emit("recvMessage", userId, nickname, message, createdAt);
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
          //일단 살려두기
          // if (StartChatId) {
          // const filteredChat = await getRepository(Chat).find({
          //   //select: ["id", "nickname", "message", "createdAt"],
          //   id: MoreThanOrEqual(StartChatId.id),
          //   crewId: StartChatId.crewId,
          // });
          // const filteredChat = await Chat.find({
          //   relations: ["crew","user"],
          //   select: ["id", "nickname", "message", "createdAt"],
          //   //where: { User: { crewId: crewId } },
          // });
          // const filteredChat = await getRepository(Chat)
          //   .createQueryBuilder("chat")
          //   .leftJoinAndSelect("users", "user", "user.crewId = chat.crewId")
          //   .leftJoinAndSelect("crew.users", "users")
          //   .where("users.crewId = :crewId", { crewId })
          //   .getMany();
          // const filteredChat = await getRepository(Chat).find({
          //   //select: ["id", "nickname", "message", "createdAt"],
          //   join:{
          //     alias:"chat"
          //   },
          //   id: MoreThanOrEqual(StartChatId.id),
          //   crewId: StartChatId.crewId,
          // });
          const filteredChat = await getRepository(Chat)
            .createQueryBuilder("chat")
            .where("chat.crewId = :crewId", { crewId })
            .andWhere("chat.id >= :id", { id: StartChatId.id })
            // .leftJoinAndSelect("users", "user", "user.crewId = chat.crewId")
            .leftJoinAndSelect("chat.crew", "crew")
            .leftJoinAndSelect("crew.users", "user", "user.id = chat.userId")
            //.where("user.id = :id",{id:user})
            //.where("user.crewId = :crewId", { crewId })
            .getMany();
          socket.emit("getAllMessages", filteredChat);
        }
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
