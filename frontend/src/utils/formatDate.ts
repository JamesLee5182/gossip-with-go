import { formatDistanceToNow } from 'date-fns';

export const formatTime = (isoString: string) => {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
};