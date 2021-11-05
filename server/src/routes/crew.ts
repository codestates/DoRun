import { Router } from "express";
import * as CrewController from "../controllers/crew";
import { authCheck } from "../middleware/AuthCheck";

const crewRoter = Router();

//crewRoter.post("/", authCheck, CrewController.CreateCrew);
crewRoter.post("/", CrewController.CreateCrew);
crewRoter.patch("/:crewId", CrewController.EditCrew);
crewRoter.get("/:crewId", CrewController.InfoCrew);
crewRoter.delete("/:userId", CrewController.DeleteCrew);
crewRoter.get("/", CrewController.FindAllCrew);
crewRoter.post("/:userId/:crewId", CrewController.JoinCrew);

export default crewRoter;
