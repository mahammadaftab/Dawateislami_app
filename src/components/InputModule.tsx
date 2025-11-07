import React, { useState } from 'react';

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

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-grow w-full">
          <label htmlFor="durood-count" className="block text-lg font-medium text-gray-700 mb-2">
            Number of Durood
          </label>
          <input
            id="durood-count"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a positive number"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            min="1"
          />
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>
        <button
          onClick={validateAndAdd}
          className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
        >
          Add Durood
        </button>
      </div>
    </div>
  );
};

export default InputModule;