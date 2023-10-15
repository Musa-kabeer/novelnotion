import { formatDate } from '../util/helper';

const Comment = ({ comment }) => {
     return (
          <li className='flex flex-col gap-4'>
               <div className='flex items-center gap-3'>
                    <div className='w-14 h-14 flex justify-center items-center'>
                         <img
                              src={
                                   `https://novelnotionapi.onrender.com/img/users/${comment.user.photo}` ||
                                   '/default.jpeg'
                              }
                              alt=''
                              className='rounded-sm w-12 h-12 object-cover'
                         />
                    </div>
                    <div className='flex flex-col gap-1'>
                         <span className='text-xs font-bold'>
                              {comment?.user.name}
                         </span>
                         <span className='text-[10px]'>
                              {formatDate(comment?.createdAt, 'Pp')}
                         </span>
                    </div>
               </div>

               <p className='text-[12px]'>{comment?.comment}</p>
          </li>
     );
};

export default Comment;
