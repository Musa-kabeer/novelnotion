import { useRelatedPost } from '../features/post/useRelatedPosts';

import SinglePost from './SinglePost';
import Spinner from './Spinner';

const RelatedPost = ({ category }) => {
 const { isLoading, relatedPost } = useRelatedPost(category);

 if (isLoading) {
  return (
   <div className='flex justify-center items-center'>
    <Spinner w='50' d='0.30' sc='#86efac' sw='4' />
   </div>
  );
 }

 return (
  <div className='py-8'>
   <h2 className='text-xl font-medium pb-5'>Related Articles</h2>

   <div className='grid grid-col-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2'>
    {relatedPost.map((post) => (
     <SinglePost key={post._id} post={post} />
    ))}
   </div>
  </div>
 );
};

export default RelatedPost;
