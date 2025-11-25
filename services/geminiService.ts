import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from '../types';

const foodItemSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique ID for the food item, e.g., apple_raw.' },
    name: { type: Type.STRING, description: 'The common name of the food, e.g., "Apple, raw".' },
    category: { type: Type.STRING, description: 'One of "fruit", "vegetable", "meat", "dairy", "grain", "dry-fruit", "other".' },
    per100g: {
      type: Type.OBJECT,
      properties: {
        kcal: { type: Type.NUMBER, description: 'Calories per 100g.' },
        protein_g: { type: Type.NUMBER, description: 'Grams of protein per 100g.' },
        carbs_g: { type: Type.NUMBER, description: 'Grams of carbohydrates per 100g.' },
        fat_g: { type: Type.NUMBER, description: 'Grams of fat per 100g.' },
        fiber_g: { type: Type.NUMBER, description: 'Grams of fiber per 100g.', nullable: true },
      },
      required: ['kcal', 'protein_g', 'carbs_g', 'fat_g']
    },
    servings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          unit: { type: Type.STRING, description: 'Serving unit, e.g., "g", "piece", "cup".' },
          grams: { type: Type.NUMBER, description: 'The weight of the serving unit in grams.' },
        },
        required: ['unit', 'grams']
      }
    }
  },
  required: ['id', 'name', 'category', 'per100g', 'servings']
};

const foodResponseSchema = {
    type: Type.ARRAY,
    items: foodItemSchema,
};

let ai: GoogleGenAI;

const getAi = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    }
    return ai;
}

export async function fetchFoodDataFromGemini(query: string): Promise<FoodItem[]> {
  const ai = getAi();
  
  const prompt = `
    Provide a list of potential matches for the food query "${query}". For each match, provide detailed nutritional information.
    Return the data in a valid JSON array format adhering to the provided schema.
    Each item in the array should be an object representing a food.
    The object must contain:
    - id: A unique string identifier (e.g., "chicken_breast_cooked").
    - name: The full, descriptive name (e.g., "Chicken breast, cooked (skinless)").
    - category: One of "fruit", "vegetable", "meat", "dairy", "grain", "dry-fruit", "other".
    - per100g: An object with nutritional values per 100 grams, including "kcal", "protein_g", "carbs_g", "fat_g", and optionally "fiber_g".
    - servings: An array of common serving sizes. Each serving object should have a "unit" (e.g., "g", "oz", "piece", "cup") and its equivalent "grams". Always include a "g" unit with 100 grams.

    If you find multiple interpretations (e.g., "raw", "cooked", "dried"), provide them as separate items in the array. Return an empty array if no food is found.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: foodResponseSchema
        }
    });

    const text = response.text.trim();
    const data = JSON.parse(text);

    if (Array.isArray(data)) {
        return data.map(item => ({ ...item, source: 'GEMINI' })) as FoodItem[];
    }
    return [];

  } catch (error) {
    console.error("Error fetching food data from Gemini:", error);
    // On error, return empty array to allow fallback to local data.
    return [];
  }
}