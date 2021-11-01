import { Router } from "express";
import * as UserController from "../controllers/user";
import { authCheck } from "../middleware/AuthCheck";
const userRoter = Router();

userRoter.post("/signup", UserController.SignUp);
userRoter.delete("/signout", UserController.SignOut);
userRoter.post("/login", UserController.Login);
userRoter.post("/logout", UserController.logout);
userRoter.patch("/", authCheck, UserController.Edit);
userRoter.get("/:userId", authCheck, UserController.userInfo);

export default userRoter;
