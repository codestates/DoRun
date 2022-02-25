import { User } from "../entity/User";
import { Crew } from "../entity/Crew";
import { Chat } from "../entity/Chat";
import { Request, Response } from "express";

const CreateCrew = async (req: Request, res: Response) => {
  try {
    const {
      title,
      desc,
      personnel,
      level,
      locationMa,
      locationLa,
      departure,
      time,
      date,
      distance,
      userId,
    } = req.body;
    let crewInfo = Crew.create({
      title,
      desc,
      personnel,
      level,
      time,
      date,
      locationMa,
      locationLa,
      departure,
      distance,
    });

    let now = new Date();
    let endDate = new Date(`${date}T${time.substr(8)}:00`);
    let endMs = endDate.getTime() - now.getTime();

    if (!crewInfo) return res.status(400).send();

    crewInfo = await Crew.save(crewInfo);

    const userInfo = await User.findOne({ id: userId });
    userInfo.crewId = crewInfo.id;
    await User.save(userInfo);

    const chatInfo = Chat.create({
      crewId: crewInfo.id,
    });
    Chat.save(chatInfo);

    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: crewInfo, accessToken, message: "success" });
    }

    setTimeout(async () => {
      crewInfo = await Crew.findOne({ id: crewInfo.id });
      if (crewInfo) {
        crewInfo.Completed = true;
        Crew.save(crewInfo);
      }
    }, endMs);

    setTimeout(() => {
      Crew.remove(crewInfo);
    }, endMs + 1000 * 60 * 60 * 24 * 15); // 15day

    return res.status(201).send({ data: crewInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const EditCrew = async (req: Request, res: Response) => {
  try {
    const crewId = Number(req.params.crewId);
    if (!crewId) return res.status(400).send();

    let crewInfo = await Crew.findOne({ id: crewId });

    crewInfo.title = req.body.title || crewInfo.title;
    crewInfo.desc = req.body.desc || crewInfo.desc;
    crewInfo.personnel = req.body.personnel || crewInfo.personnel;
    crewInfo.level = req.body.level || crewInfo.level;
    crewInfo.time = req.body.time || crewInfo.time;
    crewInfo.date = req.body.date || crewInfo.date;
    crewInfo.locationLa = req.body.locationLa || crewInfo.locationLa;
    crewInfo.locationMa = req.body.locationMa || crewInfo.locationMa;
    crewInfo.departure = req.body.departure || crewInfo.departure;
    crewInfo.distance = req.body.distance || crewInfo.distance;

    const updateCrew = await Crew.save(crewInfo);

    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: updateCrew, accessToken, message: "success" });
    }

    return res.status(201).send({ data: updateCrew, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const InfoCrew = async (req: Request, res: Response) => {
  try {
    const crewId = Number(req.params.crewId);

    const crewInfo = await Crew.findOne({ id: crewId });
    const CrewInUser = await User.find({
      select: ["id", "nickname"],
      where: {
        crewId: crewId,
      },
    });

    if (!crewInfo) return res.status(400).send({ message: "invalid CrewId" });

    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: crewInfo, CrewInUser, accessToken, message: "success" });
    }
    return res.status(201).send({ data: crewInfo, CrewInUser, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const DeleteCrew = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    let userInfo = await User.findOne({ id: userId });
    if (!userInfo || userInfo.crewId === null) return res.status(400).send();
    const crewId = userInfo.crewId;
    userInfo.crewId = null;

    await User.save(userInfo);

    const CrewInUser = await User.find({ crewId });

    if (CrewInUser.length === 0) {
      const chatInfo = await Chat.find({ crewId });
      await Chat.remove(chatInfo);
      const crewInfo = await Crew.findOne({ id: crewId });
      await Crew.remove(crewInfo);
    }

    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const FindAllCrew = async (req: Request, res: Response) => {
  try {
    const crewInfo = await Crew.find({ select: ["id", "locationLa", "locationMa"] });

    return res.status(200).send({ data: crewInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "InternaD Server Error", err: err });
  }
};

const JoinCrew = async (req: Request, res: Response) => {
  try {
    const { userId, crewId }: any = Number(req.params);

    let userInfo = await User.findOne({ id: userId });
    userInfo.crewId = crewId;

    userInfo = await User.save(userInfo);

    return res.status(200).send({ data: userInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

export { CreateCrew, EditCrew, InfoCrew, DeleteCrew, FindAllCrew, JoinCrew };
