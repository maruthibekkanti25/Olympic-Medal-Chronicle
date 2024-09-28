import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Overall from './pages/Overall';
import Athletes from './pages/AthleteList';
import Countrywise from './pages/Countrywise';
import Sportwise from './pages/Sportwise';
import AthleteDashboard from './pages/AthleteDashboard';
import RoleSelection from './pages/Roleselection';
import AdminLogin from './pages/AdminLogin';
import EventManagerLogin from './pages/EventManagerLogin';
import AdminDashboard from './pages/AdminDashboard'; 
import EventManagerDashboard from './pages/EventManagerDashboard'; 
import './styles/App.css';

const App = () => {
    const location = useLocation();
    const noHeaderRoutes = ['/role-selection', '/admin-dashboard', '/eventmanager-dashboard'];
    return (
        <div className="app">
            {!noHeaderRoutes.includes(location.pathname) && <Header />}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/overall" element={<Overall />} />
                    <Route path="/athletes" element={<Athletes />} />
                    <Route path="/role-selection" element={<RoleSelection />} />
                    <Route path="/countrywise" element={<Countrywise />} />
                    <Route path="/sportwise" element={<Sportwise />} />
                    <Route path="/athletes/:id" element={<AthleteDashboard />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route path="/eventmanagerlogin" element={<EventManagerLogin />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/eventmanager-dashboard" element={<EventManagerDashboard />} />
                </Routes>
            </main>
            {!noHeaderRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
