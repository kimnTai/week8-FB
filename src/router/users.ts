import express from "express";
import * as Controller from "../controller";
import { middleware } from "../middleware";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/sign_up", middleware.checkSignUp, Controller.User.signUp);

router.post("/sign_in", middleware.checkSignIn, Controller.User.signIn);

router.post("/updatePassword", middleware.checkUpdatePassword, Controller.User.updatePassword);

router.get("/profile", middleware.isAuth, Controller.User.getProfile);

router.patch("/profile", middleware.isAuth, Controller.User.updateProfile);

router.get("/getLikeList", middleware.isAuth, Controller.User.getLikeList);

router.post("/:userId/follow", (req, res) => {
    const { userId } = req.params;
    res.send({ status: "success", message: "follow", userId });
});

router.delete("/:userId/unfollow", (req, res) => {
    const { userId } = req.params;
    res.send({ status: "success", message: "unfollow", userId });
});

router.get("/following", (req, res) => {
    res.send({ status: "success", message: "following" });
});

export default router;
