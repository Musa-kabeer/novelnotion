import { useQuery } from '@tanstack/react-query';
import { allPosts } from '../../services/apiPosts';
import { useSearchParams } from 'react-router-dom';
import { getCookie } from '../../hooks/useCookies';

export const usePosts = () => {
 const [searchParams] = useSearchParams();
 const page = searchParams.get('page') || 1;
 const cookie = getCookie('novelToken');

 const {
  isLoading,
  data: posts,
  error,
 } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => allPosts({ page, cookie }),
 });

 return { isLoading, posts, error };
};
