import { Request, Response } from "express";
import * as Model from "../model";

class PostsController {
    /**
     * @description 取得所有貼文
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    getAll = async (req: Request, res: Response): Promise<void> => {
        const { sort, keyword } = req.query;
        const result = await Model.Posts.find(keyword ? { content: new RegExp(`${keyword}`) } : {})
            .populate({ path: "user", select: "name photo" })
            .populate({ path: "comments", select: "createdAt -_id -postId" })
            .sort(`${sort === "new" ? "-" : ""}createdAt`);
        res.send({ status: "success", result });
    };

    /**
     * @description 取得單一貼文
     * @param {Request} req
     * @param {Response} res
     * @memberof PostsController
     */
    getById = async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;
        const result = await Model.Posts.findById(postId);
        if (!result) {
            throw new Error("無此貼文 id");
        }
        res.send({ status: "success", result });
    };

    /**
     * @description 新增單一貼文
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    addOne = async (req: Request, res: Response): Promise<void> => {
        const { content, type, userId, image } = req.body;
        if (!(await Model.Users.findById(userId))) {
            throw new Error("無此使用者 id");
        }
        const result = await Model.Posts.create({ content, type, user: userId, image });
        res.send({ status: "success", result });
    };

    /**
     * @description 編輯單一貼文
     * @param {Request} req
     * @param {Response} res
     * @return {*}  {Promise<void>}
     * @memberof PostsController
     */
    editOne = async (req: Request, res: Response): Promise<void> => {
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
        if (!result) {
            throw new Error("無此貼文 id");
        }
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

    /**
     * @description 新增貼文留言
     * @param {Request} req
     * @param {Response} res
     * @memberof PostsController
     */
    addComment = async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;
        if (!(await Model.Posts.findById(postId))) {
            throw new Error("無此貼文 id");
        }
        const { userId, comment } = req.body;
        const result = await Model.Comments.create({ userId, postId, comment });
        res.send({ status: "success", result });
    };
}

export default new PostsController();
