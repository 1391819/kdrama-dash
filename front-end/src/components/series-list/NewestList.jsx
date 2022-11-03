import React, { useState, useEffect } from 'react';

import './series-list.scss';

import SeriesCard from '../series-card/SeriesCard';

const NewestList = () => {
	const [newest, setNewest] = useState([]);

	useEffect(() => {
		fetch('/api/newest')
			.then((res) => res.json())
			.then((data) => {
				setNewest(data);
			});
	}, []);

	return (
		newest.length > 0 && (
			<div className="section">
				<div className="section__header">
					<h2>Newest</h2>
				</div>
				<div className="section__content mt-2 mb-2">
					<div className="series-list-carousel snaps-inline">
						{newest.map((data) => (
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

export default NewestList;
