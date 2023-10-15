import { useState } from 'react';
import { useUser } from '../features/authentication/useUser';
import { useSettingsInfo } from '../features/profile/useSettingsInfo';
import Input from './Input';
import Button from './Button';

const FormInfo = () => {
     const { user } = useUser();
     const { isUpdatingInfo, updateInfo } = useSettingsInfo();
     const [name, setName] = useState(user?.name || '');
     const [email, setEmail] = useState(user?.email || '');
     const [photo, setPhoto] = useState(user?.photo || '');

     const handleSettings = (e) => {
          e.preventDefault();

          const formData = new FormData();

          formData.append('name', name);
          formData.append('email', email);
          formData.append('photo', photo);

          updateInfo(formData, {
               onSettled: () => {
                    setName(user?.name);
                    setEmail(user?.email);
                    setPhoto(user?.photo);
               },
          });
     };

     return (
          <form className='flex flex-col gap-3 text-sm'>
               <div className='flex gap-2'>
                    <label htmlFor='name'>Name:</label>
                    <Input
                         type='text'
                         id='name'
                         autocomplete
                         onChange={(e) => setName(e.target.value)}
                         defaultValue={name}
                    />
               </div>

               <div className='flex gap-2'>
                    <label htmlFor='email'>Email:</label>
                    <Input
                         type='email'
                         id='email'
                         autocomplete
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         defaultValue={email}
                    />
               </div>

               <div className='flex items-center gap-3'>
                    <img
                         src={
                              user?.photo
                                   ? `https://novelnotionapi.onrender.com/img/users/${user?.photo}`
                                   : '/default.jpeg'
                         }
                         alt={user?.name}
                         className='w-14 h-14 rounded-full object-cover border-[1px] border-neutral-800'
                    />
                    <input
                         type='file'
                         defaultValue={''}
                         accept='image/*'
                         className='text-xs file:text-xs file:bg-neutral-300 file:border-none file:px-4 file:py-2 file:rounded-md cursor-pointer ring-[1px] ring-neutral-200 file:m-[4px]'
                         onChange={(e) => setPhoto(e.target.files[0])}
                    />
               </div>

               <span>
                    <Button mode={isUpdatingInfo} onClick={handleSettings}>
                         save settings
                    </Button>
               </span>
          </form>
     );
};

export default FormInfo;
