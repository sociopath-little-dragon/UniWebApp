import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // если не авторизован — редирект на /login
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
