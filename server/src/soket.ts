import { Chat } from "./entity/Chat";
import { User } from "./entity/User";
import { getRepository } from "typeorm";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisClient } from "redis";
import { Server } from "socket.io";

async function socketInit(server) {
  const io = new Server(server, {
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

          io.to(String(crewId)).emit("recvMessage", {
            userId,
            message,
            createdAt,
            serverMsg,
          });
        }
      });

      socket.on("leaveRoom", async (crewId) => {
        io.socketsLeave(String(crewId));
      });

      socket.on("sendMessage", async (userId, crewId, nickname, message) => {
        const ChatDB = Chat.create({
          nickname,
          message,
          crewId,
          userId,
        });
        const { createdAt } = await Chat.save(ChatDB);
        //const userInfo = await User.find({ id: userId });
        const profileImg = await User.findOne({
          select: ["image"],
          where: { id: userId },
        });
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
      });

      socket.on("getAllMessages", async (userId, crewId) => {
        const StartChatId = await Chat.findOne({
          select: ["id", "crewId"],
          where: {
            userId,
            crewId,
          },
        });
        if (StartChatId) {
          const filteredChat = await getRepository(Chat)
            .createQueryBuilder("chat")
            .where("chat.crewId = :crewId", { crewId })
            .andWhere("chat.id >= :id", { id: StartChatId.id })
            .leftJoinAndSelect("chat.crew", "crew")
            .leftJoinAndSelect("crew.users", "user", "user.id = chat.userId")
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
