import { Link, useNavigate } from 'react-router-dom';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import { useUser } from '../features/authentication/useUser';

import { useDarkMode } from '../context/darkModeContext';
import Logo from './Logo';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Navigation = () => {
     const { user } = useUser();
     const { darked, setDarked } = useDarkMode();
     const [_, setCookies] = useCookies();
     const navigate = useNavigate();

     useEffect(() => {
          if (darked) {
               document.documentElement.classList.add('dark');
          } else {
               document.documentElement.classList.remove('dark');
          }
     }, [darked]);

     const handleLogout = () => {
          setCookies('novelToken', 'loggedout');
          localStorage.setItem('novelnotion-user', null);

          navigate('/login');
     };

     return (
          <nav className='bg-neutral-100 flex flex-none justify-between items-center px-4 md:px-10 h-20 transition-all duration-300 dark:bg-neutral-800 dark:border-b-[1px] dark:border-b-neutral-50'>
               <Logo />

               <div className='flex items-center gap-3'>
                    <div className='flex gap-5 items-center'>
                         <div
                              className='rounded-full cursor-pointer w-8 h-8 transition-all duration-500 flex justify-center items-center bg-neutral-300 dark:bg-neutral-50'
                              onClick={() => setDarked((dark) => !dark)}
                         >
                              {darked ? <BsFillMoonFill /> : <BsFillSunFill />}
                         </div>

                         <div
                              className='rounded-full cursor-pointer w-8 h-8 transition-all duration-500 flex justify-center items-center bg-neutral-300 dark:bg-neutral-50'
                              onClick={handleLogout}
                         >
                              <BiLogOut />
                         </div>

                         <Link
                              to='/create-post'
                              className='rounded-full cursor-pointer w-8 h-8 transition-all duration-500 flex justify-center items-center bg-neutral-300 dark:bg-neutral-50'
                         >
                              <IoMdAddCircle />
                         </Link>
                    </div>

                    {user && (
                         <Link to={'/me'}>
                              <img
                                   src={
                                        user.photo
                                             ? `https://novelnotionapi.onrender.com/img/users/${user.photo}`
                                             : '/default.jpeg'
                                   }
                                   alt={user.name}
                                   className='w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-[1px] border-neutral-300 dark:border-neutral-100'
                              />
                         </Link>
                    )}
               </div>
          </nav>
     );
};

export default Navigation;
