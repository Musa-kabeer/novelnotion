import { API_URL } from './config';

// Get All Posts
export const allPosts = async ({ page, cookie }) => {
     const res = await fetch(`${API_URL}/posts?page=${page}`, {
          headers: {
               Authorization: `Bearer ${cookie}`,
          },
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { posts } = data.data;

     return posts;
};

// GET A POST
export const getPost = async ({ id, cookie }) => {
     const res = await fetch(`${API_URL}/posts/${id}`, {
          headers: {
               Authorization: `Bearer ${cookie}`,
          },
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { post } = data.data;

     return post;
};

// GET RELATED POSTS
export const getRelatedPost = async ({ id, category, cookie }) => {
     const res = await fetch(
          `${API_URL}/posts/${id}/related-post/${category}`,
          {
               headers: {
                    Authorization: `Bearer ${cookie}`,
               },
          }
     );
     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { posts } = data.data;

     return posts;
};

// CREATE NEW POST
export const createPost = async ({ formData, cookie }) => {
     const res = await fetch(`${API_URL}/posts`, {
          method: 'POST',
          headers: {
               Authorization: `Bearer ${cookie}`,
          },
          body: formData,
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     return data;
};

// USER POSTS
export const userPosts = async ({ id, cookie }) => {
     const res = await fetch(`${API_URL}/users/${id}/posts`, {
          headers: {
               Authorization: `Bearer ${cookie}`,
          },
     });

     const data = await res.json();

     const { posts } = data.data;

     return posts;
};
