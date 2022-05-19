import styled from 'styled-components';

export default function SubHeader({ text }) {
	return <Content>{text}</Content>;
}

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 110px;
	font-weight: 400;
	font-size: 24px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: #293845;
	margin-top: 67px;
`;
