import passport from "passport";
import { Strategy } from "passport-google-oauth20";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_LOGIN_CALL_BACK_URL } = process.env;

passport.use(
    new Strategy(
        {
            clientID: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
            callbackURL: GOOGLE_LOGIN_CALL_BACK_URL,
        },
        (accessToken, refreshToken, profile, callback) => {
            return callback(null, "user");
        }
    )
);
