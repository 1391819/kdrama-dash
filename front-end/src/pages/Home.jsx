import React, { useEffect } from 'react';

import NewestList from '../components/series-list/NewestList';
import UpcomingList from '../components/series-list/UpcomingList';
import PopularList from '../components/series-list/PopularList';
import Recommender from '../components/recommender/Recommender';
import HeroSlide from '../components/hero-slide/HeroSlide';

const Home = () => {
	useEffect(() => {
		document.title = 'Home';
	}, []);

	return (
		<div className="sections container">
			<div className="section">
				<div className="section__content mb-2">
					<HeroSlide />
				</div>
			</div>
			<PopularList />
			<NewestList />
			<UpcomingList />
			<div className="section">
				<div className="section__content mt-2 mb-2">
					<Recommender />
				</div>
			</div>
		</div>
	);
};

export default Home;
