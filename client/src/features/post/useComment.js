import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCookie } from '../../hooks/useCookies';

import { createComment as createCommentAPI } from '../../services/apiComments';

export const useComment = () => {
 const cookie = getCookie('novelToken');
 const { isLoading: isCommenting, mutate: createComment } = useMutation({
  mutationFn: (data) => createCommentAPI({ ...data, cookie }),

  onSuccess: () => {
   toast.success('Your Comment has been succefully Posted!');
  },

  onError: (err) => {
   toast.error(err);
  },
 });

 return { isCommenting, createComment };
};
