import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getRelatedPost } from '../../services/apiPosts';

export const useRelatedPost = (category) => {
     const { id } = useParams();

     const { isLoading, data: relatedPost } = useQuery({
          queryKey: ['relatedPost', id],
          queryFn: () => getRelatedPost(id, category),
     });

     return { isLoading, relatedPost };
};
