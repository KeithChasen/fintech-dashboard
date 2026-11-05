import { NavLink } from 'react-router-dom';

export function Navbar() {
	const navLinkStyles = ({ isActive }) => ({
		color: isActive ? '#9564DD' : '#c5c1c1',
		textDecoration: 'none',
		fontWeight: 'bold',
		padding: '5px 10px',
	});

	return (
		<nav
			style={{
				padding: '1rem',
				display: 'flex',
				gap: '1rem',
				textDecoration: 'none',
				background: '#393e46',
			}}
		>
			<NavLink className='nav-link' style={navLinkStyles} to='/'>
				Transactions
			</NavLink>
			<NavLink className='nav-link' style={navLinkStyles} to='/create'>
				Create Payment
			</NavLink>
		</nav>
	);
}
