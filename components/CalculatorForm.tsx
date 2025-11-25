
import React, { useState, useEffect } from 'react';
import { UserProfile, UnitSystem, Goal } from '../types';
import { ACTIVITY_LABELS } from '../constants';
import UnitSwitch from './UnitSwitch';

interface CalculatorFormProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  unitSystem: UnitSystem;
  setUnitSystem: React.Dispatch<React.SetStateAction<UnitSystem>>;
  goal: Goal;
  setGoal: React.Dispatch<React.SetStateAction<Goal>>;
}

const KG_TO_LBS = 2.20462;
const CM_TO_IN = 0.393701;

const InputField: React.FC<{ label: string, id: string, children: React.ReactNode }> = ({ label, id, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="mt-1">{children}</div>
    </div>
);

const CalculatorForm: React.FC<CalculatorFormProps> = ({ userProfile, setUserProfile, unitSystem, setUnitSystem, goal, setGoal }) => {
  const [displayWeight, setDisplayWeight] = useState(unitSystem === 'metric' ? userProfile.weight_kg.toString() : (userProfile.weight_kg * KG_TO_LBS).toFixed(1));
  const [displayHeight, setDisplayHeight] = useState(unitSystem === 'metric' ? userProfile.height_cm.toString() : (userProfile.height_cm * CM_TO_IN).toFixed(1));

  useEffect(() => {
    if (unitSystem === 'metric') {
      setDisplayWeight(userProfile.weight_kg.toString());
      setDisplayHeight(userProfile.height_cm.toString());
    } else {
      setDisplayWeight((userProfile.weight_kg * KG_TO_LBS).toFixed(1));
      setDisplayHeight((userProfile.height_cm * CM_TO_IN).toFixed(1));
    }
  }, [unitSystem, userProfile.weight_kg, userProfile.height_cm]);


  const handleProfileChange = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayWeight(val);
    const numericVal = parseFloat(val);
    if (!isNaN(numericVal)) {
      const weight_kg = unitSystem === 'metric' ? numericVal : numericVal / KG_TO_LBS;
      handleProfileChange('weight_kg', weight_kg);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayHeight(val);
    const numericVal = parseFloat(val);
    if (!isNaN(numericVal)) {
      const height_cm = unitSystem === 'metric' ? numericVal : numericVal / CM_TO_IN;
      handleProfileChange('height_cm', height_cm);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Profile</h2>
        <UnitSwitch unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField label="Age" id="age">
            <input type="number" id="age" value={userProfile.age} onChange={(e) => handleProfileChange('age', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </InputField>

        <InputField label="Sex" id="sex">
            <select id="sex" value={userProfile.sex} onChange={(e) => handleProfileChange('sex', e.target.value as 'male' | 'female')} className="w-full pl-3 pr-8 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </InputField>

         <InputField label={`Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`} id="weight">
            <input type="number" id="weight" value={displayWeight} onChange={handleWeightChange} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </InputField>

         <InputField label={`Height (${unitSystem === 'metric' ? 'cm' : 'in'})`} id="height">
            <input type="number" id="height" value={displayHeight} onChange={handleHeightChange} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </InputField>
      </div>

      <InputField label="Activity Level" id="activity">
          <select id="activity" value={userProfile.activity} onChange={(e) => handleProfileChange('activity', e.target.value as UserProfile['activity'])} className="w-full pl-3 pr-8 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
              ))}
          </select>
      </InputField>
      
      <div>
        <h3 className="text-lg font-bold mb-3">Goal</h3>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
          {(['lose', 'maintain', 'gain'] as Goal['mode'][]).map(mode => (
            <button key={mode} onClick={() => setGoal(g => ({...g, mode}))} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${goal.mode === mode ? 'bg-indigo-600 text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {goal.mode !== 'maintain' && (
        <div className="animate-fade-in">
          <label htmlFor="kcal-delta" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Daily Calorie {goal.mode === 'lose' ? 'Deficit' : 'Surplus'}: 
            <span className="font-bold text-indigo-600 dark:text-indigo-400"> {goal.delta_kcal_per_day} kcal</span>
          </label>
          <input
            id="kcal-delta"
            type="range"
            min={250}
            max={goal.mode === 'lose' ? 750 : 500}
            step={50}
            value={goal.delta_kcal_per_day}
            onChange={(e) => setGoal(g => ({...g, delta_kcal_per_day: parseInt(e.target.value)}))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2 accent-indigo-600"
          />
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
