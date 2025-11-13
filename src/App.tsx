import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputModule from './components/InputModule';
import HistoryLog from './components/HistoryLog';
import TotalCounter from './components/TotalCounter';
import DailyHistoryPage from './components/DailyHistoryPage';
import Navbar from './components/Navbar';
import { useDuroodStore } from './hooks/useDuroodStore';

const App = () => {
  const { totalCount, lifetimeTotal, history, addDurood, editDurood, checkAndResetDaily, reset } = useDuroodStore();
  
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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="pt-20 py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 animate-slideInLeft">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Dawat-e-Islami Durood Counter</h1>
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Track your spiritual journey with our advanced Durood counter. 
                    Join millions in spreading peace and blessings.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 animate-slideInLeft animation-delay-100">
                    <TotalCounter totalCount={totalCount} onAdd={addDurood} onReset={reset} />
                    <InputModule onAdd={addDurood} />
                  </div>
                  
                  <div className="space-y-8 animate-slideInRight animation-delay-200">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 ml-3">Today's Count</h2>
                      </div>
                      <div className="text-center py-4">
                        <p className="text-3xl font-bold text-indigo-600 animate-pulseGentle">{totalCount}</p>
                        <p className="text-gray-600 mt-2">Duroods recited today</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 ml-3">Spiritual Goal</h2>
                      </div>
                      <div className="text-center py-4">
                        <p className="text-2xl font-bold text-green-600">15,000 Crore</p>
                        <p className="text-gray-600 mt-2">Target Durood Shareef</p>
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full transition-all-medium" 
                            style={{ width: `${Math.min(100, (lifetimeTotal / 15000000000) * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {((lifetimeTotal / 15000000000) * 100).toFixed(6)}% of lifetime goal achieved
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Lifetime Total: {lifetimeTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 animate-scaleIn animation-delay-300">
                  <HistoryLog history={history} onEdit={editDurood} />
                </div>
                
                <div className="mt-12 text-center text-gray-600 animate-fadeIn animation-delay-500">
                  <p className="mb-2">May peace and blessings be upon the Prophet Muhammad ﷺ</p>
                  <p className="text-sm">Powered by Dawat-e-Islami India</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/daily-history" element={
            <div className="pt-20 animate-fadeIn">
              <DailyHistoryPage />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;