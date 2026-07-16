"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function run(prompt: string) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Generate a text prompt to create Logo for Logo Title/Brand name : dsdsds,with description: dsds, with Color combination of Ocean Blues, also include the Curry Pot, 3D Style and include Minimalists And Elegants Logos design idea and Referring to this Logo Prompt:Create a sophisticated and elegant logo design that is inspired by nature and vintage aesthetics. The logo should incorporate elements of symbolism, intricate details, and a touch of mystery. Use a combination of typography, line art, and subtle color palettes to create a timeless and visually striking design. The logo should convey a sense of luxury, tradition, and quality.  Give me result in JSON portal with prompt field only\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n{\n  \"prompt\": \"Create a minimalist and elegant 3D logo for the brand \\\"dsdsds\\\". The logo should be inspired by the provided description: \\\"dsds\\\". Incorporate a Curry Pot icon. Use a color combination of Ocean Blues.  This logo should convey a sense of sophistication and luxury, utilizing line art and subtle color palettes for a timeless feel. Reference the provided example of combining typography, line art, intricate details and a touch of mystery, but adapt it to be a minimalist and elegant design focusing on 3D elements.\"\n}\n```\n" },
                ],
            },
        ],
    });
    const result = await chatSession.sendMessage(prompt);
    return JSON.parse(result.response.text().replace("```json\n", "").replace("```\n", ""));
}