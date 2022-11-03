import React, { useEffect } from 'react';

const NotFound = () => {
	useEffect(() => {
		document.title = '404';
	}, []);
	return (
		<div className="sections container">
			<div className="section">
				<div className="section__content mb-2">
					<div className="not-found">
						<p className="glitch">
							<span aria-hidden="true">404</span>
							<span aria-hidden="true">404</span>
							404
						</p>
						<p style={{ fontSize: '2rem' }}>Page not found</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
