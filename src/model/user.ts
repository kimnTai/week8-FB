import mongoose from "mongoose";

interface IUser {
    name: string;
    sex: string;
    email: string;
    password: string;
    photo: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: [true, "name 未填寫"] },
        sex: { type: String, enum: ["male", "female"] },
        email: { type: String, required: [true, "email 未填寫"] },
        password: { type: String, required: [true, "password 未填寫"], select: false },
        photo: { type: String, default: "https://i.imgur.com/tPmUQVM.png" },
    },
    { versionKey: false, timestamps: true }
);

const Users = mongoose.model("user", userSchema);

export default Users;
