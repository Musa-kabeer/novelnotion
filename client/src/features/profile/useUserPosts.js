import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { userPosts } from '../../services/apiPosts';
import { getCookie } from '../../hooks/useCookies';

export const useUserPosts = () => {
 const { user } = useUser();
 const cookie = getCookie('novelToken');

 const {
  isLoading,
  data: posts,
  error,
 } = useQuery({
  queryKey: ['userPosts', user?._id],
  queryFn: () => userPosts({ id: user._id, cookie }),
 });

 return { isLoading, posts, error };
};
