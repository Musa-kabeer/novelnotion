import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createPost as createPostApi } from '../../services/apiPosts';

export const useCreatePost = () => {
     const navigate = useNavigate();

     const { isLoading: isCreating, mutate: createPost } = useMutation({
          mutationFn: createPostApi,

          onSuccess: () => {
               toast.success('Post successfully created! 😁');
               navigate('/');
          },
          onError: () => {
               toast.error('Post cannot be create 🙅‍♀️');
          },
     });

     return { isCreating, createPost };
};
