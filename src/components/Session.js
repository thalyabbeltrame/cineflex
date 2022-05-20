import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function Session() {

  const API_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/showtimes';
	const { sessionId } = useParams();
  const [sessionInfos, setSessionInfos] = useState({});
  const [sessionSeats, setSessionSeats] = useState([]);

  useEffect(() => {
		axios.get(`${API_URL}/${sessionId}/seats`).then((response) => {
			setSessionSeats(response.data.seats);
      setSessionInfos(response.data);
		});
	}, []);

  return (
    <></>
  )
}