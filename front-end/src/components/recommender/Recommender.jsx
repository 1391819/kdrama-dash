import React, { useState, useEffect } from 'react';
import { FiShuffle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './recommender.scss';

const Recommender = () => {
	const [randomSeries, setRandomSeries] = useState([]);

	useEffect(() => {
		fetch('/api/random')
			.then((res) => res.json())
			.then((data) => {
				setRandomSeries(data);
			});
	}, []);

	return (
		<>
			{randomSeries.map((data) => (
				<Link to={'/series/' + data.tmdb_id} key={data.tmdb_id}>
					<div className="recommender-container">
						<FiShuffle className="recommender-container__icon" />
						<p>Give something a chance?</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default Recommender;
