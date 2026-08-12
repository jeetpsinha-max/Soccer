import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy-key' });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Soccer Server is running' });
});

app.post('/api/tactics/analyze', async (req, res) => {
  try {
    const { teamInfo, opponentInfo } = req.body;
    const prompt = `Analyze tactical breakdown and formation recommendations for team: ${teamInfo} playing against ${opponentInfo}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    res.json({ analysis: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/match/simulate', async (req, res) => {
  try {
    res.json({ 
        stats: { goals: Math.floor(Math.random() * 5), possession: "55%" },
        coachingCues: ["Keep shape", "Press high"]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/players/rankings', (req, res) => {
  res.json([
    { name: "Lionel Messi", efficiency: 98 },
    { name: "Cristiano Ronaldo", efficiency: 95 }
  ]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
