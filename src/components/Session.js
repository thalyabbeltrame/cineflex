import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SubHeader from './SubHeader';
import Footer from './Footer';

export default function Session({ setScreen }) {
	const { sessionId } = useParams();
	const navigate = useNavigate();
	const [showtime, setShowtime] = useState('');
	const [day, setDay] = useState({});
	const [generalMovieInfos, setGeneralMovieInfos] = useState({});
	const [sessionSeats, setSessionSeats] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [nameInput, setNameInput] = useState('');
	const [cpfInput, setCpfInput] = useState('');

	const seatsAvailability = [
		{ text: 'Selecionado', backgroundColor: '#8dd7cf', borderColor: '#1aae9e' },
		{ text: 'Disponível', backgroundColor: '#c3cfd9', borderColor: '#808f9d' },
		{ text: 'Indisponível', backgroundColor: '#fbe192', borderColor: '#f7c52b' },
	];

	useEffect(() => {
		axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`).then((response) => {
			setShowtime(response.data.name);
			setDay(response.data.day);
			setGeneralMovieInfos(response.data.movie);
			setSessionSeats(response.data.seats);
			setScreen('Session');
		});
	}, []);

	const selectSeat = (seatName, seatId, isAvailable) => {
		if (!isAvailable) return alert('Esse assento não está disponível');
		if (selectedSeats.filter((seat) => seat.name === seatName && seat.id === seatId).length) {
			setSelectedSeats(selectedSeats.filter((seat) => seat.name !== seatName && seat.id !== seatId));
		} else {
			setSelectedSeats([...selectedSeats, { name: seatName, id: seatId }]);
		}
	};

	const cpfMask = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1');
	};

	const reserveSeats = (event) => {
		event.preventDefault();

		const request = {
			ids: selectedSeats.map((seat) => seat.id),
			name: nameInput,
			cpf: cpfInput.split(/[.-]+/).join(''),
		};

		axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', request).then(() => {
			navigate('/sucesso', {
				state: {
					title: generalMovieInfos.title,
					day: day.date,
					hour: showtime,
					seats: selectedSeats.map((seat) => seat.name).sort((a, b) => a - b),
					name: nameInput,
					cpf: cpfMask(cpfInput),
				},
			});
		});
	};

	return (
		<Container>
			<SubHeader text={'Selecione o(s) assento(s)'} screen={'Session'} />
			<Content>
				<Seats>
					{sessionSeats.map((seat) => (
						<Seat
							key={seat.id}
							backgroundColor={
								selectedSeats.filter(
									(selectedSeat) => selectedSeat.name === seat.name && selectedSeat.id === seat.id
								).length
									? '#8dd7cf'
									: seat.isAvailable
									? '#c3cfd9'
									: '#fbe192'
							}
							borderColor={
								selectedSeats.filter(
									(selectedSeat) => selectedSeat.name === seat.name && selectedSeat.id === seat.id
								).length
									? '#1aae9e'
									: seat.isAvailable
									? '#808f9d'
									: '#f7c52b'
							}
							onClick={() => selectSeat(seat.name, seat.id, seat.isAvailable)}
						>
							{seat.name}
						</Seat>
					))}
				</Seats>
				<SeatsAvailability>
					{seatsAvailability.map((seat, index) => (
						<SeatAvailability key={index}>
							<Seat backgroundColor={seat.backgroundColor} borderColor={seat.borderColor}>
								{''}
							</Seat>
							<Text>{seat.text}</Text>
						</SeatAvailability>
					))}
				</SeatsAvailability>
				<Form onSubmit={reserveSeats}>
					<label htmlFor='nameInput'>Nome do comprador:</label>
					<input
						type='text'
						id='nameInput'
						value={nameInput}
						placeholder='Digite seu nome...'
						onChange={(e) => setNameInput(e.target.value)}
					/>
					<label htmlFor='cpfInput'>CPF do comprador:</label>
					<input
						type='text'
						id='cpfInput'
						value={cpfInput}
						placeholder='Digite seu CPF...'
						onChange={(e) => setCpfInput(cpfMask(e.target.value))}
					/>
					<button
						type='submit'
						disabled={cpfInput.length !== 14 || nameInput.trim() === '' || selectedSeats.length === 0}
					>
						Reservar assento(s)
					</button>
				</Form>
			</Content>
			<Footer
				movieImage={generalMovieInfos.posterURL}
				movieTitle={generalMovieInfos.title}
				movieDate={day.weekday}
				movieShowtime={showtime}
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
	padding: 0 20.5px;
	margin-bottom: 117px;
`;

const Seats = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
	height: auto;
`;

const Seat = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 26px;
	height: 26px;
	margin: 0px 3.5px 18px 3.5px;
	background-color: ${(props) => props.backgroundColor};
	border-radius: 50%;
	border: 1px solid ${(props) => props.borderColor};
	font-weight: 400;
	font-size: 11px;
	line-height: 13px;
	letter-spacing: 0.04em;
	color: #000000;
	cursor: pointer;
`;

const SeatsAvailability = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 50px;
`;

const SeatAvailability = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 15px;
`;

const Text = styled.h3`
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	color: #4e5a65;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	label {
		width: 100%;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		color: #293845;
	}

	input {
		width: 100%;
		height: 51px;
		background-color: #ffffff;
		border: 1px solid #d5d5d5;
		border-radius: 3px;
		padding: 0 15px;
		margin-bottom: 10px;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		color: #293845;

		&:focus {
			outline: 0;
		}

		&::placeholder {
			font-style: italic;
			color: #afafaf;
		}
	}

	button {
		width: 225px;
		height: 42px;
		background-color: #e8833a;
		border-radius: 3px;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		letter-spacing: 0.04em;
		color: #ffffff;
		border: none;
		cursor: pointer;
		margin: 47px 0 30px 0;
	}
`;
