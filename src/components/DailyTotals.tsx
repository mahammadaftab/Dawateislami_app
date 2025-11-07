import React from 'react';
import type { DailyTotal } from '../types';
import { format } from 'date-fns';

interface DailyTotalsProps {
  dailyTotals: DailyTotal[];
  totalCount: number;
}

const DailyTotals: React.FC<DailyTotalsProps> = ({ dailyTotals, totalCount }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };
  
  const today = getTodayDate();
  
  // Create an array that includes today's count (if > 0) and all historical data
  const allDailyData = [
    ...(totalCount > 0 ? [{ date: today, total: totalCount }] : []),
    ...dailyTotals
  ];
  
  // Sort by date descending (newest first)
  const sortedDailyData = [...allDailyData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-fit">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Daily History</h2>
      </div>
      <div className="overflow-y-auto max-h-96">
        {sortedDailyData.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No daily history recorded yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedDailyData.map((dailyData, index) => (
              <li 
                key={`${dailyData.date}-${index}`} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    {formatDate(dailyData.date)}
                  </div>
                  <div className="font-bold text-lg text-blue-600">
                    {dailyData.total}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailyTotals;