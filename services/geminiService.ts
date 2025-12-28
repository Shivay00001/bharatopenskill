
import { GoogleGenAI, Type } from "@google/genai";

// Initialize with direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askVirtualTeacher = async (question: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context || 'General SkillBharat Course'}\nQuestion: ${question}`,
      config: {
        systemInstruction: "You are 'Bhartiya AI Guru', a virtual teacher for SkillBharat Open. Explain concepts in very simple Hinglish. Use local examples (Dukan, Auto-rickshaw, Freelancing). Keep it encouraging and practical. If someone asks about money, tell them 'Skill seekho, paisa peeche ayega'.",
        temperature: 0.8,
      },
    });
    return response.text || "Main abhi thoda confuse hoon, fir se puchiye.";
  } catch (error) {
    return "Network issues, dost. Try again later!";
  }
};

export const solveFromImage = async (base64Image: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: prompt || "Explain what is happening in this image and how to improve this work in simple Hinglish." }
        ]
      }
    });
    return response.text || "Image read nahi ho payi. Clear photo bhejiye.";
  } catch (error) {
    return "Image read nahi ho payi. Clear photo bhejiye.";
  }
};

export const generateQuizQuestions = async (courseName: string, topics: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 multiple choice questions for the course "${courseName}" covering these topics: ${topics.join(', ')}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.INTEGER, description: "Index of correct option (0-3)" },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });
    return JSON.parse(response.text || '{"questions":[]}').questions;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const generateAICertificate = async (studentName: string) => {
  try {
    const prompt = `A professional, modern, and prestigious certificate of completion for ${studentName} from 'SkillBharat Open'. 
    The certificate should clearly feature the text 'SkillBharat Open' and 'Certificate of Excellence'.
    Include a gold seal and elegant border. 
    Main text: 'This is to certify that ${studentName} has successfully mastered AI Tools for Daily Earning'.
    Aesthetic: Clean, professional, white background with indigo and gold accents. No spelling errors.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Certificate Generation Error:", error);
    return null;
  }
};
