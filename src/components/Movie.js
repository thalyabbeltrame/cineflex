import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SubHeader from './SubHeader';
import Session from './Session';
import Footer from './Footer';

export default function Movie() {
	const API_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/movies';
	const { movieId } = useParams();
	const [movieSessions, setMovieSessions] = useState([]);
  const [movieInfos, setMovieInfos] = useState({});

	useEffect(() => {
		axios.get(`${API_URL}/${movieId}/showtimes`).then((response) => {
      setMovieInfos(response.data);
			setMovieSessions(response.data.days);
		});
	}, []);

	return (
		<Container>
			<SubHeader text={'Selecione o horário'} />
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
			<Footer movieInfos={movieInfos}/>
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
	height: 100px;
	margin-bottom: 29px;
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
	background: #e8833a;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	margin-right: 8px;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.02em;
	color: #ffffff;

  &:hover {
    filter: brightness(70%);
  }
`;
