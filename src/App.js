import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdsPage from './pages/AdsPage';
import UserAccount from './pages/UserAccount';
import AdDetailsPage from './pages/AdDetailsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ads" element={<AdsPage />} />
                <Route path="/ad/:adId" element={<AdDetailsPage />} />
                <Route path="/account" element={<UserAccount />} />
            </Routes>
        </Router>
    );
}

export default App;
