import { Request, Response } from "express";
import { DotenvParseOutput, config } from "dotenv";
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as Model from "../model";

class AuthController {
    constructor() {
        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_LOGIN_CALL_BACK_URL } = config()
            .parsed as DotenvParseOutput;
        passport.use(
            new GoogleStrategy(
                {
                    clientID: GOOGLE_CLIENT_ID,
                    clientSecret: GOOGLE_CLIENT_SECRET,
                    callbackURL: GOOGLE_LOGIN_CALL_BACK_URL,
                },
                this.loginByGoogle
            )
        );
    }

    loginByGoogle = async (accessToken: string, refreshToken: string, profile: Profile, callback: VerifyCallback) => {
        const { sub: googleId, name, picture, email } = profile._json;
        const user = await Model.Users.findOne({ googleId });
        if (user) {
            return callback(null, user);
        }
        if (await Model.Users.findOne({ email })) {
            throw new Error("此 Email 已被註冊!");
        }
        const password = await bcrypt.hash(googleId, 12);
        const result = await Model.Users.create({ name, email, password, googleId, photo: picture });
        return callback(null, result);
    };

    googleCallback = async (req: Request, res: Response): Promise<void> => {
        const { _id, name } = req.user as any;
        const { JWT_SECRET, JWT_EXPIRES_DAY } = process.env as any;
        const token = jwt.sign({ userId: _id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_DAY });
        res.redirect(`https://kimntai.github.io/week4-FullStack/#/callback?token=${token}&name=${name}`);
    };
}

export default new AuthController();
