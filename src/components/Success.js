import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubHeader from './SubHeader';

export default function Success({ setScreen }) {
	const { state } = useLocation();
	const navigate = useNavigate();

	useEffect(() => setScreen('Success'));

	const backToHome = () => {
		navigate('/');
	};

	return (
		<Container>
			<SubHeader text={'Pedido feito com sucesso!'} screen={'Success'} />
			<Content>
				<BoldText>Filme e sessão</BoldText>
				<NormalText>{state.title}</NormalText>
				<NormalText>{`${state.day} ${state.hour}`}</NormalText>
				<BoldText>Ingressos</BoldText>
				{state.seats.map((seat) => (
					<NormalText>{`Assento ${seat}`}</NormalText>
				))}
				<BoldText>Comprador</BoldText>
				<NormalText>{`Nome: ${state.name}`}</NormalText>
				<NormalText>{`CPF: ${state.cpf}`}</NormalText>
				<Button onClick={backToHome}>{'Voltar para Home'}</Button>
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
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 0 28px;
`;

const BoldText = styled.h3`
	width: 100%;
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: #293845;
	margin: 30px 0 10px 0;
`;

const NormalText = styled.h4`
	width: 100%;
	font-weight: 400;
	font-size: 22px;
	line-height: 26px;
	letter-spacing: 0.04em;
	color: #293845;
`;

const Button = styled.button`
	width: 225px;
	height: 42px;
	background: #e8833a;
	border-radius: 3px;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.04em;
	color: #ffffff;
	margin-top: 80px;
	border: none;
	cursor: pointer;

	&:hover {
		filter: brightness(80%);
	}
`;
