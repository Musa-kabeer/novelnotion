import { useQuery } from '@tanstack/react-query';
import { allUsers } from '../../services/apiUsers';

export const useUsers = () => {
     const { isLoading, data: users } = useQuery({
          queryKey: ['users'],
          queryFn: () => allUsers(),
     });

     return { isLoading, users };
};
