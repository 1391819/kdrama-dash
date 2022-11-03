import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiFileText } from 'react-icons/fi';

import './card-overlay.scss';

const CardOverlay = ({ rating }) => {
	return (
		<div className="overlay">
			{rating ? (
				<div className="hover-content">
					<div className="hover-content-details">
						<div className="hover-content-details__icon">
							<FiFileText />
						</div>
					</div>
					<div className="hover-content__rating-icon">
						<CircularProgressbar
							value={parseInt(rating)}
							maxValue={10}
							text={parseInt(rating)}
							styles={buildStyles({
								textSize: '3rem',
								pathColor: '#b490e4',
								textColor: '#fff',
								trailColor: '#fff',
							})}
						/>
					</div>
				</div>
			) : (
				<div className="hover-content">
					<div className="hover-content-details">
						<div className="hover-content-details__icon">
							<FiFileText />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CardOverlay;

CardOverlay.propTypes = {
	rating: PropTypes.number,
};
