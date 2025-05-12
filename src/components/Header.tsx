// src/components/Header.tsx
import React from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
            <Navbar.Brand href="/main">My Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/main">Главная</Nav.Link>
                    <Nav.Link href="/products">Товары</Nav.Link>
                    <Nav.Link href="/contacts">Контакты</Nav.Link>
                </Nav>
                <Nav>
                    {/* теперь onClick берём из пропсов */}
                    <Nav.Link onClick={onCartClick} style={{ cursor: 'pointer' }}>
                        Корзина <Badge bg="info">{cartCount}</Badge>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default Header;
