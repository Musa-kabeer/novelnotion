import {
     AiFillFacebook,
     AiFillLinkedin,
     AiOutlineGithub,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
     return (
          <div className='bg-neutral-100 flex-none dark:bg-neutral-700 dark:text-neutral-100 transition-all duration-300'>
               <div className='flex flex-col items-center gap-6 md:gap-0 md:flex-row md:justify-between p-5 md:px-20 md:items-center'>
                    <div className='text-xs md:text-sm text-center md:text-left'>
                         <p>
                              Become one of the first 1000+, that got our email
                              🥂
                         </p>
                         <h5 className='font-medium hidden md:flex'>
                              Sign up today &rarr;
                         </h5>
                         <h5 className='font-medium md:hidden'>
                              Sign up today &darr;
                         </h5>
                    </div>

                    <div className='text-xs md:text-sm flex items-center'>
                         <input
                              type='email'
                              placeholder='Enter your Email ...'
                              className='py-2 outline-none italic px-2 w-7/12 md:w-8/12 lg:w-64 placeholder:italic placeholder:text-sm dark:text-neutral-900'
                         />
                         <button className='text-[12px] px-4 py-[8px] md:px-2 bg-neutral-900 text-slate-50 dark:bg-neutral-600'>
                              Sign me up
                         </button>
                    </div>
               </div>

               <div className='bg-neutral-700 flex flex-col py-3 px-5 md:py-7 md:px-10 md:flex-row md:justify-between md:items-center gap-3 text-white dark:bg-neutral-800'>
                    <Logo />

                    <p className='text-sm'>&copy; africantechi</p>

                    <div className='flex flex-col gap-2'>
                         <h4>Follow us</h4>
                         <div className='flex flex-row gap-4 text-2xl'>
                              <Link to='https://www.facebook.com/profile.php?id=100086586432588'>
                                   <AiFillFacebook />
                              </Link>

                              <Link to='https://www.linkedin.com/in/musa-abdulkabir-170836202/'>
                                   <AiFillLinkedin />
                              </Link>

                              <Link to='https://github.com/Musa-kabeer'>
                                   <AiOutlineGithub />
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Footer;
