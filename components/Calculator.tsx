
import React, { useState, useMemo } from 'react';
import { UserProfile, UnitSystem, Goal, MacroPlan, BmiResult } from '../types';
import {
  calculateBmi,
  estimateBodyFatPct,
  calculateBmr,
  calculateTdee,
  calculateGoalCalories,
  calculateMacros
} from '../utils/calculations';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';

const Calculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    sex: 'male',
    height_cm: 175,
    weight_kg: 70,
    activity: 'moderate',
  });
  const [goal, setGoal] = useState<Goal>({
    mode: 'maintain',
    delta_kcal_per_day: 500
  });

  const results = useMemo(() => {
    const bmiResult = calculateBmi(userProfile.weight_kg, userProfile.height_cm);
    const bodyFatPct = estimateBodyFatPct(bmiResult.value, userProfile.age, userProfile.sex);
    const bmr = calculateBmr(userProfile);
    const tdee = calculateTdee(bmr, userProfile.activity);
    const goalCalories = calculateGoalCalories(tdee, goal);
    const macroPlan = calculateMacros(goalCalories, userProfile.weight_kg);

    return {
      bmi: bmiResult,
      bodyFatPct,
      bmr,
      tdee,
      goalCalories,
      macros: macroPlan,
    };
  }, [userProfile, goal]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <CalculatorForm
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        goal={goal}
        setGoal={setGoal}
      />
      <CalculatorResults results={results} goalMode={goal.mode} />
    </div>
  );
};

export default Calculator;
