import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getRelatedPost } from '../../services/apiPosts';
import { getCookie } from '../../hooks/useCookies';

export const useRelatedPost = (category) => {
 const { id } = useParams();
 const cookie = getCookie('novelToken');

 const { isLoading, data: relatedPost } = useQuery({
  queryKey: ['relatedPost', id],
  queryFn: () => getRelatedPost({ id, category, cookie }),
 });

 return { isLoading, relatedPost };
};
