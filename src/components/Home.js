import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SubHeader from './SubHeader';
import Movie from './Movie';
import Loading from './Loading';

export default function Home() {
	const [moviesList, setMoviesList] = useState([]);

	useEffect(() => {
		axios
			.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
			.then((response) => {
				setMoviesList(response.data);
			})
			.catch(() => alert('Não foi possível obter a lista de filmes'));
	}, []);

	return (
		<Container>
			<SubHeader text={'Selecione o filme'} />
			<Content>
				{moviesList[0] ? moviesList.map((movie) => (
					<Link key={movie.id} to={`/sessoes/${movie.id}`} element={<Movie />}>
						<Image>
							<img src={movie.posterURL} alt={movie.title} />
						</Image>
					</Link>
				)) : <Loading />}
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

const Image = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 145px;
	height: 209px;
	box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	margin: 0 10px 30px 10px;

	img {
		width: 129px;
		height: 193px;
		color: black;
	}

	&:hover {
		filter: brightness(80%);
	}
`;
