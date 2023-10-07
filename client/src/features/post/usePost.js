import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getPost } from '../../services/apiPosts';
import { getCookie } from '../../hooks/useCookies';

export const usePost = () => {
 const { id } = useParams();
 const cookie = getCookie('novelToken');

 const {
  isLoading,
  data: post,
  error,
 } = useQuery({
  queryKey: ['post', id],
  queryFn: () => getPost({ id, cookie }),
 });

 return { isLoading, post, error };
};
