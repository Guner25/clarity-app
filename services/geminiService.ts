import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClarityAnalysis, CategoryType } from "../types";

const SYSTEM_INSTRUCTION = `
Sen Türkçe çalışan bir “Problem Netleştirme Motoru”sun.
Bu uygulamanın tek amacı: Kullanıcının yaşadığı durumu NETLEŞTİRMEK.
Bu bir terapi, motivasyon veya koçluk uygulaması değildir.
Tanı koyma, tavsiye verme, çözüm önerme.

SENİN İŞİN: Kullanıcının anlattığı karmaşık durumu, sade, anlaşılır ve yargısız bir problem tanımına dönüştürmek.

GENEL DAVRANIŞ KURALLARI:
- Tüm yanıtlar TÜRKÇE olacak.
- Dil sade, net ve insani olacak.
- Asla üstten konuşma, etiketleme yapma.
- Klinik terimler kullanma.

ÇIKTI FORMATI:
Senden JSON istendiğinde sadece JSON döndür. Markdown bloğu kullanma.
`;

const QUESTION_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "Kullanıcıya sorulacak tek, kısa, net ve açık uçlu soru.",
    },
  },
  required: ["question"],
};

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    shortDefinition: {
      type: Type.STRING,
      description: "2-3 cümle, net, etiketlemeden. 'Bu durum...' diye başlayabilir.",
    },
    probableFactors: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 ila 5 madde. 'Muhtemel', 'görünüyor' gibi yumuşak ifadeler.",
    },
    whatItIsNot: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-4 madde. Rahatlatıcı ama kesin. Örn: 'Bu bir tembellik değil'.",
    },
  },
  required: ["shortDefinition", "probableFactors", "whatItIsNot"],
};

class GeminiService {
  private ai: GoogleGenAI;
  private modelId = "gemini-3-flash-preview"; 

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  // Helper to safely parse JSON response even if wrapped in markdown
  private parseResponse(text: string): any {
    try {
      let cleanText = text.trim();
      // Remove ```json and ``` wrap if exists
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/^```json/, "").replace(/```$/, "");
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```/, "").replace(/```$/, "");
      }
      return JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      throw e;
    }
  }

  // Step 1: Generate a clarification question based on initial input and category
  async generateQuestion(initialInput: string, category: CategoryType): Promise<string> {
    try {
      const prompt = `
        Kullanıcı Girdisi: "${initialInput}"
        Kategori: "${category}"

        Görev: Bu problemi parçalara ayırmak ve daha iyi anlamak için kullanıcıya tek bir, kısa, net ve açık uçlu soru sor.
        Süre, etkilenen alan, baskın his veya tekrar durumu hakkında olabilir.
        Asla çözüm sorma. Sadece netleştirmeye yönelik bir soru sor.
      `;

      const response = await this.ai.models.generateContent({
        model: this.modelId,
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: QUESTION_SCHEMA
        }
      });

      if (response.text) {
        const parsed = this.parseResponse(response.text);
        return parsed.question;
      }
      return "Bu durumun seni en çok hangi anlarda zorladığını biraz daha açabilir misin?";
    } catch (error) {
      console.error("Error generating question:", error);
      return "Bu durumun hayatını nasıl etkilediği hakkında biraz daha detay verebilir misin?";
    }
  }

  // Step 2: Generate final analysis
  async generateAnalysis(initialInput: string, category: CategoryType, aiQuestion: string, userAnswer: string): Promise<ClarityAnalysis> {
    try {
      const prompt = `
        Kullanıcı Girdisi: "${initialInput}"
        Seçilen Kategori: "${category}"
        Netleştirme Sorusu: "${aiQuestion}"
        Kullanıcı Cevabı: "${userAnswer}"

        Görev: Tüm bu verileri birleştir ve JSON formatında bir netlik analizi oluştur.
      `;

      const response = await this.ai.models.generateContent({
        model: this.modelId,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: ANALYSIS_SCHEMA,
        },
      });

      if (response.text) {
        return this.parseResponse(response.text) as ClarityAnalysis;
      }
      throw new Error("Empty response");
    } catch (error) {
      console.error("Analysis generation error:", error);
      return {
        shortDefinition: "Verilen bilgiler ışığında durumu tam netleştiremedik, ancak bir belirsizlik döngüsü olduğu görülüyor.",
        probableFactors: ["İletişim kopukluğu", "Beklentilerin uyuşmazlığı", "Zaman baskısı"],
        whatItIsNot: ["Bu senin hatan değil", "Bu çözümsüz değil"]
      };
    }
  }

  // Step 3: Generate shareable text
  async generateShareableText(analysis: ClarityAnalysis): Promise<string> {
      try {
        const prompt = `
            Analiz Sonucu: ${JSON.stringify(analysis)}

            Görev: Kullanıcının bu durumu bir başkasına anlatması için tek paragraflık, günlük, doğal, profesyonel ama insani bir özet yaz.
            Tavsiye veya çözüm içermesin. Sadece durumu özetle.
        `;

        const response = await this.ai.models.generateContent({
            model: this.modelId,
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });
        return response.text || "Özet oluşturulamadı.";
      } catch (error) {
          return "Durumu özetlerken bir hata oluştu.";
      }
  }
}

export const geminiService = new GeminiService();