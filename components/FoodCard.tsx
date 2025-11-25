import React, { useState, useMemo } from 'react';
import { FoodItem, Nutrient, Serving } from '../types';
import { nutrientsForServing } from '../utils/calculations';
import { SparklesIcon } from './IconComponents';

interface FoodCardProps {
  food: FoodItem;
}

const NutrientRow: React.FC<{ label: string; value?: number; unit: string, isSub?: boolean }> = ({ label, value, unit, isSub = false }) => (
  <div className={`flex justify-between py-2 ${isSub ? 'pl-4 text-sm' : 'border-t border-gray-200 dark:border-gray-700'}`}>
    <span className={`font-medium ${isSub ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{label}</span>
    <span className="text-gray-600 dark:text-gray-300">{value?.toLocaleString() || '-'} {unit}</span>
  </div>
);


const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedServing, setSelectedServing] = useState<Serving>(food.servings[0]);

  const totalGrams = useMemo(() => {
    return selectedServing.grams * quantity;
  }, [selectedServing, quantity]);

  const displayedNutrients = useMemo(() => {
    return nutrientsForServing(food.per100g, totalGrams);
  }, [food.per100g, totalGrams]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setQuantity(isNaN(val) || val < 0 ? 0 : val);
  };

  const handleServingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serving = food.servings.find(s => s.unit === e.target.value);
    if (serving) {
      setSelectedServing(serving);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">{food.name}</h2>
        {food.source === 'GEMINI' && (
            <span className="flex-shrink-0 flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                <SparklesIcon className="w-3 h-3" />
                AI Sourced
            </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            step="0.1"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="serving" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Serving</label>
          <select
            id="serving"
            value={selectedServing.unit}
            onChange={handleServingChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {food.servings.map(s => (
              <option key={s.unit} value={s.unit}>
                {s.unit} ({s.grams}g)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Nutritional Value
            </h3>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Weight: {totalGrams.toFixed(1)}g
            </span>
        </div>
        <div>
          <div className="flex justify-between py-3">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Calories</span>
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{displayedNutrients.kcal.toLocaleString()} kcal</span>
          </div>
          <NutrientRow label="Protein" value={displayedNutrients.protein_g} unit="g" />
          <NutrientRow label="Carbohydrates" value={displayedNutrients.carbs_g} unit="g" />
          {displayedNutrients.fiber_g !== undefined && <NutrientRow label="Fiber" value={displayedNutrients.fiber_g} unit="g" isSub={true} />}
          <NutrientRow label="Fat" value={displayedNutrients.fat_g} unit="g" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;