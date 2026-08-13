import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3011;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Rate Limiting Headers Middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60;

app.use((req, res, next) => {
  const ip = req.ip || "127.0.0.1";
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  res.setHeader("X-RateLimit-Limit", MAX_REQUESTS.toString());
  res.setHeader("X-RateLimit-Remaining", Math.max(0, MAX_REQUESTS - record.count).toString());
  res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000).toString());

  next();
});

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

// GET /api/health
app.get('/api/health', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  res.json({
    status: 'ok',
    service: 'soccer-ai-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    geminiConfigured: Boolean(apiKey && apiKey !== "your_gemini_api_key_here")
  });
});

// POST /api/gemini/ask
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { prompt, model = 'gemini-2.5-flash', systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: "Bad Request",
        message: "The 'prompt' field is required in request body."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({
        success: true,
        response: `[Soccer AI Fallback Mode] Gemini API key not configured. Tactical query: "${prompt}"`,
        fallback: true,
        model
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: model || 'gemini-2.5-flash',
      contents: prompt,
      ...(systemInstruction ? { config: { systemInstruction } } : {})
    });

    return res.json({
      success: true,
      response: response.text || "",
      fallback: false,
      model: model || 'gemini-2.5-flash'
    });
  } catch (error: any) {
    console.error("Soccer AI Gemini error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Tactical AI calculation failed",
      fallback: true
    });
  }
});

// POST /api/tactics/analyze
app.post('/api/tactics/analyze', async (req, res) => {
  try {
    const { teamInfo, opponentInfo } = req.body;
    if (!teamInfo || !opponentInfo) {
      return res.status(400).json({ error: "teamInfo and opponentInfo are required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({
        analysis: `Fallback analysis: 4-3-3 formation recommended for ${teamInfo} against ${opponentInfo}. Focus on counter-attacks and wing progression.`,
        fallback: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze tactical breakdown and formation recommendations for team: ${teamInfo} playing against ${opponentInfo}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    return res.json({ analysis: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, fallback: true });
  }
});

// POST /api/match/simulate
app.post('/api/match/simulate', async (req, res) => {
  try {
    res.json({
      stats: { goals: Math.floor(Math.random() * 5), possession: "55%" },
      coachingCues: ["Keep defensive compactness", "High intensity pressing"]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/players/rankings
app.get('/api/players/rankings', (req, res) => {
  res.json([
    { name: "Lionel Messi", efficiency: 98 },
    { name: "Cristiano Ronaldo", efficiency: 95 },
    { name: "Kylian Mbappé", efficiency: 94 },
    { name: "Erling Haaland", efficiency: 93 }
  ]);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Soccer Server running on port ${port}`);
  });
}
