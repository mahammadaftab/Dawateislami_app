import React, { useState, useEffect } from 'react';

interface TotalCounterProps {
  totalCount: number;
}

const TotalCounter: React.FC<TotalCounterProps> = ({ totalCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg text-white relative">
      <div className="absolute top-4 right-4 text-blue-100 text-sm">
        {formatDateTime(currentTime)}
      </div>
      <div className="text-center">
        <h2 className="text-lg font-medium text-blue-100">Total Durood Count</h2>
        <div className="mt-2 text-5xl font-bold animate-pulse">
          {totalCount}
        </div>
        <div className="mt-4 text-blue-200">
          May peace and blessings be upon the Prophet Muhammad ﷺ
        </div>
      </div>
    </div>
  );
};

export default TotalCounter;