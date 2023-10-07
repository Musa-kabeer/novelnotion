import FormInfo from '../../ui/FormInfo';
import FormPassword from '../../ui/FormPassword';

const Settings = () => {
	return (
		<div className="bg-neutral-100 rounded-md h-[29rem] overflow-y-scroll gap-4 p-3 flex flex-col">
			<h2 className="text-xl font-medium mb-4">Your Account Settings</h2>

			<FormInfo />

			<hr />

			<FormPassword />
		</div>
	);
};

export default Settings;
