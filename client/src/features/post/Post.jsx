import {
 FacebookShareButton,
 TwitterShareButton,
 WhatsappShareButton,
} from 'react-share';
import { LiaFacebookF } from 'react-icons/lia';
import { BsWhatsapp } from 'react-icons/bs';
import { RiTwitterXLine } from 'react-icons/ri';

import { usePost } from './usePost';
import Spinner from '../../ui/Spinner';
import RelatedPost from '../../ui/RelatedPost';
import Comments from './PostComments';
import { formatDate } from '../../util/helper';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Post = () => {
 const { isLoading, post, error } = usePost();
 const navigate = useNavigate();

 useEffect(() => {
  if (post) document.title = `Novel Notion || ${post.title}`;
 }, [post]);

 if (isLoading) {
  return (
   <div className='h-screen flex justify-center items-center'>
    <Spinner w='50' d='0.40' sw='4' />
   </div>
  );
 }

 if (error) {
  navigate('/login', { replace: true });
 }

 const URL = `https://novelnotion.onrender.com/post/${post._id}`;

 return (
  <div className='px-10 py-8 md:px-24 lg:px-44 flex flex-col gap-5 dark:bg-neutral-800 dark:text-neutral-100'>
   <div className='flex flex-col gap-6 md:gap-7'>
    <h1 className='text-xl font-medium md:text-2xl text-center lg:text-left lg:text-3xl'>
     {post.title}
    </h1>

    <div className='flex flex-col gap-4'>
     <div className='flex gap-3 items-center'>
      <img
       className='w-16 h-16 rounded-full object-cover border-[1px] border-neutral-200'
       src={
        `https://novelnotionapi.onrender.com/img/users/${post.user.photo}` ||
        '/default.jpeg'
       }
       alt={post.user.name}
      />
      <div>
       <span className='text-xs font-medium md:text-base'>
        {post.user.name}
       </span>
       <p className='text-[10px] text-neutral-600 md:text-[11px] dark:text-neutral-100'>
        Updated on {formatDate(post.updatedAt, 'Pp')}
       </p>
      </div>
     </div>
     <div className='flex gap-2 items-center'>
      <span className='text-xs font-medium md:tex-sm lg:text-[14px]'>
       {post.category}
      </span>
      <div className='flex gap-2'>
       <FacebookShareButton url={URL}>
        <LiaFacebookF size={14} />
       </FacebookShareButton>

       <WhatsappShareButton url={URL}>
        <BsWhatsapp size={14} />
       </WhatsappShareButton>

       <TwitterShareButton url={URL}>
        <RiTwitterXLine size={14} />
       </TwitterShareButton>
      </div>
     </div>
    </div>

    <div className='lg:w-full w-full flex items-center justify-center'>
     <img
      className='w-9/12 rounded-md lg:w-8/12 lg:m-auto xl:w-7/12 object-cover'
      src={`https://novelnotionapi.onrender.com/img/posts${post.image}`}
      alt={post.category}
     />
    </div>

    <p className='text-xs tracking-wide leading-6 md:text-base md:leading-8'>
     {post.content}
    </p>
   </div>

   <Comments comments={post.comments} />

   <RelatedPost category={post.category} />
  </div>
 );
};

export default Post;
