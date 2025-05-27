import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

interface LoginProps {
    onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (isRegister) {
            if (!email || !password || !passwordConfirm) {
                setError('Пожалуйста, заполните все поля');
                return;
            }
            if (password !== passwordConfirm) {
                setError('Пароли не совпадают');
                return;
            }
            try {
                const res = await fetch('https://localhost:7074/api/Auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, email, password }),
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || 'Ошибка регистрации');
                }
                // Автоматический вход после регистрации
                const loginRes = await fetch('https://localhost:7074/api/Auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                if (!loginRes.ok) {
                    const text = await loginRes.text();
                    throw new Error(text || 'Ошибка входа после регистрации');
                }
                const data = await loginRes.json();
                // Сохраняем access и refresh токены
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('token', data.accessToken); // для совместимости
                onLogin(data.accessToken);
                navigate('/products');
            } catch (err: any) {
                setError(err.message || 'Ошибка');
            }
        } else {
            if (!email || !password) {
                setError('Пожалуйста, заполните все поля');
                return;
            }
            try {
                const res = await fetch('https://localhost:7074/api/Auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || 'Неверный email или пароль');
                }
                const data = await res.json();
                // Сохраняем access и refresh токены
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('token', data.accessToken); // для совместимости
                onLogin(data.accessToken);
                navigate('/products');
            } catch (err: any) {
                setError(err.message || 'Ошибка входа');
            }
        }
    };

    return (
        <Modal show={true} centered>
            <Modal.Header>
                <Modal.Title>{isRegister ? 'Регистрация' : 'Вход в систему'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {isRegister && (
                        <Form.Group className="mb-3" controlId="formPasswordConfirm">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </Form.Group>
                    )}

                    {error && <p className="text-danger">{error}</p>}

                    <Button variant="primary" type="submit" className="w-100 mb-3">
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form>

                <div className="text-center">
                    {isRegister ? (
                        <>
                            Уже есть аккаунт?{' '}
                            <Button variant="link" onClick={() => setIsRegister(false)}>
                                Войдите
                            </Button>
                        </>
                    ) : (
                        <>
                            Нет аккаунта?{' '}
                            <Button variant="link" onClick={() => setIsRegister(true)}>
                                Зарегистрируйтесь
                            </Button>
                        </>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
