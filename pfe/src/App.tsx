import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Home from './Pages/Home';
import Sites from './Pages/Sites';
import TopContact from './Components/TopContact';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Tours from './Pages/Tours';
import TourDetails from './Components/TourDetails';
import { contactInfo } from './functions';
import AdminDashboard from './Pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <TopContact {...contactInfo} />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminDashboard />} />
                {/* Default route (redirect to login if path doesn't match) */}
                <Route path="*" element={<Login />} />
        {/* Admin Dashboard Route */}

      </Routes>
      <Footer {...contactInfo} />
    </Router>
  );
};

export default App;


