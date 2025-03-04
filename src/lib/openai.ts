import OpenAI from "openai";


export const Client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
