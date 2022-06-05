import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import * as Model from "../model";

class UsersController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        const result = await Model.Users.find()
            .sort("-createdAt")
            .limit(Number(req.query.limit) ?? 10);
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
        const _result = await Model.Users.create({ name, email, password });
        const { password: _, ...result } = _result.toObject();
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
        const { password: _, ...result } = user.toObject();
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: process.env.JWT_EXPIRES_DAY });
        res.send({ status: "success", token, result });
    };

    /**
     * @description 重設密碼
     * @memberof UsersController
     */
    updatePassword = async (req: Request, res: Response) => {
        const password = await bcrypt.hash(req.body.password, 12);
        if (!(await Model.Users.findByIdAndUpdate(req.body.userId, { password }))) {
            throw new Error("此 id 不存在");
        }
        res.send({ status: "success", message: "密碼重設成功" });
    };

    /**
     * @description 取得個人資料
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    getProfile = async (req: Request, res: Response) => {
        const result = await Model.Users.findById(req.body.userId);
        if (!result) {
            throw new Error("此 id 不存在");
        }
        res.send({ status: "success", result });
    };

    /**
     * @description 更新個人資料
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    updateProfile = async (req: Request, res: Response) => {
        const { userId, name, email, photo } = req.body;
        const _result = await Model.Users.findByIdAndUpdate(userId, { name, email, photo });
        if (!_result) {
            throw new Error("此 id 不存在");
        }
        const result = await Model.Users.findById(userId);
        res.send({ status: "success", message: "更新成功", result });
    };

    /**
     * @description 個人按讚貼文
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    getLikeList = async (req: Request, res: Response) => {
        const result = await Model.Posts.find({ likes: { $in: [req.body.userId] } }).populate({
            path: "user",
            select: "_id name",
        });
        res.send({ status: "success", result });
    };

    /**
     * @description 新增追蹤
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    addFollow = async (req: Request, res: Response) => {
        const { userId } = req.body;
        const { followingId } = req.params;
        if (userId === followingId) {
            throw new Error("您無法追蹤自己");
        }
        await Model.Users.updateOne(
            { _id: followingId, "followers.user": { $ne: userId } },
            { $addToSet: { followers: { user: userId } } }
        );
        await Model.Users.updateOne(
            { _id: userId, "following.user": { $ne: followingId } },
            { $addToSet: { following: { user: followingId } } }
        );
        res.send({ status: "success", message: "您已成功追蹤！" });
    };

    /**
     * @description 移除追蹤
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    removeFollow = async (req: Request, res: Response) => {
        const { userId } = req.body;
        const { followingId } = req.params;
        if (userId === followingId) {
            throw new Error("您無法取消追蹤自己");
        }
        await Model.Users.updateOne({ _id: userId }, { $pull: { following: { user: followingId } } });
        await Model.Users.updateOne({ _id: followingId }, { $pull: { followers: { user: userId } } });
        res.send({ status: "success", message: "您已成功取消追蹤！" });
    };

    /**
     * @description 取得追蹤清單
     * @param {Request} req
     * @param {Response} res
     * @memberof UsersController
     */
    getFollowList = async (req: Request, res: Response) => {
        const result = await Model.Users.findById(req.body.userId).populate({
            path: "following.user",
            select: "name photo",
        });
        res.send({ status: "success", result });
    };
}

export default new UsersController();
