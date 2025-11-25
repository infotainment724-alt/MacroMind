
import React from 'react';
import { UnitSystem } from '../types';

interface UnitSwitchProps {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
}

const UnitSwitch: React.FC<UnitSwitchProps> = ({ unitSystem, setUnitSystem }) => {
  const isMetric = unitSystem === 'metric';

  const toggle = () => {
    setUnitSystem(isMetric ? 'imperial' : 'metric');
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <span className={!isMetric ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}>Imperial</span>
      <button
        onClick={toggle}
        type="button"
        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 ${
          isMetric ? 'bg-indigo-600' : 'bg-gray-400 dark:bg-gray-600'
        }`}
        role="switch"
        aria-checked={isMetric}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
            isMetric ? 'translate-x-5' : 'translate-x-0'
          }`}
        ></span>
      </button>
      <span className={isMetric ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}>Metric</span>
    </div>
  );
};

export default UnitSwitch;
