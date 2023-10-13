import { API_URL } from './config';

// SIGN UP
export const signup = async (newUser) => {
     const res = await fetch(`${API_URL}/users/signup`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
          credentials: 'include',
     });

     const data = await res.json();

     if (data.status === 'fail') throw new Error(data);

     return data;
};

// LOGIN
export const login = async (user) => {
     const res = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
     });

     const data = await res.json();

     if (data.status === 'fail') throw new Error(data.message);

     return data;
};

// GET USER
export const getCurrentUser = () => {
     const user = JSON.parse(localStorage.getItem('novelnotion-user'));

     if (!user) return new Error('You are not authenticated');

     return user;
};
