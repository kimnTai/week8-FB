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
     * @description 註冊
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    signUp = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password: originPassword } = req.body;
        if (await Model.Users.findOne({ email })) {
            throw new Error("此 Email 已被註冊!");
        }
        const password = await bcrypt.hash(originPassword, 12);
        const result = await Model.Users.create({ name, email, password });
        (<any>result).password = undefined;
        res.send({ status: "success", result });
    };

    /**
     * @description 登入
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    signIn = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const user = await Model.Users.findOne({ email }).select("+password");
        if (!user) {
            throw new Error("此 Email 不存在!");
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error("密碼錯誤!");
        }
        res.send({ status: "success", message: "登入成功" });
    };

    /**
     * @description 重設密碼
     * @memberof UsersController
     */
    userUpdatePassword = async (req: Request, res: Response) => {
        const { id, password: newPassword } = req.body;
        const password = await bcrypt.hash(newPassword, 12);
        await Model.Users.findByIdAndUpdate(id, { password });
        res.send({ status: "success", message: "密碼重設成功" });
    };
}

export default new UsersController();
