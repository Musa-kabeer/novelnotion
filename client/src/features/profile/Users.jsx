import { BsTrash3 } from 'react-icons/bs';
import { useUsers } from './useUsers';

const Users = () => {
	const { isLoading, users } = useUsers();

	if (isLoading) return 'Loading .....';

	return (
		<div className="bg-neutral-100 rounded-md h-[29rem] overflow-y-scroll gap-4 p-3 flex flex-col">
			<div className="grid grid-cols-10 text-[14px] px-4 py-2">
				<div className="col-span-3 font-bold">NAME</div>
				<div className="col-span-4 font-bold">EMAIL</div>
				<div className="col-span-2 font-bold">ROLE</div>
				<div className="font-bold"></div>
			</div>

			<ul>
				{users.map((user) => (
					<li
						key={user._id}
						className="grid grid-cols-10 text-sm cursor-pointer hover:bg-neutral-50 px-4 py-2 transition-all duration-500">
						<span className="col-span-3">{user.name}</span>
						<span className="col-span-4">{user.email}</span>
						<span className="col-span-2">{user.role}</span>
						<span>
							<BsTrash3 />
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Users;
