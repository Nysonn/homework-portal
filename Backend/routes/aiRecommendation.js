import express from "express";
import LlamaAI from "llamaai";

const router = express.Router();

// Initialize the Llama AI client using your API key from your .env file
const llamaAPI = new LlamaAI(process.env.LLAMA_API_KEY);

router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    if (!process.env.LLAMA_API_KEY) {
      throw new Error("Llama API key is not configured");
    }

    // Construct the prompt
    const prompt = `Generate a short and engaging homework description based on the title: "${title}". The description should be concise, clear, and provide guidance to students.`;

    // Build the API request payload
    const apiRequestJson = {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates homework descriptions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    };

    // Call the Llama AI API using the run() method
    const response = await llamaAPI.run(apiRequestJson);

    // Debug: Log the raw response to inspect its structure (remove in production)
    console.log("Raw Llama API response:", response);

    // Extract the generated recommendation from the response
    const recommendation = response.message?.content?.trim();
    if (!recommendation) {
      throw new Error("No recommendation returned from Llama AI API");
    }

    res.json({ recommendation });
  } catch (error) {
    console.error("Llama API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate recommendation",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
