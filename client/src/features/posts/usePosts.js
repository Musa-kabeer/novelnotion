import { useQuery } from '@tanstack/react-query';
import { allPosts } from '../../services/apiPosts';
import { useSearchParams } from 'react-router-dom';

export const usePosts = () => {
     const [searchParams] = useSearchParams();
     const page = searchParams.get('page') || 1;

     const { isLoading, data: posts } = useQuery({
          queryKey: ['posts', page],
          queryFn: () => allPosts(page),
     });

     return { isLoading, posts };
};
