import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// Initialize the OpenAI library
const openai = new OpenAI({
    
  });

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint for handling AI requests
app.post('/ask-ai', async (req, res) => {
  const { question } = req.body; // Expect a JSON body with a "question" field
  try {
    // Generate a completion using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // model name
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    // Send the AI's response back to the client
    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error from OpenAI API:", error.response?.data || error.message);
    res.status(500).send('Error processing your request');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
