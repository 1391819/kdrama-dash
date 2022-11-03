import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SeriesCard from '../components/series-card/SeriesCard';
import SeriesFilters from '../components/series-filters/SeriesFilters';

const Category = () => {
	const category = useParams();
	const [series, setSeries] = useState([]);
	const [filteredSeries, setFilteredSeries] = useState([]);
	const [visibleSeries, setVisibleSeries] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = category.category;
	}, [category]);

	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		)
			return;
		setIsFetching(true);
	}

	useEffect(() => {
		fetch('/api/series/' + category.category)
			.then((res) => {
				if (!res.ok) {
					return [];
				} else {
					return res.json();
				}
			})
			.then((data) => {
				if (data.length === 0) {
					navigate('/404');
				} else {
					setSeries(data);
					setVisibleSeries(data.slice(0, 20));
				}
			});
	}, [category, navigate]);

	useEffect(() => {
		setVisibleSeries(filteredSeries.slice(0, 20));
	}, [filteredSeries]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (!isFetching) return;
		setTimeout(() => {
			const increment = 20;
			setVisibleSeries(
				filteredSeries.slice(0, visibleSeries.length + increment)
			);
			setIsFetching(false);
		}, 1000);
	}, [isFetching, filteredSeries, visibleSeries]);

	return (
		<div className="sections container">
			<div className="section">
				<div className="section__header">
					<h2>{category.category}</h2>
				</div>
				<div className="section__content mt-2 mb-2">
					<SeriesFilters
						hasCategory={false}
						series={series}
						setFilteredSeries={setFilteredSeries}
					/>
					<p className="mb-1">
						Total results: {filteredSeries.length}
					</p>
					<div className="series-grid">
						{
							visibleSeries.length > 0
								? visibleSeries.map((data) => (
										<SeriesCard
											key={data.tmdb_id}
											id={data.tmdb_id}
											name={data.name}
											airing_date={data.airing_date}
											background_image={
												data.poster_img_url
											}
											rating={data.average_rating}
										/>
								  ))
								: null /* (
							<p>No series found.</p>
						) */
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category;
