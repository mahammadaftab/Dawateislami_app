import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDuroodTimestamp = (date: Date): string => {
  return format(date, 'MMM d, yyyy EEEE h:mm a', { locale: enUS });
};

export const formatDailyTotalDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy EEEE', { locale: enUS });
};