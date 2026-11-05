import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Science Tutor API Route
app.post('/api/gemini/tutor', async (req, res) => {
  try {
    const { question, subject, level, conversationHistory } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
        answer: 'The AI Science Tutor requires a Gemini API key. Please configure GEMINI_API_KEY in your environment settings.'
      });
    }

    const systemInstruction = `You are the SciVerse AI Science Tutor, an authoritative, engaging, and scientifically accurate STEM educator embedded in the SciVerse interactive science platform.
Subject focus: ${subject || 'General Science'}
Target explanation level: ${level || 'High School / General'}.
Rules:
1. Prioritize strict scientific accuracy, empirical evidence, and conceptual clarity.
2. State assumptions and uncertainty honestly. Distinguish well-established scientific theories from open questions or hypotheses.
3. Use clear markdown formatting, bullet points, and step-by-step reasoning where helpful.
4. When relevant, cite the core equation with all variable symbols and SI units clearly identified.
5. STRICT SAFETY REQUIREMENT: Never provide operational instructions, recipes, or guides for dangerous chemical reactions, explosive materials, toxic gases, harmful voltages, or incendiary hazards. Explain the conceptual science safely.
6. Keep explanations inspiring, direct, and aligned with educational STEM discovery.`;

    // Construct prompt with history context if provided
    let promptText = question;
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const historyContext = conversationHistory
        .slice(-4)
        .map((m: { sender: string; text: string }) => `${m.sender === 'user' ? 'Student' : 'Tutor'}: ${m.text}`)
        .join('\n');
      promptText = `Conversation history:\n${historyContext}\n\nCurrent Student Question: ${question}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'No response generated.';
    return res.json({ answer });
  } catch (error: any) {
    console.error('Error generating tutor answer:', error);
    return res.status(500).json({
      error: 'Failed to generate tutor response.',
      details: error.message,
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SciVerse server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
