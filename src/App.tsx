import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import BasketModal from './components/BasketModel.tsx';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<Product[]>([]);
    const [showBasketCart, setShowBasketCart] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7074/api/Products')
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
                return res.json();
            })
            .then((data: Product[]) => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const addToCart = (item: Product) => {
        setCart(prev => [...prev, item]);
    };

    const removeFromBasketCart = (id: number) => {
        setCart(prev => {
            const idx = prev.findIndex(item => item.id === id);
            if (idx < 0) return prev;
            const next = [...prev];
            next.splice(idx, 1);
            return next;
        });
    };

    return (
        <>
            {/* единый вызов Header с обеими пропсами */}
            <Header
                cartCount={cart.length}
                onCartClick={() => setShowBasketCart(true)}
            />

            <main className="container my-4">
                {loading && <p>Загрузка товаров…</p>}
                {error && <p className="text-danger">Ошибка: {error}</p>}
                {!loading && !error && (
                    <ProductList products={products} onAddToCart={addToCart} />
                )}
            </main>

            <BasketModal
                show={showBasketCart}
                onHide={() => setShowBasketCart(false)}
                cart={cart}
                removeFromCart={removeFromBasketCart}
            />
        </>
    );
};

export default App;
