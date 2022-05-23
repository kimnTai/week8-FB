import mongoose from "mongoose";

interface IPost {
    user: mongoose.Types.ObjectId;
    tags: string;
    type: string;
    image: string;
    createdAt: Date;
    content: string;
    likes: number;
    comments: number;
}

const postSchema = new mongoose.Schema<IPost>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "貼文 ID 未填寫"],
        },
        tags: [{ type: String, required: [true, "貼文標籤 tags 未填寫"] }],
        type: { type: String, enum: ["group", "person"], required: [true, "貼文類型 type 未填寫"] },
        image: { type: String, required: [true, "貼文圖片 image 未填寫"] },
        createdAt: { type: Date, default: Date.now },
        content: { type: String, required: [true, "content 未填寫"] },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
    { versionKey: false }
);

const Posts = mongoose.model("post", postSchema);

export default Posts;
