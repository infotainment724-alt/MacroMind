
import { Nutrient, UserProfile, Goal, MacroPlan, BmiResult } from '../types';
import { ACTIVITY_MAP, WHO_BMI_CATEGORIES } from '../constants';

export const calculateBmi = (weightKg: number, heightCm: number): BmiResult => {
  if (heightCm <= 0) return { value: 0, category: 'Normal weight' };
  const heightM = heightCm / 100;
  const bmiValue = weightKg / (heightM * heightM);
  return {
    value: parseFloat(bmiValue.toFixed(1)),
    category: WHO_BMI_CATEGORIES(bmiValue),
  };
};

export const estimateBodyFatPct = (bmi: number, age: number, sex: "male" | "female"): number => {
  const sexFlag = sex === "male" ? 1 : 0;
  const bodyFat = 1.20 * bmi + 0.23 * age - 10.8 * sexFlag - 5.4;
  return parseFloat(bodyFat.toFixed(1));
};

export const calculateBmr = (userProfile: UserProfile): number => {
  const { weight_kg, height_cm, age, sex } = userProfile;
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  const bmr = sex === "male" ? base + 5 : base - 161;
  return Math.round(bmr);
};

export const calculateTdee = (bmr: number, activity: UserProfile['activity']): number => {
  return Math.round(bmr * ACTIVITY_MAP[activity]);
};

export const calculateGoalCalories = (tdee: number, goal: Goal): number => {
  const { mode, delta_kcal_per_day } = goal;
  let adjustment = 0;
  if (mode === 'lose') {
    adjustment = -delta_kcal_per_day;
  } else if (mode === 'gain') {
    adjustment = delta_kcal_per_day;
  }
  return Math.max(1200, Math.round(tdee + adjustment));
};

export const calculateMacros = (kcal: number, weightKg: number): MacroPlan => {
  const p = 30, c = 40, f = 30;
  const protein_g = Math.round((kcal * (p / 100)) / 4);
  const carbs_g = Math.round((kcal * (c / 100)) / 4);
  const fat_g = Math.round((kcal * (f / 100)) / 9);
  return { kcal, protein_g, carbs_g, fat_g, splitsPct: { p, c, f } };
};

export const nutrientsForServing = (per100g: Nutrient, grams: number): Nutrient => {
  const factor = grams / 100;
  return {
    kcal: Math.round(per100g.kcal * factor),
    protein_g: parseFloat((per100g.protein_g * factor).toFixed(1)),
    carbs_g: parseFloat((per100g.carbs_g * factor).toFixed(1)),
    fat_g: parseFloat((per100g.fat_g * factor).toFixed(1)),
    fiber_g: per100g.fiber_g != null ? parseFloat((per100g.fiber_g * factor).toFixed(1)) : undefined
  };
};
