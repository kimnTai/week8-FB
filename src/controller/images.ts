import { Request, Response } from "express";
import FormData from "form-data";
import axios from "axios";
import "dotenv/config";

class ImageController {
    getImage = async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            throw new Error("未上傳檔案");
        }
        const formData = new FormData();
        formData.append("image", req.file.buffer);
        formData.append("album", process.env.IMGUR_ALBUM_ID);
        const { data } = await axios.post(`https://api.imgur.com/3/image`, formData, {
            headers: { Authorization: `Bearer ${process.env.IMGUR_REFRESH_TOKEN}` },
        });
        res.send({ status: "success", result: data.data.link });
    };
}

export default new ImageController();
