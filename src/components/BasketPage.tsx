import React, { useState } from 'react';
import { Container, ListGroup, Button, Modal } from 'react-bootstrap';

interface BasketPageProps {
    cart: { id: number; title: string; price: number }[];
    removeFromCart: (id: number) => void;
}

const BasketPage: React.FC<BasketPageProps> = ({ cart, removeFromCart }) => {
    const [showPayment, setShowPayment] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <Container className="my-4">
            <h1>Корзина</h1>
            {cart.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <>
                    <ListGroup variant="flush">
                        {cart.map(item => (
                            <ListGroup.Item
                                key={item.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{item.title}</strong>
                                    <div>{item.price.toFixed(2)} $</div>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Удалить
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <strong>Итого: {total.toFixed(2)} $</strong>
                        <Button variant="primary" onClick={() => setShowPayment(true)}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
            )}

            <Modal show={showPayment} onHide={() => setShowPayment(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Оплата заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Здесь будет форма ввода платёжных данных (заглушка).</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPayment(false)}>
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            alert('Заказ оформлен!');
                            setShowPayment(false);
                        }}
                    >
                        Оплатить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BasketPage;