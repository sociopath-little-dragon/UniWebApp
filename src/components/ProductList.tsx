// src/components/ProductList.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

interface ProductListProps {
    products: Product[];
    onAddToCart: (item: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => (
    <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map(product => (
                <Col key={product.id}>
                    <ProductCard
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        imageUrl={product.image}
                        // передаём функцию один товар
                        onAdd={() => onAddToCart(product)}
                    />
                </Col>
            ))}
        </Row>
    </Container>
);

export default ProductList;
