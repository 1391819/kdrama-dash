import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Filter from './Filter';

import './series-filters.scss';

const tmdb = [
	{
		name: 'All',
		value: 0,
	},
	{
		name: '4+',
		value: 4,
	},
	{
		name: '5+',
		value: 5,
	},
	{
		name: '6+',
		value: 6,
	},
	{
		name: '7+',
		value: 7,
	},
	{
		name: '8+',
		value: 8,
	},
	{
		name: '9+',
		value: 9,
	},
];
const release = [
	{
		name: 'All',
	},
	{
		name: '< 2000',
	},
	{
		name: '2000 - 2005',
	},
	{
		name: '2005 - 2010',
	},
	{
		name: '2010 - 2015',
	},
	{
		name: '2015 - 2020',
	},
	{
		name: '> 2020',
	},
];
const sorting = [
	{
		name: 'Popularity',
	},
	{
		name: 'Rating',
	},
	{
		name: 'Newest',
	},
	{
		name: 'Oldest',
	},
];

const SeriesFilters = ({ hasCategory, series, setFilteredSeries }) => {
	const [genres, setGenres] = useState([]);
	const [filter, setFilter] = useState({
		Category: 'All',
		TMDB: 'All',
		Release: 'All',
		Sorting: 'Popularity',
	});

	useEffect(() => {
		fetch('/api/genres')
			.then((res) => res.json())
			.then((data) => {
				let first = { name: 'All', tmdb_id: 0 };
				data.unshift(first);
				setGenres(data);
			});
	}, []);

	useEffect(() => {
		let filteredSeries = [...series];

		for (let key in filter) {
			if (key === 'Category') {
				if (filter[key] !== 'All') {
					filteredSeries = filteredSeries.filter((data) =>
						data.genres.includes(filter[key])
					);
				}
			}

			if (key === 'TMDB') {
				if (filter[key] !== 'All') {
					filteredSeries = filteredSeries.filter(
						(data) => data.average_rating >= parseInt(filter[key])
					);
				}
			}

			if (key === 'Release') {
				if (filter[key] !== 'All') {
					if (filter[key].indexOf('-') > -1) {
						let range = filter[key].split(' - ');

						let initialDate = range[0] + '-01-01';
						let endingDate = range[1] + '-01-01';

						filteredSeries = filteredSeries.filter(
							(series) =>
								series.airing_date < endingDate &&
								series.airing_date >= initialDate
						);
					} else {
						let range = filter[key].split(' ');

						if (range[0] === '<') {
							let date = range[1] + '-01-01';

							filteredSeries = filteredSeries.filter(
								(series) => date > series.airing_date
							);
						} else if (range[0] === '>') {
							let date = range[1] + '-01-01';

							filteredSeries = filteredSeries.filter(
								(series) => series.airing_date > date
							);
						}
					}
				}
			}

			if (key === 'Sorting') {
				if (filter[key] === 'Popularity') {
					filteredSeries = filteredSeries.sort(
						(a, b) => b.popularity - a.popularity
					);
				}

				if (filter[key] === 'Rating') {
					filteredSeries = filteredSeries.sort(
						(a, b) => b.average_rating - a.average_rating
					);
				}

				if (filter[key] === 'Newest') {
					let today = new Date();
					let date =
						today.getFullYear() +
						'-' +
						(today.getMonth() + 1) +
						'-' +
						today.getDate();

					filteredSeries = filteredSeries.sort(
						(a, b) =>
							new Date(b.airing_date) - new Date(a.airing_date)
					);

					filteredSeries = filteredSeries.filter(
						(series) => series.airing_date < date
					);
				}
				if (filter[key] === 'Oldest') {
					filteredSeries = filteredSeries.sort(
						(a, b) =>
							new Date(a.airing_date) - new Date(b.airing_date)
					);
				}
			}
		}

		setFilteredSeries(filteredSeries);
	}, [filter, series, setFilteredSeries]);

	return (
		<div className="series-filters mb-1">
			{hasCategory && (
				<Filter
					filterName="Category"
					filterData={genres}
					width="14rem"
					setFilter={setFilter}
				/>
			)}
			<Filter
				filterName="TMDB"
				filterData={tmdb}
				width="5rem"
				setFilter={setFilter}
			/>
			<Filter
				filterName="Release"
				filterData={release}
				width="10rem"
				setFilter={setFilter}
			/>
			<Filter
				filterName="Sorting"
				filterData={sorting}
				width="9rem"
				setFilter={setFilter}
			/>
		</div>
	);
};

export default SeriesFilters;

SeriesFilters.propTypes = {
	hasCategory: PropTypes.bool,
	series: PropTypes.array,
	setFilteredSeries: PropTypes.func,
};
