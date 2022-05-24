import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as Model from "../model";

class UsersController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        const { limit } = req.query;
        const result = await Model.Users.find()
            .sort("-createdAt")
            .limit(Number(limit) ?? 10);
        res.send({ status: "success", result });
    };

    /**
     * @description 使用者註冊
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    createUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password: originPassword } = req.body;
        if (!name || !email || !originPassword) {
            throw new Error("格式錯誤");
        }
        if ((await Model.Users.find({ email })).length) {
            throw new Error("此 Email 已被註冊!");
        }
        const password = await bcrypt.hash(originPassword, 12);
        const result = await Model.Users.create({ name, email, password });
        res.send({ status: "success", result });
    };

    /**
     * @description 使用者登入
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    userSignIn = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("格式錯誤");
        }
        const user = await Model.Users.findOne({ email });
        if (!user) {
            throw new Error("此 Email 不存在!");
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error("密碼錯誤!");
        }
        res.send({ status: "success", message: "登入成功" });
    };
}

export default new UsersController();
