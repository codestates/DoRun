import { Router } from "express";
import * as UserController from "../controllers/user";
import { authCheck } from "../middleware/AuthCheck";
import { upload } from "../utils/multer";
const userRoter = Router();

userRoter.post("/signup", UserController.createUser);
userRoter.delete("/signout/:userId", UserController.deleteUser);
userRoter.post("/login", UserController.logInUser);
userRoter.post("/logout", UserController.logOutUser);
//userRoter.patch("/", authCheck, UserController.Edit);
userRoter.patch("/", upload.single("image"), UserController.modifyUser);
//userRoter.get("/:userId", authCheck, UserController.userInfo);
userRoter.get("/:userId", UserController.findUser);
userRoter.get("/confirm/:token/:userId", UserController.confirmUserEmail);
userRoter.post("/confirm_email", UserController.sendConfirmEmail);
userRoter.patch("/reset_password", UserController.resetPassword);
userRoter.post("/guest_login", UserController.logInGuest);
userRoter.patch("/history", UserController.modifyHistory);

export default userRoter;
