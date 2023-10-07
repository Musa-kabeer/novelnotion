import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateUserInfo } from '../../services/apiUsers';
import { useUser } from '../authentication/useUser';
import { getCookie } from '../../hooks/useCookies';

export const useSettingsInfo = () => {
 const queryClient = useQueryClient();
 const { user } = useUser();
 const cookie = getCookie('novelToken');

 const { isUpdatingInfo, mutate: updateInfo } = useMutation({
  mutationFn: (info) =>
   updateUserInfo({ updateUser: info, id: user._id, cookie }),

  onSuccess: (data) => {
   // UPDATE THE OLD DATA TO NEW ONE
   queryClient.setQueryData(['user'], data);

   // UPDATE LOCASTORAGE
   localStorage.setItem('novelnotion-user', JSON.stringify(data));

   queryClient.invalidateQueries(['user']);

   toast.success('Info successfully updated!');
  },

  onError: (err) => {
   toast.error(err.message);
  },
 });

 return { isUpdatingInfo, updateInfo };
};
