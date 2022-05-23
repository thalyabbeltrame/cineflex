import { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../shared/globalStyles';
import Home from './Home';
import Header from './Header';
import Movie from './Movie';
import Session from './Session';
import Success from './Success';

export default function App() {
	const [screen, setScreen] = useState('Home');
	return (
		<Fragment>
			<GlobalStyle />
			<BrowserRouter>
				<Header screen={screen} />
				<Routes>
					<Route path='/' element={<Home setScreen={setScreen} />} />
					<Route path='/sessoes/:movieId' element={<Movie setScreen={setScreen} />} />
					<Route path='/assentos/:sessionId' element={<Session setScreen={setScreen} />} />
					<Route path='/sucesso' element={<Success setScreen={setScreen} />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}
