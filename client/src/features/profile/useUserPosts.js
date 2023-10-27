import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { userPosts } from '../../services/apiPosts';

export const useUserPosts = () => {
     const { user } = useUser();

     const { isLoading, data: posts } = useQuery({
          queryKey: ['userPosts', user?._id],
          queryFn: () => userPosts(user._id),
     });

     return { isLoading, posts };
};
