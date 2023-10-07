import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserPassword } from '../../services/apiUsers';
import { getCookie } from '../../hooks/useCookies';

export const useSettingsPassword = () => {
 const cookie = getCookie('novelToken');

 const { isUpdatingPassword, mutate: updatePassword } = useMutation({
  mutationFn: (data) => updateUserPassword({ ...data, cookie }),

  onSuccess: () => {
   toast.success('Password was successfully updated!');
  },

  onError: (err) => {
   toast.error(err.message);
  },
 });

 return { isUpdatingPassword, updatePassword };
};
