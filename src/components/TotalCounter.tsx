import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface TotalCounterProps {
  totalCount: number;
}

const TotalCounter: React.FC<TotalCounterProps> = ({ totalCount }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [previousCount, setPreviousCount] = useState(totalCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle count change animation
  useEffect(() => {
    if (totalCount !== previousCount) {
      setPreviousCount(totalCount);
    }
  }, [totalCount, previousCount]);

  const formatDate = (date: Date): string => {
    return format(date, 'MMM d, yyyy', { locale: enUS });
  };

  const formatTime = (date: Date): string => {
    return format(date, 'h:mm:ss a', { locale: enUS });
  };

  const formatDay = (date: Date): string => {
    return format(date, 'EEEE', { locale: enUS });
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl text-white relative overflow-hidden hover-lift animate-scaleIn">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16 transition-all-medium"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12 transition-all-medium"></div>
      
      {/* Date elements */}
      <div className="absolute top-4 left-4 text-indigo-100 text-sm animate-slideInLeft">
        {formatDate(currentTime)}
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-indigo-100 text-sm animate-slideInLeft animation-delay-100">
        {formatTime(currentTime)}
      </div>
      <div className="absolute top-4 right-4 text-indigo-100 text-sm animate-slideInRight">
        {formatDay(currentTime)}
      </div>
      
      <div className="text-center pt-8 relative z-10">
        <div className="flex justify-center mb-4 animate-bounce">
          <div className="bg-white bg-opacity-20 p-3 rounded-full transition-all-medium hover:scale-110">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-indigo-100 mb-2 animate-fadeIn">Total Durood Count</h2>
        <div className="mt-2 text-5xl md:text-6xl font-bold animate-pulseGentle">
          {totalCount.toLocaleString()}
        </div>
        
        <div className="mt-6 text-indigo-200 text-sm animate-fadeIn animation-delay-300">
          May peace and blessings be upon the Prophet Muhammad ﷺ
        </div>
      </div>
    </div>
  );
};

export default TotalCounter;