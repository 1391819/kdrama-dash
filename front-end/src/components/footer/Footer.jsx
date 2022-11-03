import React from 'react';

import './footer.scss';

import TMDB_logo from '../../assets/tmdb_logo.svg';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__wrap container">
				<div className="attributions">
					<p>All data taken from The Movie Database</p>
					<img src={TMDB_logo} alt="TMDB logo"></img>
				</div>
				<div className="copyright">
					<p>Built and designed by Roberto Nacu</p>
					<p>All rights reserved.©</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
