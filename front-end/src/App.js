import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routing from './config/Routing';
import Sidebar from './components/navigation/sidebar/Sidebar';

function App() {
	return (
		<BrowserRouter>
			<div className="kdrama-dash">
				<Header></Header>
				<div className="layout container">
					<Sidebar></Sidebar>
					<Routing></Routing>
				</div>
				<Footer></Footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
