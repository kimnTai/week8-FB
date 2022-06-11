import mongoose from "mongoose";

interface IPost extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    image: string;
    content: string;
    likes: mongoose.Types.ObjectId[];
}

const postSchema = new mongoose.Schema<IPost>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "貼文 UserID 未填寫"],
        },
        image: { type: String, required: [true, "貼文圖片 image 未填寫"] },
        content: { type: String, required: [true, "content 未填寫"] },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    { versionKey: false, timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate 時觸發關聯
postSchema.virtual("comments", {
    ref: "comment",
    foreignField: "postId",
    localField: "_id",
});

const Posts = mongoose.model("post", postSchema);

export default Posts;
