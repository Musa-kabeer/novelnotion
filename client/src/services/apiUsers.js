import { API_URL } from './config';

// GET ALL USERS
export const allUsers = async () => {
     const res = await fetch(`${API_URL}/users`, {
          credentials: 'include',
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { users } = data.data;

     return users;
};

export const updateUserInfo = async ({ updateUser, id }) => {
     console.log(Object.fromEntries(updateUser), id);
     const res = await fetch(`${API_URL}/users/${id}`, {
          method: 'PATCH',
          headers: {
               'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: updateUser,
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     return data.user;
};

export const updateUserPassword = async (info) => {
     const res = await fetch(`${API_URL}/users/updatePassword`, {
          method: 'PATCH',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     return data;
};
