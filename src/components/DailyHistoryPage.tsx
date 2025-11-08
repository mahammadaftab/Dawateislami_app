import { useState } from 'react';
import { useDuroodStore } from '../hooks/useDuroodStore';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const DailyHistoryPage: React.FC = () => {
  const { dailyTotals, totalCount } = useDuroodStore();
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'count'>('date');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Get today's date
  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const today = getTodayDate();

  // Create an array that includes today's count and all historical data
  const allDailyData = [
    { date: today, total: totalCount },
    ...dailyTotals
  ];

  // Filter data based on time range
  const filteredData = allDailyData.filter(item => {
    if (timeRange === 'all') return true;
    
    const itemDate = new Date(item.date);
    const now = new Date();
    
    if (timeRange === '7days') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      return itemDate >= sevenDaysAgo;
    }
    
    if (timeRange === '30days') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      return itemDate >= thirtyDaysAgo;
    }
    
    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    } else {
      return sortOrder === 'desc' ? b.total - a.total : a.total - b.total;
    }
  });

  // Calculate statistics
  const totalEntries = sortedData.length;
  const highestCount = sortedData.length > 0 ? Math.max(...sortedData.map(d => d.total)) : 0;
  const averageCount = sortedData.length > 0 ? 
    Math.round(sortedData.reduce((sum, item) => sum + item.total, 0) / sortedData.length) : 0;

  // Check if date is today
  const isToday = (dateString: string): boolean => {
    return dateString === today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-slideInLeft">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg transition-all-medium hover:scale-105">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Daily History Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your spiritual journey with detailed insights into your daily Durood practice
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift animate-slideInLeft animation-delay-100">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift animate-slideInLeft animation-delay-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Highest Count</p>
                <p className="text-2xl font-bold text-gray-900">{highestCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift animate-slideInLeft animation-delay-300">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Count</p>
                <p className="text-2xl font-bold text-gray-900">{averageCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-slideInRight animation-delay-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-800">Daily History</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Time Range:</span>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all-medium"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all-medium"
                >
                  <option value="date">Date</option>
                  <option value="count">Count</option>
                </select>
                
                <button 
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all-medium transform hover:scale-105"
                >
                  {sortOrder === 'desc' ? (
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualization */}
        {sortedData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100 animate-fadeIn">
            <div className="bg-gray-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No daily history recorded</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Your daily durood counts will appear here once you start tracking your spiritual journey.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-scaleIn animation-delay-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durood Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedData.map((dailyData, index) => {
                    const dateObj = new Date(dailyData.date);
                    const dayName = format(dateObj, 'EEEE', { locale: enUS });
                    
                    return (
                      <tr 
                        key={`${dailyData.date}-${index}`} 
                        className={`hover:bg-gray-50 transition-colors duration-150 animate-staggeredFadeIn ${
                          isToday(dailyData.date) ? 'bg-indigo-50' : ''
                        }`}
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {format(dateObj, 'MMM d, yyyy', { locale: enUS })}
                          </div>
                          {isToday(dailyData.date) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                              Today
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dayName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-indigo-600">
                            {dailyData.total.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 animate-fadeIn animation-delay-500">
          <p className="mb-2">May peace and blessings be upon the Prophet Muhammad ﷺ</p>
          <p className="text-sm">Powered by Dawat-e-Islami</p>
        </div>
      </div>
    </div>
  );
};

export default DailyHistoryPage;