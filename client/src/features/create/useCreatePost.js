import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createPost as createPostApi } from '../../services/apiPosts';
import { getCookie } from '../../hooks/useCookies';

export const useCreatePost = () => {
 const navigate = useNavigate();
 const cookie = getCookie('novelToken');

 const { isLoading: isCreating, mutate: createPost } = useMutation({
  mutationFn: (formData) => createPostApi({ formData, cookie }),

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
