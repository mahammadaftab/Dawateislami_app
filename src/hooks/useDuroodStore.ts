import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DuroodEntry, DailyTotal } from '../types';

interface DuroodState {
  totalCount: number;
  history: DuroodEntry[];
  dailyTotals: DailyTotal[];
  lastResetDate: string;
  addDurood: (count: number) => void;
  editDurood: (id: string, newCount: number) => void;
  reset: () => void;
  checkAndResetDaily: () => void;
}

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const useDuroodStore = create<DuroodState>()(
  persist(
    (set, get) => ({
      totalCount: 0,
      history: [],
      dailyTotals: [],
      lastResetDate: getTodayDate(),
      
      checkAndResetDaily: () => {
        const today = getTodayDate();
        const { lastResetDate, totalCount, dailyTotals, history } = get();
        
        if (today !== lastResetDate) {
          // Save previous day's total only if there were entries
          if (totalCount > 0 || history.length > 0) {
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
          } else {
            set({ lastResetDate: today });
          }
        }
      },
      
      addDurood: (count: number) => {
        // Check if we need to reset for a new day
        get().checkAndResetDaily();
        
        set((state) => {
          const newEntry: DuroodEntry = {
            id: crypto.randomUUID(),
            count,
            timestamp: new Date(),
          };
          
          return {
            totalCount: state.totalCount + count,
            history: [newEntry, ...state.history],
          };
        });
      },
      
      editDurood: (id: string, newCount: number) => {
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
            history: updatedHistory,
          };
        });
      },
      
      reset: () => set({ totalCount: 0, history: [], dailyTotals: [], lastResetDate: getTodayDate() }),
    }),
    {
      name: 'durood-storage',
      onRehydrateStorage: () => (state) => {
        // Check if we need to reset when the app loads
        if (state) {
          state.checkAndResetDaily();
        }
      }
    }
  )
);