import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { signup as signupApi } from '../../services/apiAuth';

export const useSignup = () => {
	const navigate = useNavigate();

	const { isLoading, mutate: signup } = useMutation({
		mutationFn: signupApi,

		onSuccess: (data) => {
			if (data.status === 'success') {
				toast.success('Your Account successfully 🥰');
				return navigate('/login');
			}
		},
	});

	return { isLoading, signup };
};
