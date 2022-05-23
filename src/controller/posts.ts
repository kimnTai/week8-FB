import { Request, Response } from "express";
import * as Model from "../model";

class PostsController {
    /**
     * @description 取得所有資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    getPosts = async (req: Request, res: Response): Promise<void> => {
        const { sort, keyword } = req.query;
        const result = await Model.Posts.find(keyword ? { content: new RegExp(`${keyword}`) } : {})
            .populate({ path: "user", select: "name photo" })
            .sort(`${sort === "new" ? "-" : ""}createdAt`);
        res.send({ status: "success", result });
    };

    /**
     * @description 新增單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    createPosts = async (req: Request, res: Response): Promise<void> => {
        const { content, type, user, image } = req.body;
        if (!(await Model.Users.findById(user))) {
            throw new Error("無此使用者 id");
        }
        const result = await Model.Posts.create({ content, type, user, image });
        res.send({ status: "success", result });
    };

    /**
     * @description 刪除所有資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    deleteAll = async (req: Request, res: Response): Promise<void> => {
        await Model.Posts.deleteMany({});
        res.send({ status: "success", message: "刪除成功" });
    };

    /**
     * @description 編輯單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    editPosts = async (req: Request, res: Response): Promise<void> => {
        const { id: _id } = req.params;
        const { content, type, name } = req.body;
        const result = await Model.Posts.findOneAndUpdate({ _id }, { content, type, name }, { new: true });
        if (!result) {
            throw new Error("無此貼文 id");
        }
        res.send({ status: "success", result });
    };

    /**
     * @description 刪除單筆資料
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    deleteById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        if (!(await Model.Posts.findByIdAndDelete(id))) {
            throw new Error("無此貼文 id");
        }
        res.send({ status: "success", message: "刪除成功" });
    };
}

export default new PostsController();
