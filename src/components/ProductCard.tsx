import React from 'react';
import {Card, Button} from 'react-bootstrap';

interface ProductCardProps {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    onAdd: () => void;        // ← новая пропса
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     title,
                                                     description,
                                                     price,
                                                     imageUrl,
                                                     onAdd
                                                 }) => (
    <Card className="h-100">
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={title}/>}
        <Card.Body className="d-flex flex-column">
            <Card.Title>{title}</Card.Title>
            <Card.Text className="flex-grow-1">{description}</Card.Text>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="fw-bold">{price} $</span>
                {/* По-умолчанию это «Купить» */}
                <Button variant="primary" onClick={onAdd}>
                    Купить
                </Button>
            </div>
        </Card.Body>
    </Card>
);

export default ProductCard;
