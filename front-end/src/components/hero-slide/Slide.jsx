import React from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Slide = ({ seriesData, seriesIndex, index, indexSetter }) => {
	const link = '/series/' + seriesData.tmdb_id;
	const n_series = [0, 1, 2, 3, 4];

	const airing_year = new Date(seriesData.airing_date).toLocaleDateString(
		[],
		{
			year: 'numeric',
		}
	);

	let position = 'nextSlide';

	if (seriesIndex === index) {
		position = 'activeSlide';
	}

	if (seriesIndex === index - 1 || (index === 0 && seriesIndex === 4)) {
		position = 'lastSlide';
	}

	return (
		<div key={seriesData.tmdb_id} className={'slide ' + position}>
			<div
				className="slide__image"
				style={{
					backgroundImage: `url(${seriesData.background_img_url})`,
				}}
			>
				<div className="slide__overlay">
					<div
						className="slide__overlay__buttons"
						onClick={() => indexSetter(-1)}
					>
						<FiChevronsLeft />
					</div>
					<Link to={link} className="slide__overlay__text">
						<h2>{seriesData.name}</h2>
						<div className="slide__overlay__text__inner">
							{seriesData.average_rating && (
								<div className="header__rating">
									<p>
										<b>TMDB </b>
										{seriesData.average_rating}
									</p>
								</div>
							)}
							<p>{airing_year}</p>
						</div>
						<div className="index-indicator">
							{n_series.map((i) => {
								return (
									<div key={i} className="circle">
										<div
											className="mover"
											style={{
												transform: `translateX(${
													(index - i) * 10
												}px)`,
											}}
										></div>
									</div>
								);
							})}
						</div>
					</Link>
					<div
						className="slide__overlay__buttons"
						onClick={() => indexSetter(1)}
					>
						<FiChevronsRight />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Slide;

Slide.propTypes = {
	seriesData: PropTypes.object,
	seriesIndex: PropTypes.number,
	index: PropTypes.number,
	indexSetter: PropTypes.func,
};
