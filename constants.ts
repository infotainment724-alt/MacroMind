
import { BmiResult } from './types';

export const ACTIVITY_MAP: { [key: string]: number } = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9
};

export const ACTIVITY_LABELS: { [key: string]: string } = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (light exercise/sports 1-3 days/week)",
  moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
  very: "Very active (hard exercise/sports 6-7 days a week)",
  extra: "Extra active (very hard exercise/physical job)",
};

export const WHO_BMI_CATEGORIES = (bmi: number): BmiResult['category'] => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
  if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
  return 'Obesity';
};
