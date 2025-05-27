import React from 'react';
import { Container } from 'react-bootstrap';

const Contacts: React.FC = () => (
    <Container className="my-4">
        <h1>Контакты</h1>
        <p>Email: contact@myshop.com</p>
        <p>Телефон: +7 (123) 456-78-90</p>
        <p>Адрес: г. Москва, ул. Примерная, д. 1</p>
    </Container>
);

export default Contacts;