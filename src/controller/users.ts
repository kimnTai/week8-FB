import { Request, Response } from "express";
import * as Model from "../model";

class UsersController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        const { limit } = req.query;
        const result = await Model.Users.find()
            .sort("-createdAt")
            .limit(Number(limit) ?? 10);
        res.send({ status: "success", result });
    };

    createUsers = async (req: Request, res: Response): Promise<void> => {
        const { name, email, photo } = req.body;
        const result = await Model.Users.create({ name, email, photo });
        res.send({ status: "success", result });
    };
}

export default new UsersController();
