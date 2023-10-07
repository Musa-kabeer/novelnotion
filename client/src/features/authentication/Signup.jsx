import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { EMAIL_PATTERN } from '../../services/config';
import { useSignup } from './useSignup';

import Form from '../../ui/Form';
import Spinner from '../../ui/Spinner';

const Signup = () => {
	const { isLoading, signup } = useSignup();
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	// SUBMIT HANDLER
	const onSubmit = (data) => {
		signup({
			name: data.name,
			email: data.email,
			password: data.password,
		});

		// CLEAR INPUTS
		getValues().name = '';
		getValues().email = '';
		getValues().password = '';
		getValues().passwordConfirm = '';
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-center text-xl font-medium">Novel Notions</h1>

			<div className="flex flex-col gap-1">
				<label htmlFor="name" className="text-sm">
					Full Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					className="text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500"
					{...register('name', {
						required: 'fullname must be provided',
					})}
				/>

				<p className="text-xs text-red-500">{errors?.name && errors.name.message}</p>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="email" className="text-sm">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500"
					{...register('email', {
						required: 'email must be provided',
						pattern: {
							value: EMAIL_PATTERN,
							message: 'Please provide a valid email address',
						},
					})}
				/>
				<p className="text-xs text-red-500">{errors?.email && errors.email.message}</p>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="password" className="text-sm">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500"
					{...register('password', {
						required: 'password must be provided',
					})}
				/>

				<p className="text-xs text-red-500">
					{errors?.password && errors.password.message}
				</p>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="passwordConfirm" className="text-sm">
					Password Confirm
				</label>
				<input
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					className="text-sm outline-none rounded-sm text-gray-800 px-2 py-1 focus:bg-green-100 transition-all duration-500"
					{...register('passwordConfirm', {
						required: 'passwordConfim must be provided',
						validate: (val) =>
							val === getValues().password ||
							'passwordConfim must be equal to password',
					})}
				/>

				<p className="text-xs text-red-500">
					{errors?.passwordConfirm && errors.passwordConfirm.message}
				</p>
			</div>

			<p className="text-sm">
				<input type="checkbox" className="accent-green-700" /> Agree to our terms and
				conditions
			</p>

			<button className="flex items-center justify-center p-2 text-green-100 rounded-sm bg-green-700 hover:bg-green-950 transition-all duration-500 text-center">
				{isLoading ? <Spinner w="15" d="0.3" sw="4" /> : 'Sign up'}
			</button>
			<span className="text-center text-sm">
				Has an account?{' '}
				<Link to="/login" className="underline">
					Log in
				</Link>
			</span>
		</Form>
	);
};

export default Signup;
