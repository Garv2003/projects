"use server";
import axios from "axios";

export async function ImageGeneration(prompt: string) {
    const response = await axios.post(
        process.env.HUGGING_FACE_URL as string,
        prompt,
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
                "Content-Type": "application/json",
            },
            responseType: "arraybuffer",
        }
    );
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    return base64ImageWithMime
}

