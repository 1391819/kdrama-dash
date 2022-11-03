import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import noPoster from '../assets/unknown-poster.png';

const Trends = () => {
	const [series, setSeries] = useState([]);

	useEffect(() => {
		document.title = 'Trends';
	}, []);

	useEffect(() => {
		fetch('/api/trending')
			.then((res) => res.json())
			.then((data) => {
				setSeries(data);
			});
	}, []);

	return (
		<div className="sections container">
			<div className="section">
				<div className="section__header">
					<h2>Trends</h2>
				</div>
				<div className="section__content mt-2 mb-2">
					<div className="trending">
						{series.map((data) => {
							return (
								<div
									key={data.tmdb_id}
									className="trending__card"
								>
									<Link
										to={'/series/' + data.tmdb_id}
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
									></Link>
									<div className="details">
										<div className="details__heading">
											<div className="title">
												<h3>{data.name}</h3>
											</div>
											<div className="rating">
												{data.average_rating !== null &&
												data.average_rating !==
													undefined ? (
													<div className="rating__inner">
														<p>
															<b>TMDB </b>
															{
																data.average_rating
															}
														</p>
													</div>
												) : null}
											</div>
										</div>
										<h4 className="mt-2 mb-03">Synopsis</h4>
										{data.synopsis !== null &&
										data.synopsis !== undefined ? (
											<p className="synopsis">
												{data.synopsis}
											</p>
										) : (
											<p>Not available.</p>
										)}
										<h4 className="mt-2 mb-03">Genres</h4>
										{data.genres !== null &&
										data.genres !== undefined ? (
											<p>{data.genres}</p>
										) : (
											<p>/</p>
										)}
										<h4 className="mt-2 mb-03">
											Airing date
										</h4>
										{data.airing_date !== null &&
										data.airing_date !== undefined ? (
											<p>
												{new Date(
													data.airing_date
												).toLocaleDateString([], {
													year: 'numeric',
												})}
											</p>
										) : (
											<p>/</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trends;
