import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import HamburgerMenu from '../navigation/hamburger-menu/HamburgerMenu';
import SearchBar from '../search-bar/SearchBar';
import SearchBarMobile from '../search-bar/search-bar-mobile/SearchBarMobile';

const Header = () => {
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 1024) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
	});

	return (
		<div className="header">
			<div className="header__wrap container">
				<HamburgerMenu />
				<div className="logo">
					<Link to="/">
						<h1>KDrama Dash</h1>
					</Link>
				</div>
				{isMobile ? <SearchBarMobile /> : <SearchBar />}
			</div>
		</div>
	);
};

export default Header;
