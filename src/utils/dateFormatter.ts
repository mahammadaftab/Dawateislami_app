import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDuroodTimestamp = (date: Date): string => {
  return format(date, 'MMM d, yyyy, h:mm a', { locale: enUS });
};