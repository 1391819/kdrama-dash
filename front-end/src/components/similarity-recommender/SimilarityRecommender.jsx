import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SeriesCard from '../series-card/SeriesCard';

import './similarity-recommender.scss';

const SimilarityRecommender = ({ series }) => {
	const [similarSeries, setSimilarSeries] = useState([]);

	useEffect(() => {
		fetch('/api/similarity/' + series)
			.then((res) => res.json())
			.then((data) => {
				setSimilarSeries(data);
			});
	}, [series]);

	return (
		similarSeries.length > 0 && (
			<div className="section">
				<div
					className="section__header"
					style={{ justifyContent: 'flex-start' }}
				>
					<h2>If you like this series..</h2>
				</div>
				<div className="section__content mt-2 mb-2">
					<div className="recommendations-container">
						{similarSeries.map((data) => (
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

export default SimilarityRecommender;

SimilarityRecommender.propTypes = {
	series: PropTypes.number,
};
