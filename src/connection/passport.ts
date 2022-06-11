import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import * as Model from "../model";
import bcrypt from "bcryptjs";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_LOGIN_CALL_BACK_URL } = process.env;

passport.use(
    new Strategy(
        {
            clientID: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
            callbackURL: GOOGLE_LOGIN_CALL_BACK_URL,
        },
        async (accessToken, refreshToken, profile, callback) => {
            const { sub: googleId, name, picture, email } = profile._json;
            const user = await Model.Users.findOne({ googleId });
            if (user) {
                return callback(null, user);
            }
            if (await Model.Users.findOne({ email })) {
                throw new Error("此 Email 已被註冊!");
            }
            const password = await bcrypt.hash(googleId, 12);
            const _result = await Model.Users.create({ name, email, password, googleId, photo: picture });
            const { password: _, ...result } = _result.toObject();
            return callback(null, _result);
        }
    )
);
