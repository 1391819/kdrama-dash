import React, { useState, useEffect } from 'react';

import './series-list.scss';

import SeriesCard from '../series-card/SeriesCard';

const UpcomingList = () => {
	const [upcoming, setUpcoming] = useState([]);

	useEffect(() => {
		fetch('/api/upcoming')
			.then((res) => res.json())
			.then((data) => {
				setUpcoming(data);
			});
	}, []);

	return (
		upcoming.length > 0 && (
			<div className="section">
				<div className="section__header">
					<h2>Upcoming</h2>
				</div>
				<div className="section__content mt-2 mb-2">
					<div className="series-list-carousel snaps-inline">
						{upcoming.map((data) => (
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

export default UpcomingList;
