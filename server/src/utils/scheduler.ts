import * as scheduler from "node-schedule";
import { Crew } from "../entity/Crew";
import { Chat } from "../entity/Chat";
import { User } from "../entity/User";

export const SchedulerCrewDelete = () =>
  scheduler.scheduleJob("0 0 * * *", async () => {
    const now = new Date();
    const Day15Ms = 1000 * 60 * 60 * 24 * 15;
    const Crews = await Crew.find();
    Crews.map(async (crew) => {
      const endDate = new Date(`${crew.date}T${crew.time.substr(8)}:00`);
      if (now.getTime() > endDate.getTime()) {
        if (crew.Completed === false) {
          crew.Completed = true;
          Crew.save(crew);
        }
        const time = now.getTime() - endDate.getTime();
        if (now.getTime() - endDate.getTime() > Day15Ms) {
          Crew.remove(crew);
        }
      }
    });
  });
