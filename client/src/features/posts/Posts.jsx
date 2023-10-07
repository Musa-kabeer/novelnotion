import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePosts } from './usePosts';
import Post from './Post';

// Components
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useEffect } from 'react';

const Posts = () => {
 const { isLoading, posts, error } = usePosts();
 const [searchParams, setSearchParams] = useSearchParams();
 const navigate = useNavigate();

 useEffect(() => {
  if (posts) document.title = 'Novel Notion || All Posts';
 }, [posts]);

 if (error) {
  navigate('/login', { replace: true });
 }

 if (isLoading) {
  return (
   <div className='h-screen flex justify-center items-center'>
    <Spinner w='40' d='0.40' sw='4' />
   </div>
  );
 }

 const page = Number(searchParams.get('page')) || 1;

 const handlePrevious = () => {
  if (page === 1) return;

  setSearchParams({ page: page - 1 });
 };

 const handleNext = () => {
  if (posts.length < 12) return;

  setSearchParams({ page: page + 1 });
 };

 return (
  <div className='flex flex-col justify-center gap-2 items-center pb-10 lg:px-20 md:px-14 px-10 py-10 dark:bg-neutral-800 dark:text-neutral-100 transition-all duration-300'>
   <h1 className='font-medium lg:text-2xl'>All Posts</h1>

   <div className='md:py-4 md:px-9 lg:py-7 lg:px-28 grid grid-col-1 grid-rows-9 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3 gap-1 md:gap-3'>
    {posts.map((post) => (
     <Post key={post._id} post={post} />
    ))}
   </div>

   <div className='flex justify-between items-center w-7/12 md:w-2/12'>
    <Button onClick={handlePrevious}>&larr;</Button>
    <Button onClick={handleNext}>&rarr;</Button>
   </div>
  </div>
 );
};

export default Posts;
