import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';

import { login as loginApi } from '../../services/apiAuth';

export const useLogin = () => {
 const navigate = useNavigate();
 const queryClient = useQueryClient();
 const [_, setCookie] = useCookies(['novelToken']);

 const { isLoading: isLoggingIn, mutate: login } = useMutation({
  mutationFn: loginApi,

  onSuccess: (user) => {
   queryClient.setQueryData(['user'], user.data.user);
   localStorage.setItem('novelnotion-user', JSON.stringify(user.data.user));
   // SET COOKIE

   setCookie('novelToken', user.token, {
    // httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
   });

   navigate('/', { replace: true });
   toast.success('You have successfully logged in.');
  },

  onError: (err) => {
   toast.error(err.message);
  },
 });

 return { isLoggingIn, login };
};
