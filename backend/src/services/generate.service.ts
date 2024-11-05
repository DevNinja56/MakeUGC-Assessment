import GenerateSchema from "../models/generate.model";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateScript = async (
  keywords: string[],
  tone: string,
  ageGroup: string
) => {
  const prompt = `I will provide keywords, tone, and age group, and you will suggest script ideas based on them. The keywords are: ${keywords.flat()}, the tone is: ${tone}, and the age group is: ${ageGroup}. Respond with a short, 5-6 line script. Only provide the script text directly, without any special characters, formatting symbols, or extra spaces.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // const description = "This is test how are you";
  const generate = await GenerateSchema.create({
    keywords,
    tone,
    ageGroup,
    description: response,
  });
  return generate;
};

const bulkUpdateUserInGenerate = async (userId: string, data: string[]) => {
  const bulkOps = data.map((generateId) => ({
    updateOne: {
      filter: { _id: generateId },
      update: { $set: { userId } },
    },
  }));

  return await GenerateSchema.bulkWrite(bulkOps);
};

const getAllGenerates = async (userId: string) => {
  const generates = await GenerateSchema.find({ userId });

  return generates;
};

export default {
  generateScript,
  bulkUpdateUserInGenerate,
  getAllGenerates,
};
