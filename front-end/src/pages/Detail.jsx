import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import SimilarityRecommender from '../components/similarity-recommender/SimilarityRecommender';
import noPoster from '../assets/unknown-poster.png';

const Detail = () => {
	const { id } = useParams();
	const [series, setSeries] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Series details';
	}, []);

	useEffect(() => {
		fetch('/api/series/' + id)
			.then((res) => {
				if (!res.ok) {
					return [];
				} else {
					return res.json();
				}
			})
			.then((data) => {
				if (data.length === 1) {
					setSeries(data);
				} else {
					navigate('/404');
				}
			});
	}, [id, navigate]);

	return (
		<>
			{series.map((data) => (
				<div className="detail" key={data.tmdb_id}>
					<div className="sections container">
						<div className="section">
							<div className="section__header">
								<h2>{data.name}</h2>
								<div className="header__rating">
									{data.average_rating && (
										<div className="header__rating__inner">
											<p>
												<b>TMDB </b>
												{data.average_rating}
											</p>
										</div>
									)}
								</div>
							</div>
							<div className="header__subheading">
								<p>{data.original_name}</p>
							</div>
							<div className="section__content mt-2 mb-2">
								<div className="detail__poster">
									<LazyLoadImage
										src={
											data.poster_img_url !== null &&
											data.poster_img_url !== undefined
												? data.poster_img_url
												: noPoster
										}
										alt="series poster"
										effect="blur"
									></LazyLoadImage>
								</div>
								<div className="detail__text">
									{data.synopsis !== null &&
									data.synopsis !== undefined ? (
										<p>{data.synopsis}</p>
									) : (
										<p>Not available.</p>
									)}
									<div className="detail__text-inner-container mt-1">
										<div className="left-side">
											<h3 className="mb-03 mt-1">
												Genres
											</h3>
											{data.genres !== null &&
											data.genres !== undefined ? (
												<p>{data.genres}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Airing Date
											</h3>
											{data.airing_date !== null &&
											data.airing_date !== undefined ? (
												<p>{data.airing_date}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Directors
											</h3>
											{data.directors !== null &&
											data.directors !== undefined ? (
												<p>{data.directors}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Seasons
											</h3>

											{data.number_of_seasons !== null &&
											data.number_of_seasons !==
												undefined ? (
												<p>{data.number_of_seasons}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Production companies
											</h3>
											{data.production_companies !==
												null &&
											data.production_companies !==
												undefined ? (
												<p>
													{data.production_companies}
												</p>
											) : (
												<p>-</p>
											)}
										</div>
										<div className="right-side">
											<h3 className="mb-03 mt-1">
												Popularity
											</h3>
											{data.popularity !== null &&
											data.popularity !== undefined ? (
												<p>{data.popularity}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Rating count
											</h3>
											{data.rating_count !== null &&
											data.rating_count !== undefined ? (
												<p>{data.rating_count}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Next episode
											</h3>
											{data.next_episode_air_date !==
												null &&
											data.next_episode_air_date !==
												undefined ? (
												<p>
													{data.next_episode_air_date}
												</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Episodes
											</h3>
											{data.number_of_episodes !== null &&
											data.number_of_episodes !==
												undefined ? (
												<p>{data.number_of_episodes}</p>
											) : (
												<p>-</p>
											)}
											<h3 className="mt-2 mb-03">
												Networks
											</h3>
											{data.networks !== null &&
											data.networks !== undefined ? (
												<p>{data.networks}</p>
											) : (
												<p>-</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<SimilarityRecommender series={parseInt(id)} />
					</div>
				</div>
			))}
		</>
	);
};

export default Detail;
