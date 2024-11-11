import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './search-bar.scss';

/* import noPoster from '../../assets/unknown-poster.png'; */

const SearchBar = () => {
	const [series, setSeries] = useState([]);
	const [active, setActive] = useState(false);
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('');
	const ref = useRef(null);

	useEffect(() => {
		const handleActive = (e) => {
			const path = e.composedPath ? e.composedPath() : e.target.closest && e.target.closest('*');
			if (path) {
				const target = path[0] || e.target;
				
				if (target.tagName !== 'INPUT') {
					setActive(false);
				}
				
				if (target.tagName === 'line' || target.tagName === 'svg') {
					setQuery('');
				}
			}
		};
		document.addEventListener('click', handleActive, true);

		return () =>
			document.removeEventListener('click', handleActive, true);
	});

	useEffect(() => {
		fetch('/api/series')
			.then((res) => res.json())
			.then((data) => {
				setSeries(data);
			});
	}, []);

	useEffect(() => {
		if (query.length >= 1) {
			setResults(
				series.filter((series) =>
					series.name.toLowerCase().includes(query.toLowerCase())
				)
			);
		} else {
			setResults([]);
		}
	}, [query, series]);

	useEffect(() => {
		const html = document.querySelector('html');
		if (html) {
			html.style.overflow = active ? 'hidden' : null;
		}
	}, [active]);

	return (
		<div className="search-container">
			<div className="search-bar">
				<div className="search-bar__input">
					<input
						ref={ref}
						type="text"
						placeholder="Search .."
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
						style={{ width: active ? '35rem' : '' }}
						onClick={() => setActive(true)}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								e.target.blur();
							}
						}}
					></input>
				</div>
				<div className="search-bar__icon">
					{!active ? (
						<FiSearch
							onClick={() => {
								setActive(true);
								ref.current.focus();
							}}
						/>
					) : (
						<FiX />
					)}
				</div>
			</div>
			{results.length > 0 && active && (
				<div className="search-results">
					<p>Total results: {results.length}</p>
					<div className="results-elements">
						{results.map((data, i) => (
							<Link key={i} to={'/series/' + data.tmdb_id}>
								<div className="results-elements__item">
									{/* 									<div
										className="poster"
										style={
											data.poster_img_url !== null &&
											data.poster_img_url !== undefined
												? {
														backgroundImage: `url(${data.poster_img_url})`,
												  }
												: {
														backgroundImage: `url(${noPoster})`,
												  }
										}
									></div> */}
									<div className="details">
										<p
											style={{
												fontWeight: 700,
												fontSize: '1.3rem',
												padding: 0,
											}}
										>
											{data.name}
										</p>
										<p
											style={{
												padding: 0,
											}}
										>
											{new Date(
												data.airing_date
											).toLocaleDateString([], {
												year: 'numeric',
											})}
										</p>
										<p
											style={{
												margin: 0,
												padding: 0,
											}}
										>
											{data.genres}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
			{results.length === 0 && active && query.length > 3 && (
				<div className="search-results">
					<p style={{ margin: 0 }}>No results.</p>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
