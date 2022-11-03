import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './series-list.scss';

import SeriesCard from '../series-card/SeriesCard';

const PopularList = () => {
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		fetch('/api/popular')
			.then((rest) => rest.json())
			.then((data) => {
				setPopular(data);
			});
	}, []);

	return (
		popular.length > 0 && (
			<div className="section">
				<div className="section__header">
					<h2>Popular</h2>
					<Link to="/trends" className="heading__link">
						Trending
					</Link>
				</div>
				<div className="section__content mt-2 mb-2">
					<div className="series-list-carousel snaps-inline">
						{popular.map((data) => (
							<SeriesCard
								key={data.tmdb_id}
								id={data.tmdb_id}
								name={data.name}
								airing_date={data.airing_date}
								background_image={data.poster_img_url}
								rating={data.average_rating}
							/>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default PopularList;
