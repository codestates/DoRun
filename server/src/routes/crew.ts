import { Router } from "express";
import * as CrewController from "../controllers/crew";
import { authCheck } from "../middleware/AuthCheck";

const crewRoter = Router();

//crewRoter.post("/", authCheck, CrewController.CreateCrew);
crewRoter.post("/", CrewController.createCrew);
crewRoter.patch("/:crewId", CrewController.modifyCrew);
crewRoter.get("/:crewId", CrewController.findCrew);
crewRoter.delete("/:userId", CrewController.deleteCrew);
crewRoter.get("/", CrewController.findAllCrew);
crewRoter.post("/:userId/:crewId", CrewController.joinCrew);

export default crewRoter;
