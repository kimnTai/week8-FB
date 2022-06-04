import mongoose from "mongoose";

interface IPost {
    user: mongoose.Types.ObjectId;
    tags: string;
    type: string;
    image: string;
    createdAt: Date;
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
        tags: [{ type: String, required: [true, "貼文標籤 tags 未填寫"] }],
        type: { type: String, enum: ["group", "person"], required: [true, "貼文類型 type 未填寫"] },
        image: { type: String, required: [true, "貼文圖片 image 未填寫"] },
        createdAt: { type: Date, default: Date.now },
        content: { type: String, required: [true, "content 未填寫"] },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    { versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate 時觸發關聯
postSchema.virtual("comments", {
    ref: "comment",
    foreignField: "postId",
    localField: "_id",
});

const Posts = mongoose.model("post", postSchema);

export default Posts;
