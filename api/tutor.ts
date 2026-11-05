import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, subject, level, conversationHistory } = req.body || {};

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
        answer: 'The AI Science Tutor requires a Gemini API key. Please configure GEMINI_API_KEY in your Vercel project environment variables.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'sciverse-vercel',
        },
      },
    });

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

    let promptText = question;
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const historyContext = conversationHistory
        .slice(-4)
        .map((m: { sender: string; text: string }) => `${m.sender === 'user' ? 'Student' : 'Tutor'}: ${m.text}`)
        .join('\n');
      promptText = `Conversation history:\n${historyContext}\n\nCurrent Student Question: ${question}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'No response generated.';
    return res.status(200).json({ answer });
  } catch (error: any) {
    console.error('Error in Vercel API tutor function:', error);
    return res.status(500).json({
      error: 'Failed to generate tutor response.',
      details: error.message,
    });
  }
}

