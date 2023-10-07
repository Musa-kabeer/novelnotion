import { API_URL } from './config';

// GET ALL USERS
export const allUsers = async (cookie) => {
 const res = await fetch(`${API_URL}/users`, {
  method: 'GET',
  headers: {
   Authorization: `Bearer ${cookie}`,
  },
 });

 const data = await res.json();

 if (data.error) throw new Error(data.error);

 const { users } = data.data;

 return users;
};

export const updateUserInfo = async ({ updateUser, id, cookie }) => {
 const res = await fetch(`${API_URL}/users/${id}`, {
  method: 'PATCH',
  headers: {
   Authorization: `Bearer ${cookie}`,
  },
  body: updateUser,
 });

 const data = await res.json();

 if (data.error) throw new Error(data.error);

 return data.user;
};

export const updateUserPassword = async ({
 password,
 currentPassword,
 cookie,
}) => {
 const res = await fetch(`${API_URL}/users/updatePassword`, {
  method: 'PATCH',
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${cookie}`,
  },
  body: JSON.stringify({
   password,
   currentPassword,
  }),
 });

 const data = await res.json();

 if (data.error) throw new Error(data.error);

 return data;
};
