import { Link, useNavigate } from 'react-router-dom';
import { useUserPosts } from './useUserPosts';

const UserPosts = () => {
	const { isLoading, posts, error } = useUserPosts();
	const navigate = useNavigate();

	if (isLoading) return 'Loading...';

	if (error) {
		navigate('/login', { replace: true });
	}

	return (
		<div className="bg-neutral-100 rounded-md h-[29rem] overflow-y-scroll grid grid-cols-2 gap-4 p-3 md:h-[32rem] lg:grid-cols-3">
			{posts.map((post) => (
				<Link
					key={post._id}
					to={`/post/${post._id}`}
					className="bg-gray-200 h-44 flex flex-col gap-2">
					<img
						src={`https://novelnotionapi.onrender.com/img/posts${post.image}`}
						alt=""
						className="w-full h-28 object-cover"
					/>
					<h2 className="text-center text-xs">{post.title.split(':').at(0)}</h2>
				</Link>
			))}
		</div>
	);
};

export default UserPosts;
