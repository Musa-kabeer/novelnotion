import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserPassword } from '../../services/apiUsers';

export const useSettingsPassword = () => {
     const { isUpdatingPassword, mutate: updatePassword } = useMutation({
          mutationFn: updateUserPassword,

          onSuccess: () => {
               toast.success('Password was successfully updated!');
          },

          onError: (err) => {
               toast.error(err.message);
          },
     });

     return { isUpdatingPassword, updatePassword };
};
