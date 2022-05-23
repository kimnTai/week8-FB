import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    photo: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: [true, "用戶名稱未填寫"] },
        email: { type: String, required: [true, "email 未填寫"] },
        photo: { type: String, default: "https://i.imgur.com/tPmUQVM.png" },
    },
    { versionKey: false, timestamps: true }
);

const Users = mongoose.model("user", userSchema);

export default Users;
