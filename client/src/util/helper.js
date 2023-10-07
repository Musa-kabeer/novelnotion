import { format, parseISO } from 'date-fns';

export const formatDate = (date, pattern) => {
	return format(parseISO(date), pattern);
};
