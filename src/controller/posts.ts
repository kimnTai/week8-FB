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
        const { content, type, userId, image } = req.body;
        if (!(await Model.Users.findById(userId))) {
            throw new Error("無此使用者 id");
        }
        const result = await Model.Posts.create({ content, type, user: userId, image });
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
        const { postId } = req.params;
        const { content, type, name } = req.body;
        const result = await Model.Posts.findOneAndUpdate(
            { _id: postId },
            { content, type, name },
            { new: true, runValidators: true }
        );
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
        const { postId } = req.params;
        if (!(await Model.Posts.findByIdAndDelete(postId))) {
            throw new Error("無此貼文 id");
        }
        res.send({ status: "success", message: "刪除成功" });
    };

    /**
     * @description 新增貼文讚
     * @param {Request} req
     * @param {Response} res
     * @memberof PostsController
     */
    addLike = async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;
        const result = await Model.Posts.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: req.body.userId } },
            { new: true }
        );
        res.send({ status: "success", result });
    };

    /**
     * @description 刪除貼文讚
     * @param {Request} req
     * @param {Response} res
     * @memberof PostsController
     */
    deleteLike = async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;
        const result = await Model.Posts.findByIdAndUpdate(
            postId,
            { $pull: { likes: req.body.userId } },
            { new: true }
        );
        res.send({ status: "success", result });
    };

    /**
     * @description 取得個人貼文列表
     * @param {Request} req
     * @param {Response} res
     * @memberof PostsController
     */
    getByUserId = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const result = await Model.Posts.find({ user: userId });
        res.send({ status: "success", result });
    };
}

export default new PostsController();
