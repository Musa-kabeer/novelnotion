import { API_URL } from './config';

// Get All Posts
export const allPosts = async (page) => {
     const res = await fetch(`${API_URL}/posts?page=${page}`, {
          credentials: 'include',
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { posts } = data.data;

     return posts;
};

// GET A POST
export const getPost = async (id) => {
     const res = await fetch(`${API_URL}/posts/${id}`, {
          credentials: 'include',
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { post } = data.data;

     console.log(post);

     return post;
};

// GET RELATED POSTS
export const getRelatedPost = async (id, category) => {
     const res = await fetch(
          `${API_URL}/posts/${id}/related-post/${category}`,
          {
               credentials: 'include',
          }
     );
     const data = await res.json();

     if (data.error) throw new Error(data.error);

     const { posts } = data.data;

     return posts;
};

// CREATE NEW POST
export const createPost = async (formData) => {
     const res = await fetch(`${API_URL}/posts`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: formData,
     });

     const data = await res.json();

     if (data.error) throw new Error(data.error);

     return data;
};

// USER POSTS
export const userPosts = async (id) => {
     const res = await fetch(`${API_URL}/users/${id}/posts`, {
          credentials: 'include',
     });

     const data = await res.json();

     const { posts } = data.data;

     return posts;
};
