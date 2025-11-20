import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API key missing");
      return res.status(500).json({ message: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a friendly and knowledgeable real estate assistant for Harmony Garden & Estate Development Limited in Ilamija, Ibeju-Lekki, Lagos.

      Your job is to directly answer the user's question while naturally connecting it to Harmony Garden's offerings when relevant.

      Useful Details (use only when they make sense in context):

      Flexible payment plans: 10% initial deposit, allocation at 30%, move-in at 50%

      Up to 5-year payment plans with 9.9% interest

      Estates: Lekki Aviation Town, GranVille Estate, Majestic Bay, The Parliament, Harmony Casa, Oju Alaro, Harmony Ville

      Prime Ibeju-Lekki locations

      Property prices range from ₦85M to ₦320M

      User's question: "${query}"

      Instruction:
      Respond in a natural, conversational tone (2-5 sentences).

      First, address the user's exact question.

      Then, relate your answer to a suitable Harmony Garden offering only if it fits the conversation.

      Sound genuinely helpful, not like a sales script.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return res.status(200).json({ response: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      message: 'Error processing your request',
      error: error.message
    });
  }
}
