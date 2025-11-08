import { useState } from 'react';

interface InputModuleProps {
  onAdd: (count: number) => void;
}

const InputModule: React.FC<InputModuleProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateAndAdd = () => {
    const numValue = parseInt(inputValue, 10);
    
    if (isNaN(numValue) || numValue <= 0) {
      setError('Please enter a valid positive number');
      return;
    }
    
    setError('');
    onAdd(numValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndAdd();
    }
  };

  // Quick add buttons
  const quickAdd = (amount: number) => {
    onAdd(amount);
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover-lift animate-scaleIn">
      <div className="mb-6 animate-slideInLeft">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Add Durood Count</h2>
        <p className="text-gray-600">Enter the number of Durood you've recited or use quick buttons</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 animate-slideInLeft animation-delay-100">
        <div className="flex-grow w-full">
          <label htmlFor="durood-count" className="block text-lg font-medium text-gray-700 mb-2">
            Number of Durood
          </label>
          <div className="relative">
            <input
              id="durood-count"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a positive number"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all-medium"
              min="1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm animate-fadeIn">{error}</p>}
        </div>
        <button
          onClick={validateAndAdd}
          className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all-medium transform hover:scale-105"
        >
          Add Durood
        </button>
      </div>
      
      {/* Quick add buttons */}
      <div className="border-t border-gray-200 pt-6 animate-slideInLeft animation-delay-200">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Quick Add</h3>
        <div className="flex flex-wrap gap-3">
          {[1, 10, 50, 100, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => quickAdd(amount)}
              className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-800 hover:text-indigo-700 font-medium rounded-lg transition-all-medium transform hover:scale-105"
            >
              +{amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputModule;