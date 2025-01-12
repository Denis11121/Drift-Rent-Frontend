import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdDetailsPage from './pages/AdDetailsPage';
import AdsPage from './pages/AdsPage';
import UserAccount from './pages/UserAccount';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/ads" element={<AdsPage />} />
                <Route path="/ad/:id" element={<AdDetailsPage />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
