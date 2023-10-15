import { Link } from 'react-router-dom';

const SinglePost = ({ post }) => {
     return (
          <Link
               to={`/post/${post._id}`}
               className='p-3 rounded-md hover:bg-neutral-100 transition-all duration-500 flex flex-col gap-2 dark:hover:bg-neutral-700 dark:text-neutral-100'
          >
               <img
                    src={`https://novelnotionapi.onrender.com/img/posts${post.image}`}
                    alt='Post Photo'
                    className='rounded-md'
               />
               <div>
                    <span className='text-xs font-medium'>{post.category}</span>

                    <p className='text-xs md:text-sm font-medium lg:text-base'>
                         {post.title}
                    </p>
               </div>
          </Link>
     );
};

export default SinglePost;
