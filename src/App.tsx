import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import Contacts from './components/Contacts';
import BasketPage from './components/BasketPage';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        fetch('https://localhost:7074/api/Products', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token'); // для совместимости, если используешь
        setIsAuthenticated(false);
        setCart([]);
    };

    const handleAddToCart = (product: Product) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            addToCart(product);
        }
    };

    return (
        <>
            <Header
                isAuthenticated={isAuthenticated}
                onLogout={logout}
                cartCount={cart.length}
            />

            <Routes>
                <Route path="/main" element={<Home />} />

                <Route
                    path="/products"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            {loading ? (
                                <p>Загрузка...</p>
                            ) : error ? (
                                <p className="text-danger">{error}</p>
                            ) : (
                                <ProductList products={products} onAddToCart={handleAddToCart} />
                            )}
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/basket"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <BasketPage cart={cart} removeFromCart={removeFromCart} />
                        </PrivateRoute>
                    }
                />

                <Route path="/contacts" element={<Contacts />} />

                <Route
                    path="/login"
                    element={
                        <Login
                            onLogin={token => {
                                localStorage.setItem('accessToken', token);
                                setIsAuthenticated(true);
                                navigate('/products');
                            }}
                        />
                    }
                />

                <Route path="*" element={<Navigate to="/main" replace />} />
            </Routes>
        </>
    );
};

export default App;
