import React from 'react';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => (
    <Container className="my-4">
        <h1>Добро пожаловать в My Shop!</h1>
        <p>Здесь вы найдёте лучшие товары по отличным ценам.</p>
    </Container>
);

export default Home;