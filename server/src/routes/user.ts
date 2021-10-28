import { Router } from "express";
import * as UserController from "../controllers/user";
const userRoter = Router();
//export { SignUp, SignOut, Login, logout, Edit };

userRoter.post("/signup", UserController.SignUp);
userRoter.delete("/signout", UserController.SignOut);
userRoter.post("/login", UserController.Login);
userRoter.post("/logout", UserController.logout);
userRoter.patch("/", UserController.Edit);

export default userRoter;
