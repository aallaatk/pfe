import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Sites from './Pages/Sites';
import TopContact from './Components/TopContact';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { contactInfo } from './functions';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Tours from './Pages/Tours';
// import Create from './Components/Create';
import TourDetails from './Components/TourDetails';
import DashboardTours from './Components/DashboardTours';
import Create from './Components/Create';

import AdminDashboard from './Pages/AdminDashboard';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <TopContact {...contactInfo} />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/tours" element={<Tours />} />
        {/* Route for individual tour details */}
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/create" element={<DashboardTours />} />
        <Route path="/tour/create" element={<Create />} />
        <Route path="/admin" element={<AdminDashboard />} />
                {/* Default route (redirect to login if path doesn't match) */}
                <Route path="*" element={<Login />} />
        {/* Admin Dashboard Route */}

      </Routes>
      <Footer {...contactInfo} />
    </Router>
  );
}

export default App;