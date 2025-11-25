import React, { useState, useEffect } from 'react';
import FoodSearch from './components/FoodSearch';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import { LeafIcon, CalculatorIcon } from './components/IconComponents';

type View = 'food' | 'calculator';

const App: React.FC = () => {
  const [view, setView] = useState<View>('food');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const NavButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 rounded-lg ${
        active
          ? 'bg-indigo-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-900 font-sans">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Macro<span className="text-indigo-500">Mind</span>
          </h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <nav className="p-1.5 mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center gap-2">
          <NavButton active={view === 'food'} onClick={() => setView('food')}>
            <LeafIcon className="w-5 h-5" />
            <span>Food Lookup</span>
          </NavButton>
          <NavButton active={view === 'calculator'} onClick={() => setView('calculator')}>
            <CalculatorIcon className="w-5 h-5" />
            <span>Health Calculator</span>
          </NavButton>
        </nav>

        <main>
          {view === 'food' && <FoodSearch />}
          {view === 'calculator' && <Calculator />}
        </main>
        
        <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Disclaimer: Body-fat % is an estimate. Consult a healthcare professional for medical advice.</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} MacroMind. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;