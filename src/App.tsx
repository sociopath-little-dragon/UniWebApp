// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
// убрали { Product as CartProduct } — он не использовался
import CartModal from './components/CartModel';

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

    // состояние корзины
    const [cart, setCart] = useState<Product[]>([]);
    // состояние видимости модального окна корзины
    const [showCart, setShowCart] = useState(false);

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

    const removeFromCart = (id: number) => {
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
                onCartClick={() => setShowCart(true)}
            />

            <main className="container my-4">
                {loading && <p>Загрузка товаров…</p>}
                {error && <p className="text-danger">Ошибка: {error}</p>}
                {!loading && !error && (
                    <ProductList products={products} onAddToCart={addToCart} />
                )}
            </main>

            <CartModal
                show={showCart}
                onHide={() => setShowCart(false)}
                cart={cart}
                removeFromCart={removeFromCart}
            />
        </>
    );
};

export default App;
