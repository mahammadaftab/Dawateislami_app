import React from 'react';
import type { DailyTotal } from '../types';
import { formatDailyTotalDate } from '../utils/dateFormatter';

interface DailyTotalsProps {
  dailyTotals: DailyTotal[];
  totalCount: number;
}

const DailyTotals: React.FC<DailyTotalsProps> = ({ dailyTotals, totalCount }) => {
  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };
  
  const today = getTodayDate();
  
  // Create an array that includes today's count and all historical data
  // This ensures we always show today's count even if it's zero
  const allDailyData = [
    { date: today, total: totalCount },
    ...dailyTotals
  ];
  
  // Sort by date descending (newest first)
  const sortedDailyData = [...allDailyData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <div className="rounded-xl overflow-hidden">
      {sortedDailyData.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No daily history recorded</h3>
          <p className="text-gray-500">Your daily durood counts will appear here</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedDailyData.map((dailyData, index) => (
              <div 
                key={`${dailyData.date}-${index}`} 
                className={`p-4 rounded-lg border ${
                  dailyData.date === today 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'bg-white border-gray-200'
                } hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-gray-700">
                    <div className="font-medium">{formatDailyTotalDate(dailyData.date)}</div>
                    {dailyData.date === today && (
                      <span className="inline-block mt-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xl text-indigo-600">
                    {dailyData.total.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTotals;