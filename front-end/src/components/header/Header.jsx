import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import HamburgerMenu from '../navigation/hamburger-menu/HamburgerMenu';
import SearchBar from '../search-bar/SearchBar';
import SearchBarMobile from '../search-bar/search-bar-mobile/SearchBarMobile';

const Header = () => {
	const [mobileResize, setMobileResize] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 1024) {
			setMobileResize(true);
		} else {
			setMobileResize(false);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			window.addEventListener('orientationchange', handleResize);
			window.addEventListener('load', handleResize);
			window.addEventListener('reload', handleResize);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize);
				window.removeEventListener('orientationchange', handleResize);
				window.removeEventListener('load', handleResize);
				window.removeEventListener('reload', handleResize);
			}
		};
	}, []);

	return (
		<div className="header">
			<div className="header__wrap container">
				<HamburgerMenu />
				<div className="logo">
					<Link to="/">
						<h1>KDrama Dash</h1>
					</Link>
				</div>
				{mobileResize ? <SearchBarMobile /> : <SearchBar />}
			</div>
		</div>
	);
};

export default Header;
