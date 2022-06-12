import { Request, Response } from "express";
import axios from "axios";
import { DotenvParseOutput, config } from "dotenv";

const { GOOGLE_CLIENT_ID, GOOGLE_LOGIN_CALL_BACK_URL, GOOGLE_CLIENT_SECRET } = config().parsed as DotenvParseOutput;

class AuthController {
    googleLogin = async (req: Request, res: Response): Promise<void> => {
        const params = {
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: GOOGLE_LOGIN_CALL_BACK_URL,
            response_type: "code",
            scope: "email profile",
        };
        const queryString = new URLSearchParams(params).toString();
        res.redirect(`https://accounts.google.com/o/oauth2/auth?${queryString}`);
    };

    googleCallback = async (req: Request, res: Response): Promise<void> => {
        const options = {
            code: req.query.code as string,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            redirectUri: GOOGLE_LOGIN_CALL_BACK_URL,
            grant_type: "authorization_code",
        };
        const queryString = new URLSearchParams(options).toString();
        const response = await axios.post("https://oauth2.googleapis.com/token", queryString);

        const { id_token, access_token } = response.data;
        const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            { headers: { Authorization: `Bearer ${id_token}` } }
        );
        res.send({ data });
    };
}

export default new AuthController();
