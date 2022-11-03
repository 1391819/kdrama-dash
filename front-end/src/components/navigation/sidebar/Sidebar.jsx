import React from 'react';

import './sidebar.scss';

import NavLinks from '../NavLinks';

const Sidebar = () => {
	return (
		<nav className="sidebar-menu">
			<NavLinks />
		</nav>
	);
};

export default Sidebar;
