import React, { useState, useMemo, useEffect } from 'react';
import { foodData } from '../data/foodData';
import { FoodItem } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import FoodCard from './FoodCard';
import { SearchIcon, SparklesIcon } from './IconComponents';
import { fetchFoodDataFromGemini } from '../services/geminiService';

const FoodSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [apiResults, setApiResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const localResults = useMemo(() => {
    if (debouncedSearchTerm.length < 2) return [];
    return foodData.filter(food =>
      food.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length < 2) {
      setApiResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const searchFoods = async () => {
      setIsLoading(true);
      setError(null);
      setSelectedFood(null);
      try {
        const results = await fetchFoodDataFromGemini(debouncedSearchTerm);
        setApiResults(results);
      } catch (e) {
        setError("Could not fetch results. Displaying local data.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    searchFoods();
  }, [debouncedSearchTerm]);

  const combinedResults = useMemo(() => {
    const apiIds = new Set(apiResults.map(r => r.name.toLowerCase()));
    const uniqueLocalResults = localResults.filter(
      r => !apiIds.has(r.name.toLowerCase())
    );
    return [...apiResults, ...uniqueLocalResults].slice(0, 10);
  }, [apiResults, localResults]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setSearchTerm('');
    setApiResults([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., 'chicken breast' or 'apple'"
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
            </div>
        )}
        {searchTerm && (combinedResults.length > 0 || error) && !isLoading && (
          <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {error && <li className="px-4 py-2 text-yellow-500">{error}</li>}
            {combinedResults.map(food => (
              <li key={`${food.id}-${food.source}`}>
                <button
                  onClick={() => handleSelectFood(food)}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors flex justify-between items-center"
                >
                  <span>{food.name}</span>
                  {food.source === 'GEMINI' && <SparklesIcon className="h-4 w-4 text-indigo-400" title="AI Sourced" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFood && (
        <div className="animate-fade-in">
          <FoodCard food={selectedFood} />
        </div>
      )}
      
      {!selectedFood && !isLoading && (
        <div className="text-center py-10 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Start searching for a food</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Nutritional information will appear here once you select an item.</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-10 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
            <div className="flex justify-center items-center gap-3">
                <SparklesIcon className="h-6 w-6 text-indigo-500" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">Searching with AI...</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;