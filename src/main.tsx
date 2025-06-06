import 'bootstrap/dist/css/bootstrap.min.css';
// import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // ← вот он
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')!).render(<App />)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);