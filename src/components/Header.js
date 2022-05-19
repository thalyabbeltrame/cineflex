import styled from 'styled-components';

export default function Header() {
	return <Content>CINEFLEX</Content>;
}

const Content = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 67px;
	background-color: #c3cfd9;
	font-weight: 400;
	font-size: 34px;
	line-height: 40px;
	color: #e8833a;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;
