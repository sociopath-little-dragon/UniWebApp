import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

export interface Product {
    id: number;
    title: string;
    price: number;
}

interface BasketModalProps {
    show: boolean;
    onHide: () => void;
    cart: Product[];
    removeFromCart: (id: number) => void;
}

const CartModal: React.FC<BasketModalProps> = ({
                                                 show,
                                                 onHide,
                                                 cart,
                                                 removeFromCart
                                             }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ваша корзина</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <ListGroup variant="flush">
                        {cart.map((item, idx) => (
                            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong>
                                    <div>{item.price} $</div>
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
                )}
            </Modal.Body>
            {cart.length > 0 && (
                <Modal.Footer>
                    <div className="me-auto">
                        <strong>Итого: {total.toFixed(2)} $</strong>
                    </div>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default CartModal;
