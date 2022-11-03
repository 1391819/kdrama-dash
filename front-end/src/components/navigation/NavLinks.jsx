import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiHome, FiDatabase, FiMonitor, FiStar } from 'react-icons/fi';

const routes = [
	{
		display: 'Home',
		path: '/',
		icon: <FiHome />,
	},
	{
		display: 'Series',
		path: '/series',
		icon: <FiMonitor />,
	},
	{
		display: 'Trending',
		path: '/trends',
		icon: <FiStar />,
	},
	{
		display: 'Categories',
		path: '/categories',
		icon: <FiDatabase />,
	},
];

const NavLinks = ({ openChanger }) => {
	const { pathname } = useLocation();
	const menuRef = useRef(null);

	const active = routes.findIndex((e) => e.path === pathname);

	return (
		<div ref={menuRef}>
			<ul className="nav-links">
				<p>Menu</p>
				{routes.map((e, i) => (
					<li key={i} className={`${i === active ? 'active' : ''}`}>
						<Link
							to={e.path}
							className="link"
							{...(openChanger
								? {
										onClick: () => {
											openChanger(false);
										},
								  }
								: {})}
						>
							<div className="icon">{e.icon}</div>
							<div className="text">{e.display}</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavLinks;

NavLinks.propTypes = {
	openChanger: PropTypes.func,
};
