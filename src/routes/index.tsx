import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Term from '../pages/Term';
import Home from '../pages/Home';
// import Login from '../pages/Login';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/term" element={<Term />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;