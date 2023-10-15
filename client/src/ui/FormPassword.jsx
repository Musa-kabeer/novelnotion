import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSettingsPassword } from '../features/profile/useSettingsPassword';

import Input from './Input';
import Button from './Button';

const FormPassword = () => {
     const { isUpdatingPassword, updatePassword } = useSettingsPassword();
     const [password, setPassword] = useState('');
     const [currentPassword, setCurrentPassword] = useState('');
     const navigate = useNavigate();

     const handlePassword = (e) => {
          e.preventDefault();

          if (!password || !currentPassword)
               return toast.error(
                    'Please provide password or current password'
               );

          updatePassword(
               {
                    password,
                    currentPassword,
               },
               {
                    onSuccess: () => {
                         navigate('/');
                    },
               }
          );
     };

     return (
          <form className='flex flex-col gap-3 text-sm'>
               <div className='flex gap-2'>
                    <label htmlFor='currentPassword'>Current Password:</label>
                    <Input
                         type='password'
                         id='currentPassword'
                         autocomplete
                         onChange={(e) => setCurrentPassword(e.target.value)}
                    />
               </div>

               <div className='flex gap-2'>
                    <label htmlFor='newPassword'>New Password:</label>
                    <Input
                         type='password'
                         id='newPassword'
                         autocomplete
                         onChange={(e) => setPassword(e.target.value)}
                    />
               </div>

               <span>
                    <Button mode={isUpdatingPassword} onClick={handlePassword}>
                         Update Password
                    </Button>
               </span>
          </form>
     );
};

export default FormPassword;
