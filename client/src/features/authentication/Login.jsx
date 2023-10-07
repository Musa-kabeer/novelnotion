import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { EMAIL_PATTERN } from '../../services/config';
import { useLogin } from './useLogin';

import Form from '../../ui/Form';
import Spinner from '../../ui/Spinner';

export const Login = () => {
 const {
  register,
  formState: { errors },
  handleSubmit,
  getValues,
 } = useForm();
 const { isLoggingIn, login } = useLogin();

 // SUBMIT HANDLER
 const onSubmit = (data) => {
  login({
   email: data.email,
   password: data.password,
  });

  // CLEAR INPUTS
  getValues().email = '';
  getValues().password = '';
 };

 console.log(isLoggingIn);

 return (
  <Form onSubmit={handleSubmit(onSubmit)}>
   <h1 className='text-center text-xl font-medium'>Novel Notions</h1>

   <div className='flex flex-col gap-1'>
    <label htmlFor='email' className='text-sm'>
     Email
    </label>
    <input
     type='email'
     name='email'
     id='email'
     className='text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500'
     {...register('email', {
      required: 'email must be provided',
      pattern: {
       value: EMAIL_PATTERN,
       message: 'Please provide a valid email address',
      },
     })}
    />
    <p className='text-xs text-red-500'>
     {errors?.email && errors.email.message}
    </p>
   </div>

   <div className='flex flex-col gap-1'>
    <label htmlFor='password' className='text-sm'>
     Password
    </label>
    <input
     type='password'
     name='password'
     id='password'
     className='text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500'
     {...register('password', {
      required: 'password must be provided',
     })}
    />

    <p className='text-xs text-red-500'>
     {errors?.password && errors.password.message}
    </p>
   </div>

   <button className='flex items-center justify-center p-2 text-green-100 rounded-sm bg-green-700 hover:bg-green-950 transition-all duration-500'>
    {isLoggingIn ? <Spinner w='15' d='0.7' sw='7' /> : 'Log in'}
   </button>
   <span className='text-center text-sm'>
    Has an account?{' '}
    <Link to='/sign-up' className='underline'>
     Sign in
    </Link>
   </span>
  </Form>
 );
};
