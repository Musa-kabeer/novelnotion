import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createComment as createCommentAPI } from '../../services/apiComments';

export const useComment = () => {
     const { isLoading: isCommenting, mutate: createComment } = useMutation({
          mutationFn: createCommentAPI,

          onSuccess: (data) => {
               toast.success('Your Comment has been succefully Posted!');
               window.location.reload(`/post/${data.post}`);
          },

          onError: (err) => {
               toast.error(err);
          },
     });

     return { isCommenting, createComment };
};
