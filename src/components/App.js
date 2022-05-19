import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../theme/globalStyles';
import Home from './Home';
import Header from './Header';
import Movie from './Movie';
import Session from './Session';
import Success from './Success';

export default function App() {
	return (
		<Fragment>
			<GlobalStyle />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/filme/:movieId' element={<Movie />} />
					<Route path='/sessao/:sessionId' element={<Session />} />
					<Route path='/success' element={<Success />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}
