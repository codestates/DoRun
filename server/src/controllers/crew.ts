import { User } from "../entity/User";
import { Crew } from "../entity/Crew";
import { Request, Response } from "express";

const CreateCrew = async (req: Request, res: Response) => {
  try {
    const { title, desc, personnel, level, location, departure, time, date, distance } = req.body;
    let crewInfo = Crew.create({
      title,
      desc,
      personnel,
      level,
      time,
      date,
      location,
      departure,
      distance,
    });

    if (!crewInfo) return res.status(400).send();

    crewInfo = await Crew.save(crewInfo);

    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: crewInfo, accessToken, message: "success" });
    }

    return res.status(201).send({ data: crewInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const EditCrew = async (req: Request, res: Response) => {
  try {
    const { crewId }: any = req.params;
    if (!crewId) return res.status(400).send();

    let crewInfo = await Crew.findOne({ id: crewId });

    crewInfo.title = req.body.title || crewInfo.title;
    crewInfo.desc = req.body.desc || crewInfo.desc;
    crewInfo.personnel = req.body.personnel || crewInfo.personnel;
    crewInfo.level = req.body.level || crewInfo.level;
    crewInfo.time = req.body.time || crewInfo.time;
    crewInfo.date = req.body.date || crewInfo.date;
    crewInfo.location = req.body.location || crewInfo.location;
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
    const { crewId }: any = req.params;

    const crewInfo = await Crew.findOne({ id: crewId });
    const CrewInUser = await User.find({
      select: ["id"],
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
    const { userId }: any = req.params;

    let userInfo = await User.findOne({ id: userId });
    if (!userInfo) return res.status(400).send();
    const crewId = userInfo.crewId;
    userInfo.crewId = null;

    await User.save(userInfo);

    const CrewInUser = await User.find({ crewId });

    if (!CrewInUser) {
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
    const crewInfo = await Crew.find({ select: ["id", "location"] });

    return res.status(200).send({ data: crewInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const JoinCrew = async (req: Request, res: Response) => {
  try {
    const { userId, crewId }: any = req.params;

    let userInfo = await User.findOne({ id: userId });
    userInfo.crewId = crewId;

    userInfo = await User.save(userInfo);

    return res.status(200).send({ data: userInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

export { CreateCrew, EditCrew, InfoCrew, DeleteCrew, FindAllCrew, JoinCrew };