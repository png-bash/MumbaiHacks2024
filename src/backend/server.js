// server.js
import express from 'express';
import cors from 'cors';
import { something } from 'groq-sdk'; // Update this according to your actual usage


const groq = new Groq();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        { "role": "user", "content": message }
      ],
      "model": "llama-3.2-11b-text-preview",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,  // stream as false to avoid streaming issue for now
    });

    // Respond back with the chatbot's reply
    res.json({ response: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
