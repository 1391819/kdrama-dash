import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardOverlay from '../card-overlay/CardOverlay';

import './series-card.scss';

import noPoster from '../../assets/unknown-poster.png';

const SeriesCard = ({ id, name, airing_date, background_image, rating }) => {
	const airing_year = new Date(airing_date).toLocaleDateString([], {
		year: 'numeric',
	});

	const link = '/series/' + id;

	return (
		<div className="series-card">
			<Link to={link}>
				<div
					className="series-card__image"
					style={
						background_image !== null &&
						background_image !== undefined
							? {
									backgroundImage: `url(${background_image})`,
							  }
							: { backgroundImage: `url(${noPoster})` }
					}
				>
					<CardOverlay rating={rating}></CardOverlay>
				</div>
				<div className="series-card__caption">
					<h3>{name}</h3>
					<p>{airing_year}</p>
				</div>
			</Link>
		</div>
	);
};

export default SeriesCard;

SeriesCard.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	airing_date: PropTypes.string,
	background_image: PropTypes.string,
	rating: PropTypes.number,
};
