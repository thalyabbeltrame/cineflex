import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SubHeader from './SubHeader';
import Session from './Session';
import Footer from './Footer';

export default function Movie({ setScreen }) {
	const { movieId } = useParams();
	const [generalMovieInfos, setGeneralMovieInfos] = useState({});
	const [movieSessions, setMovieSessions] = useState([]);

	useEffect(() => {
		axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`).then((response) => {
			setGeneralMovieInfos(response.data);
			setMovieSessions(response.data.days);
			setScreen('Movie');
		});
	}, []);

	return (
		<Container>
			<SubHeader text={'Selecione o horário'} screen={'Movie'} />
			<Content>
				{movieSessions.map((day) => (
					<MovieSession key={day.id}>
						<Day>{`${day.weekday} - ${day.date}`}</Day>
						<Showtimes>
							{day.showtimes.map((showtime) => (
								<Link key={showtime.id} to={`/assentos/${showtime.id}`} element={<Session />}>
									<Button>{showtime.name}</Button>
								</Link>
							))}
						</Showtimes>
					</MovieSession>
				))}
			</Content>
			<Footer
				movieImage={generalMovieInfos.posterURL}
				movieTitle={generalMovieInfos.title}
				movieDate={''}
				movieShowtime={''}
			/>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 24px;
	margin-bottom: 117px;
`;

const MovieSession = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	height: 80px;
	margin-bottom: 28px;
`;

const Day = styled.h3`
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	letter-spacing: 0.02em;
	color: #293845;
`;

const Showtimes = styled.div`
	display: flex;
	flex-direction: row;
`;

const Button = styled.button`
	width: 83px;
	height: 43px;
	background-color: #e8833a;
	border: none;
	border-radius: 3px;
	margin-right: 8px;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.02em;
	color: #ffffff;
	cursor: pointer;

	&:hover {
		filter: brightness(70%);
	}
`;
