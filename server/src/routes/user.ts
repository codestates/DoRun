import { Router } from "express";
import * as UserController from "../controllers/user";
import { authCheck } from "../middleware/AuthCheck";
import { upload } from "../utils/multer";
const userRoter = Router();

userRoter.post("/signup", UserController.SignUp);
userRoter.delete("/signout/:userId", UserController.SignOut);
userRoter.post("/login", UserController.Login);
userRoter.post("/logout", UserController.logout);
//userRoter.patch("/", authCheck, UserController.Edit);
userRoter.patch("/", upload.single("image"), UserController.Edit);
//userRoter.get("/:userId", authCheck, UserController.userInfo);
userRoter.get("/:userId", UserController.userInfo);

export default userRoter;
