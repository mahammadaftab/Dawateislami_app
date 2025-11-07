export interface DuroodEntry {
  id: string;
  count: number;
  timestamp: Date;
}

export interface DailyTotal {
  date: string; // YYYY-MM-DD format
  total: number;
}