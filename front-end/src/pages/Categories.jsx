import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Categories = () => {
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		document.title = 'Categories';
	}, []);

	useEffect(() => {
		fetch('/api/genres')
			.then((res) => res.json())
			.then((data) => {
				setGenres(data);
			});
	}, []);

	return (
		<div className="sections container">
			<div className="section">
				<div className="section__header">
					<h2>Categories</h2>
				</div>
				<div className="section__content mt-2">
					<div className="categories-grid">
						{genres.map((data) => (
							<Link
								className="category__box"
								to={'/category/' + data.name}
								key={data.tmdb_id}
							>
								<div key={data.tmdb_id}>{data.name}</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
