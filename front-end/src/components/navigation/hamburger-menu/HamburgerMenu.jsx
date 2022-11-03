import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import './hamburger-menu.scss';

import NavLinks from '../NavLinks';

const HamburgerMenu = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const html = document.querySelector('html');
		if (html) {
			html.style.overflow = open ? 'hidden' : null;
		}
	}, [open]);

	return (
		<nav className="hamburger-menu">
			<FiMenu className="open-menu-icon" onClick={() => setOpen(!open)} />
			{open && (
				<>
					<div className="hamburger-menu__overlay"></div>
					<div className="hamburger-menu__content">
						<FiX
							className="close-menu-icon"
							onClick={() => setOpen(!open)}
						/>
						<NavLinks openChanger={setOpen} />
					</div>
				</>
			)}
		</nav>
	);
};

export default HamburgerMenu;
