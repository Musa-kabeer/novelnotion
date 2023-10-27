import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getPost } from '../../services/apiPosts';

export const usePost = () => {
     const { id } = useParams();

     const { isLoading, data: post } = useQuery({
          queryKey: ['post', id],
          queryFn: () => getPost(id),
     });

     return { isLoading, post };
};
