import { API_URL } from './config';

// CREATE NEW COMMENT
export const createComment = async (post, comment) => {
     const res = await fetch(`${API_URL}/comments`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
               post,
               comment,
          }),
     });

     const data = await res.json();

     if (data.status === 'fail') {
          throw new Error('Comment cannot be created');
     }

     return data;
};
