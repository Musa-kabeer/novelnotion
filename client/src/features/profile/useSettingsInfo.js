import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateUserInfo } from '../../services/apiUsers';
import { useUser } from '../authentication/useUser';

export const useSettingsInfo = () => {
     const queryClient = useQueryClient();
     const { user } = useUser();

     const { isUpdatingInfo, mutate: updateInfo } = useMutation({
          mutationFn: (info) =>
               updateUserInfo({ updateUser: info, id: user._id }),

          onSuccess: (data) => {
               // UPDATE
               queryClient.invalidateQueries(['user']);

               toast.success('Info successfully updated!');
          },

          onError: (err) => {
               toast.error(err.message);
          },
     });

     return { isUpdatingInfo, updateInfo };
};
