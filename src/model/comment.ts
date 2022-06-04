import mongoose from "mongoose";

interface IComment {
    comment: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>(
    {
        comment: { type: String, required: [true, "comment 未填寫"] },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "貼文 UserID 未填寫"],
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: [true, "貼文 ID 未填寫"],
        },
    },
    { versionKey: false, timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
    this.populate({ path: "userId", select: "_id name createdAt" });
    next();
});

const Comments = mongoose.model("comment", commentSchema);

export default Comments;
