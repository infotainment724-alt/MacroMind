
import React from 'react';
import { MacroPlan, BmiResult, Goal } from '../types';

interface CalculatorResultsProps {
  results: {
    bmi: BmiResult;
    bodyFatPct: number;
    bmr: number;
    tdee: number;
    goalCalories: number;
    macros: MacroPlan;
  };
  goalMode: Goal['mode'];
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
    {children}
  </div>
);

const MacroBar: React.FC<{ plan: MacroPlan }> = ({ plan }) => {
    const { p, c, f } = plan.splitsPct;
    return (
        <div>
            <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 my-2">
                <div className="bg-sky-500" style={{ width: `${p}%` }} title={`Protein: ${p}%`}></div>
                <div className="bg-emerald-500" style={{ width: `${c}%` }} title={`Carbs: ${c}%`}></div>
                <div className="bg-amber-500" style={{ width: `${f}%` }} title={`Fat: ${f}%`}></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-sky-500 mr-1.5"></span>P: {plan.protein_g}g</div>
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>C: {plan.carbs_g}g</div>
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>F: {plan.fat_g}g</div>
            </div>
        </div>
    );
};

const CalculatorResults: React.FC<CalculatorResultsProps> = ({ results, goalMode }) => {
  const { bmi, bodyFatPct, bmr, tdee, goalCalories, macros } = results;

  const bmiColorClass = {
    'Underweight': 'text-blue-500',
    'Normal weight': 'text-green-500',
    'Overweight': 'text-yellow-500',
    'Obesity': 'text-red-500',
  }[bmi.category];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold">Your Results</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <ResultCard title="BMI">
          <p className={`text-2xl font-bold ${bmiColorClass}`}>{bmi.value}</p>
          <p className={`text-xs font-semibold ${bmiColorClass}`}>{bmi.category}</p>
        </ResultCard>
        <ResultCard title="Body Fat (Est.)">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{bodyFatPct}%</p>
        </ResultCard>
        <ResultCard title="BMR">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{bmr.toLocaleString()} <span className="text-sm font-normal">kcal/day</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Basal Metabolic Rate</p>
        </ResultCard>
        <ResultCard title="TDEE">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{tdee.toLocaleString()} <span className="text-sm font-normal">kcal/day</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance Calories</p>
        </ResultCard>
      </div>

      <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-6 rounded-lg text-center shadow-lg">
        <h3 className="text-lg font-semibold opacity-80">
            Calories to {goalMode.charAt(0).toUpperCase() + goalMode.slice(1)} Weight
        </h3>
        <p className="text-5xl font-extrabold my-2">{goalCalories.toLocaleString()}</p>
        <p className="font-medium">kcal / day</p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-2">Daily Macronutrient Target</h3>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <MacroBar plan={macros} />
        </div>
      </div>

    </div>
  );
};

export default CalculatorResults;
