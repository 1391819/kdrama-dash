import React, { useState, useEffect, useCallback } from 'react';
import Slide from './Slide';
import './hero-slide.scss';

const HeroSlide = () => {
	const [series, setSeries] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetch('/api/banner')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setSeries(data);
			});
	}, []);

	const wrapperSetIndex = useCallback(
		(val) => {
			const lastSlide = series.length - 1;
			let newIndex = index + val;

			if (newIndex > lastSlide) {
				setIndex(0);
			} else if (newIndex < 0) {
				setIndex(lastSlide);
			} else {
				setIndex(newIndex);
			}
		},
		[series, index]
	);

	useEffect(() => {
		let slider = setInterval(() => {
			if (index + 1 > series.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
		}, 5000);
		return () => clearInterval(slider);
	}, [index, series]);

	return (
		<div className="banner">
			<div className="hero-slide">
				{series.map((seriesData, seriesIndex) => (
					<Slide
						key={seriesData.tmdb_id}
						seriesData={seriesData}
						seriesIndex={seriesIndex}
						index={index}
						indexSetter={wrapperSetIndex}
					/>
				))}
			</div>
		</div>
	);
};

export default HeroSlide;
