import styled from 'styled-components';

export default function Footer({ movieImage, movieTitle, movieDate, movieShowtime }) {
	return (
		<Content>
			<Image>
				<img src={movieImage} alt={movieTitle} />
			</Image>
			{movieDate !== '' ? (
				<Text>
					<p>{movieTitle}</p>
					<p>{`${movieDate} - ${movieShowtime}`}</p>
				</Text>
			) : (
				<p>{movieTitle}</p>
			)}
		</Content>
	);
}

const Content = styled.footer`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 117px;
	background-color: #dfe6ed;
	border: 1px solid #9eadba;
	padding: 0 15px;
	font-weight: 400;
	font-size: 26px;
	line-height: 30px;
	color: #293845;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 1;
`;

const Image = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 64px;
	height: 89px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 2px;
	margin-right: 14px;

	img {
		width: 48px;
		height: 72px;
		color: black;
	}
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
`;
