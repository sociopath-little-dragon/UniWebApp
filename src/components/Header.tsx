import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';

interface HeaderProps {
    isAuthenticated: boolean;
    onLogout: () => void;
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout, cartCount }) => {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand
                    onClick={() => navigate('/main')}
                    style={{ cursor: 'pointer' }}
                >
                    My Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigate('/main')}
                            style={{ cursor: 'pointer' }}
                        >
                            Главная
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate('/products')}
                            style={{ cursor: 'pointer' }}
                        >
                            Товары
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate('/contacts')}
                            style={{ cursor: 'pointer' }}
                        >
                            Контакты
                        </Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        <Nav.Link
                            onClick={() => navigate('/basket')}
                            style={{ cursor: 'pointer' }}
                            className="position-relative"
                        >
                            Корзина
                            <Badge bg="info" className="ms-1">
                                {cartCount}
                            </Badge>
                        </Nav.Link>
                        {!isAuthenticated ? (
                            <Button
                                variant="outline-light"
                                className="ms-3"
                                onClick={() => navigate('/login')}
                            >
                                Войти
                            </Button>
                        ) : (
                            <Button
                                variant="outline-light"
                                className="ms-3"
                                onClick={() => {
                                    onLogout();
                                    navigate('/login');
                                }}
                            >
                                Выйти
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
