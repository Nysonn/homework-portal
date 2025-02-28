import express from "express";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const prompt = `Generate a short and engaging homework description based on the title: "${title}"`;
    const response = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 0.7,
    });
    const recommendation = response.data.choices[0].text.trim();
    res.json({ recommendation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
