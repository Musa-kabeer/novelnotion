import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export const useLogin = () => {
     const navigate = useNavigate();
     // const queryClient = useQueryClient();

     const { isLoading: isLoggingIn, mutate: login } = useMutation({
          mutationFn: loginApi,

          onSuccess: () => {
               navigate('/', { replace: true });
               toast.success('You have successfully logged in.');
          },

          onError: (err) => {
               toast.error(err.message.split(':')[1]);
          },
     });

     return { isLoggingIn, login };
};
