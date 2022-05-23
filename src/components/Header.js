import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';

export default function Header({ screen }) {
	const navigate = useNavigate();
	const router = useLocation().pathname;

	return (
		<Content>
			{router !== '/' ? (
				<IconContext.Provider value={{ className: 'icon', color: '#e8833a', size: '40px' }}>
					<IoChevronBackOutline onClick={() => navigate(-1)} />
				</IconContext.Provider>
			) : null}
			<Text>CINEFLEX</Text>
		</Content>
	);
}

const Content = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 67px;
	background-color: #c3cfd9;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;

const Text = styled.h1`
	font-weight: 400;
	font-size: 34px;
	line-height: 40px;
	color: #e8833a;
`;
