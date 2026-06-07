import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { word } = req.body;

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Explain the word "${word}"

Return:

1. Meaning
2. Literary meaning
3. Etymology
4. Example sentences
5. Synonyms
6. Antonyms
7. Memory trick

Use markdown.
`;

    const result = await model.generateContent(prompt);

    res.status(200).json({
      text: result.response.text()
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
