import styled from 'styled-components';

export default function SubHeader({ text, screen }) {
	return (
		<Content color={screen === 'Success' ? '#247a6b' : '#293845'} fontWeight={screen === 'Success' ? 700 : 400}>
			{text}
		</Content>
	);
}

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: 110px;
	padding: 0 15px;
	font-weight: ${(props) => props.fontWeight};
	font-size: 24px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: ${(props) => props.color};
	margin-top: 67px;
`;
