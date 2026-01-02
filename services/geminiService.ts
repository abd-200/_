
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Strictly follow initialization guideline by using the API key exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (prompt: string, history: {role: string, parts: {text: string}[]}[] = [], attachment?: {data: string, mimeType: string}) => {
  const parts: any[] = [{ text: prompt }];
  
  if (attachment) {
    parts.unshift({
      inlineData: {
        data: attachment.data,
        mimeType: attachment.mimeType
      }
    });
  }

  // Fix: Directly call generateContent and use the .text property from GenerateContentResponse
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts }],
    config: {
      systemInstruction: `أنت المساعد الذكي المتقدم لغرفة تجارة عجلون. 
      مهمتك:
      1. تقديم الدعم الفني الفوري للتجار.
      2. تحليل الوثائق المرفوعة (OCR) وشرح محتواها القانوني أو التجاري.
      3. الإجابة على استفسارات القوانين والأنظمة التجارية الأردنية.
      4. المساعدة في حجز القاعات والخدمات.
      
      اجعل إجاباتك مهنية، دقيقة، باللغة العربية، وادعم قراراتك بالنصوص القانونية إذا لزم الأمر.`
    }
  });
  
  return response.text;
};

export const analyzeMarketData = async (data: any) => {
  // Fix: Directly call generateContent with schema configuration and use .text property
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `حلل هذه البيانات التجارية لقطاعات عجلون وقدم توصيات استراتيجية: ${JSON.stringify(data)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          topPerformingSector: { type: Type.STRING },
          growthOpportunity: { type: Type.STRING },
          recommendations: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "topPerformingSector", "growthOpportunity", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
