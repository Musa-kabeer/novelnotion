import { Outlet, useNavigate } from 'react-router-dom';
import { BiRepost } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';

import { useUser } from '../authentication/useUser';

import NavLinkComponent from '../../ui/NavLinkComponent';
import { useEffect } from 'react';

const Profile = () => {
 const { user, error } = useUser();
 const navigate = useNavigate();

 useEffect(() => {
  if (user) document.title = `Novel Notion || ${user.name} Profile`;
 }, [user]);

 if (error) {
  navigate('/login', { replace: true });
 }

 return (
  <div className='h-full md:h-[600px] flex justify-center items-center p-2 md:p-14 lg:p-24 xl:'>
   <div className='w-full md:h-[550px] flex flex-col md:flex-row'>
    <div className='flex flex-col md:basis-3/12 gap-4 bg-neutral-400 py-6 text-neutral-800'>
     <h3 className='text-center font-bold text-sm md:text-xl'>
      Role: {user?.role}
     </h3>
     <div className='flex justify-between px-5 md:flex-col md:gap-3'>
      <NavLinkComponent
       to='/me/posts'
       text='My Posts'
       icon={<BiRepost className='text-xl' />}
      />

      {user?.role === 'admin' && (
       <NavLinkComponent
        to='/me/users'
        text='Users'
        icon={<FiUsers className='text-xl' />}
       />
      )}
      <NavLinkComponent
       to='/me/settings'
       text='Settings'
       icon={<FiSettings className='text-xl' />}
      />
     </div>
    </div>

    <div className='bg-neutral-200 px-2 py-3 md:basis-9/12'>
     <Outlet />
    </div>
   </div>
  </div>
 );
};

export default Profile;
