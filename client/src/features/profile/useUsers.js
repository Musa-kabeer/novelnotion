import { useQuery } from '@tanstack/react-query';
import { allUsers } from '../../services/apiUsers';
import { getCookie } from '../../hooks/useCookies';

export const useUsers = () => {
 const cookie = getCookie('novelToken');

 const {
  isLoading,
  data: users,
  error,
 } = useQuery({
  queryKey: ['users'],
  queryFn: () => allUsers(cookie),
 });

 return { isLoading, users, error };
};
