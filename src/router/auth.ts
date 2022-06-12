import express from "express";
import passport from "passport";
import Utils from "../utils";
import * as Controller from "../controller";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), Controller.Auth.googleCallback);

export default router;
