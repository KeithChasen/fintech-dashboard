import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
	return (
		<div>
			<Navbar />
			<main style={{ padding: '1rem' }}>
				<Outlet />
			</main>
		</div>
	);
}
