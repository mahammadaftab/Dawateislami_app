import React, { useEffect } from 'react';
import InputModule from './components/InputModule';
import HistoryLog from './components/HistoryLog';
import TotalCounter from './components/TotalCounter';
import DailyTotals from './components/DailyTotals';
import { useDuroodStore } from './hooks/useDuroodStore';

const App = () => {
  const { totalCount, history, dailyTotals, addDurood, editDurood, checkAndResetDaily } = useDuroodStore();
  
  // Check for daily reset when the app loads
  useEffect(() => {
    checkAndResetDaily();
    
    // Check for daily reset every minute
    const interval = setInterval(() => {
      checkAndResetDaily();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [checkAndResetDaily]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dawat-e-Islami Durood Counter</h1>
          <p className="text-lg text-gray-600">Keep track of your durood recitations</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DailyTotals dailyTotals={dailyTotals} totalCount={totalCount} />
          </div>
          
          <div className="lg:col-span-2">
            <TotalCounter totalCount={totalCount} />
            <InputModule onAdd={addDurood} />
            <HistoryLog history={history} onEdit={editDurood} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
