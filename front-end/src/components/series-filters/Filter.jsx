import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterName, filterData, width, setFilter }) => {
	const [filterOpen, setFilterOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('All');

	useEffect(() => {
		if (filterName === 'Sorting') {
			setSelectedValue('Popularity');
		}
	}, [setSelectedValue, filterName]);

	useEffect(() => {
		setFilter((prevFilter) => ({
			...prevFilter,
			[filterName]: selectedValue,
		}));
	}, [setFilter, selectedValue, filterName]);

	/* 	useEffect(() => {
		const html = document.querySelector('html');
		if (html) {
			html.style.overflow = filterOpen ? 'hidden' : null;
		}
	}, [filterOpen]); */

	useEffect(() => {

		const handleDropdown = (e) => {
		const path = e.composedPath ? e.composedPath() : [e.target];

		// Check if the click is outside the dropdown
		if (
			!path.some(
			(el) =>
				el.className === 'filter-item' ||
				el.className === 'filter-item__content' ||
				el.className === 'filter-value' ||
				el.className === 'dropdown-btn' ||
				el.className === 'dropdown-menu'
			)
		) {
			setFilterOpen(false);
		}

		const filterItem = path.find((el) => el.className === 'filter-item');
		if (filterItem && filterItem.id !== filterName) {
			setFilterOpen(false);
		}
		};

		document.addEventListener('click', handleDropdown, true);

		return () =>
			document.body.removeEventListener('click', handleDropdown, true);
	}, [filterName]);

	return (
		<div
			className="filter-item"
			id={filterName}
			onClick={() => setFilterOpen(!filterOpen)}
		>
			<p>{filterName}</p>
			<div
				className="filter-item__content"
				style={{ width: width }}
				aria-expanded={filterOpen}
			>
				<div className="filter-value">{selectedValue}</div>
				<div className="dropdown-btn"></div>
			</div>
			{filterOpen && (
				<div className="dropdown-menu">
					{filterData.map((data, i) => (
						<li
							key={i}
							onClick={() => {
								setFilterOpen(!filterOpen);
								setSelectedValue(data.name);
							}}
						>
							{data.name}
						</li>
					))}
				</div>
			)}
		</div>
	);
};

export default Filter;

Filter.propTypes = {
	filterName: PropTypes.string,
	filterData: PropTypes.array,
	width: PropTypes.string,
	setFilter: PropTypes.func,
};
