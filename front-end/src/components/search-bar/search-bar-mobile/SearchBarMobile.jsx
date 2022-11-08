import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './search-bar-mobile.scss';

/* import noPoster from '../../../assets/unknown-poster.png'; */

const SearchBarMobile = () => {
	const [series, setSeries] = useState([]);
	const [results, setResults] = useState([]);
	const [active, setActive] = useState(false);
	const [query, setQuery] = useState('');
	const ref = useRef(null);

	useEffect(() => {
		if (active) {
			ref.current.focus();
		}
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

	useEffect(() => {
		const handleActive = (e) => {
			if (e.path[0].tagName === 'SPAN') {
				setActive(false);
			}
		};
		document.addEventListener('click', handleActive, true);

		return () =>
			document.body.removeEventListener('click', handleActive, true);
	});

	return (
		<>
			<div className="search-bar-mobile">
				<div className="search-bar-mobile__icon">
					{!active && (
						<FiSearch
							onClick={() => {
								setActive(true);
							}}
						/>
					)}
				</div>
				{active && (
					<div className="search-bar-mobile__input">
						<input
							ref={ref}
							type="text"
							placeholder="Search .."
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
							}}
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									e.target.blur();
								}
							}}
						></input>

						<FiX
							className="close-search-icon"
							onClick={() => {
								setActive(false);
								setQuery('');
							}}
						/>
					</div>
				)}
			</div>

			{active && (
				<>
					<span className="search-overlay"></span>
					<div className="search-results-mobile">
						{results.length > 0 && (
							<p>Total results: {results.length}</p>
						)}
						<div className="results-elements">
							{results.map((data, i) => (
								<Link
									key={i}
									to={'/series/' + data.tmdb_id}
									onClick={() => {
										setActive(false);
										setQuery('');
									}}
								>
									<div className="results-elements__item">
										{/* 										<div
											className="poster"
											style={
												data.poster_img_url !== null &&
												data.poster_img_url !==
													undefined
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
				</>
			)}
			{results.length === 0 && active && query && (
				<>
					<span className="search-overlay"></span>
					<div className="search-results-mobile">
						<p>No results.</p>
					</div>
				</>
			)}
		</>
	);
};

export default SearchBarMobile;
