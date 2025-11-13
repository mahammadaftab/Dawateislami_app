import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DuroodEntry, DailyTotal } from '../types';

interface DuroodState {
  totalCount: number;
  lifetimeTotal: number;
  history: DuroodEntry[];
  dailyTotals: DailyTotal[];
  lastResetDate: string;
  addDurood: (count: number) => void;
  editDurood: (id: string, newCount: number) => void;
  reset: () => void;
  checkAndResetDaily: () => void;
}

// Get the last reset date based on Indian time (6:00 AM IST)
const getLastResetDate = (): string => {
  const now = new Date();
  // Convert to Indian time (UTC+5:30)
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  
  // If current IST time is before 6:00 AM, consider previous day as last reset date
  if (istTime.getHours() < 6) {
    const yesterday = new Date(istTime);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
  
  return istTime.toISOString().split('T')[0];
};

// Check if we should reset based on Indian time (6:00 AM IST)
const shouldReset = (lastResetDate: string): boolean => {
  const today = getLastResetDate();
  return today !== lastResetDate;
};

export const useDuroodStore = create<DuroodState>()(
  persist(
    (set, get) => ({
      totalCount: 0,
      lifetimeTotal: 0,
      history: [],
      dailyTotals: [],
      lastResetDate: getLastResetDate(),
      
      checkAndResetDaily: () => {
        const { lastResetDate, totalCount, dailyTotals } = get();
        
        if (shouldReset(lastResetDate)) {
          const today = getLastResetDate();
          
          // Save previous day's total to history
          // This ensures we store data for every day the app was used
          const updatedDailyTotals = [
            { date: lastResetDate, total: totalCount },
            ...dailyTotals
          ];
          
          set({
            totalCount: 0,
            lastResetDate: today,
            dailyTotals: updatedDailyTotals,
            history: [] // Clear today's history for the new day
          });
        }
      },
      
      addDurood: (count: number) => {
        // Check if we need to reset for a new day (lazy rollover)
        get().checkAndResetDaily();
        
        set((state) => {
          const newEntry: DuroodEntry = {
            id: crypto.randomUUID(),
            count,
            timestamp: new Date(),
          };
          
          return {
            totalCount: state.totalCount + count,
            lifetimeTotal: state.lifetimeTotal + count,
            history: [newEntry, ...state.history],
          };
        });
      },
      
      editDurood: (id: string, newCount: number) => {
        // Check if we need to reset for a new day (lazy rollover)
        get().checkAndResetDaily();
        
        set((state) => {
          const entryToUpdate = state.history.find(entry => entry.id === id);
          if (!entryToUpdate) return state;
          
          const countDifference = newCount - entryToUpdate.count;
          
          // Update the entry
          const updatedHistory = state.history.map(entry => 
            entry.id === id 
              ? { ...entry, count: newCount } 
              : entry
          );
          
          return {
            totalCount: state.totalCount + countDifference,
            lifetimeTotal: state.lifetimeTotal + countDifference,
            history: updatedHistory,
          };
        });
      },
      
      reset: () => set({ 
        totalCount: 0, 
        history: [], 
        dailyTotals: [], 
        lastResetDate: getLastResetDate(),
        // Note: We don't reset lifetimeTotal here as it's a lifetime counter
      }),
    }),
    {
      name: 'durood-storage',
      onRehydrateStorage: () => (state) => {
        // Check if we need to reset when the app loads (lazy rollover)
        if (state) {
          state.checkAndResetDaily();
        }
      }
    }
  )
);