import React from 'react';
import './App.css';
import CashAccelerationPage from './pages/CashAccelerationPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewCashKickPage from './pages/NewCashKickPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new-cash-kick" element={<NewCashKickPage />} />
            <Route
                path="/cash-acceleration"
                element={<CashAccelerationPage />}
            />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
        </Routes>
    );
};

export default App;
