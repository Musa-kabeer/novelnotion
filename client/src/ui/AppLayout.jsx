import { Outlet } from 'react-router-dom';

import Navigation from './Navigation';
import Footer from './Footer';

const AppLayout = () => {
	return (
		<div className="flex flex-col">
			<Navigation />

			<main className="flex-auto h-full bg-slate-50">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default AppLayout;
