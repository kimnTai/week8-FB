import mongoose from "mongoose";

interface IFollow {
    user: mongoose.Types.ObjectId[];
    createdAt: Date;
}

interface IUser extends mongoose.Document {
    name: string;
    sex: string;
    email: string;
    password: string;
    photo: string;
    followers: IFollow[];
    following: IFollow[];
    googleId: string;
    facebookId: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: [true, "name 未填寫"] },
        sex: { type: String, enum: ["male", "female"] },
        email: { type: String, required: [true, "email 未填寫"] },
        password: { type: String, required: [true, "password 未填寫"], select: false },
        photo: { type: String, default: "https://i.imgur.com/tPmUQVM.png" },
        followers: [
            {
                _id: false,
                user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        following: [
            {
                _id: false,
                user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        googleId: String,
        facebookId: String,
    },
    { versionKey: false, timestamps: true }
);

const Users = mongoose.model("user", userSchema);

export default Users;
