import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Series from '../pages/Series';
import Detail from '../pages/Detail';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import Trends from '../pages/Trends';
import NotFound from '../pages/NotFound';

const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/series" element={<Series />} />
			<Route path="/series/:id" element={<Detail />} />
			<Route path="/categories" element={<Categories />} />
			<Route path="/category/:category" element={<Category />} />
			<Route path="/trends" element={<Trends />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Routing;
