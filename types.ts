export type Nutrient = { 
  kcal: number; 
  protein_g: number; 
  carbs_g: number; 
  fat_g: number; 
  fiber_g?: number 
};

export type FoodCategory = "vegetable" | "fruit" | "dry-fruit" | "meat" | "dairy" | "grain" | "other";

export type Serving = { 
  unit: "g" | "oz" | "piece" | "cup" | "slice" | "tbsp"; 
  grams: number 
};

export type FoodItem = {
  id: string; 
  name: string; 
  category: FoodCategory;
  per100g: Nutrient;
  servings: Serving[];
  source: "LOCAL" | "GEMINI"; 
};

export type UserProfile = {
  age: number; 
  sex: "male" | "female"; 
  height_cm: number; 
  weight_kg: number;
  activity: "sedentary" | "light" | "moderate" | "very" | "extra";
};

export type UnitSystem = "metric" | "imperial";

export type Goal = { 
  mode: "lose" | "maintain" | "gain"; 
  delta_kcal_per_day: number 
};

export type MacroPlan = { 
  kcal: number; 
  protein_g: number; 
  carbs_g: number; 
  fat_g: number; 
  splitsPct: { p: number; c: number; f: number } 
};

export type BmiResult = {
  value: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
};