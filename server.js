import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/generate", async (req, res) => {
  try {
    const { name, role, company, skills } = req.body;

    if (![name, role, company, skills].every(
      value => typeof value === "string" && value.trim()
    )) {
      return res.status(400).json({
        error: "Please fill in all fields."
      });
    }

    
    const prompt = `Write a professional cover letter using only the details provided below.

Candidate Name: ${name}
Job Role: ${role}
Target Company: ${company}
Key Skills: ${skills}

Instructions:
- Start directly with "Dear Hiring Manager,"
- Write 2-3 concise, well-organized paragraphs.
- Explain the candidate's interest in the role and how the listed skills are relevant.
- Do not invent qualifications, experience, achievements, or personal information.
- Do not include contact details, addresses, headings, or placeholders such as [Contact Information].
- Do not repeat the candidate's name at the beginning.
- End with "Sincerely," followed by the candidate's name.
- Return only the cover letter.
- Use blank lines between paragraphs.`;

    const response = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    res.json({ coverLetter: response.output_text });
  } catch (error) {
    console.error("Generation error:", error.message);
    res.status(500).json({
      error: "Could not generate the cover letter. Please try again."
    });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
