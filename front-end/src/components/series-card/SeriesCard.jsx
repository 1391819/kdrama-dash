import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardOverlay from '../card-overlay/CardOverlay';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './series-card.scss';

import noPoster from '../../assets/unknown-poster.png';

const SeriesCard = ({ id, name, airing_date, background_image, rating }) => {
	const [renderOverlay, setRenderOverlay] = useState(false);
	let airing_year = '-';

	if (airing_date === null || airing_date === undefined) {
	} else {
		airing_year = new Date(airing_date).getFullYear();
	}

	const link = '/series/' + id;

	return (
		<div className="series-card">
			<Link to={link}>
				<div className="series-card__image">
					<LazyLoadImage
						src={
							background_image !== null &&
							background_image !== undefined
								? background_image
								: noPoster
						}
						alt="series poster"
						effect="blur"
						afterLoad={() => setRenderOverlay(true)}
						placeholderSrc={noPoster}
					></LazyLoadImage>
					{renderOverlay && (
						<CardOverlay rating={rating}></CardOverlay>
					)}
				</div>
				{renderOverlay && (
					<div className="series-card__caption">
						<h3>{name}</h3>
						<p>{airing_year}</p>
					</div>
				)}
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
