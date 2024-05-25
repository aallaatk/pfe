import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import TourDetails from './Components/TourDetails';
import Home from './Pages/Home';
import DashboardHeader from './Components/DashboardHeader';
import DashboardSideBar from './Components/DahsboardSideBar';
import DashboardStats from './Components/DashboardStats';
import DashboardUsers from './Components/DashboardUsers';
import DashboardGuiders from './Components/DashboardGuiders';
import DashboardTours from './Components/DashboardTours';
import Create from './Components/Create';
import CreateSite from './Components/CreateSite';
import DashboardSites from './Components/DashboardSites';
import SiteDetails from './Components/SiteDestails';
import GuiderDashboard from './Pages/GuiderDashboard';
import UserDasboard from './Pages/UserDasboard';

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="stats" element={<DashboardStats />} />
      <Route path="users" element={<DashboardUsers />} />
      <Route path="guiders" element={<DashboardGuiders />} />
      <Route path="tours" element={<DashboardTours />} />
      <Route path="sites" element={<DashboardSites />} />
      <Route path="tours/create" element={<Create />} />
      <Route path="sites/create" element={<CreateSite />} />
      <Route path="*" element={<Navigate to="stats" />} />
    </Routes>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
 
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (role: string) => {
    if (role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAdmin(false);
  };

  return (
    <Router>
      {!isAdmin && <TopContact {...contactInfo} />}
      {!isAdmin && <Header />}
      
      <div className="container-fluid">
        {isAdmin && (
          <div className="row justify-content-center ">
            <div className="col-12 m-0 p-0">
              <DashboardHeader />
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          {isAdmin && (
            <div className="col-3 p-0">
              <DashboardSideBar logout={logout} />
            </div>
          )}

          <div className={isAdmin ? 'col-9' : 'col-12'}>
            <Routes>
              {/* Public Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tour/:id" element={<TourDetails />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/sites/:id" element={<SiteDetails  />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/guide" element={<GuiderDashboard />} />
              <Route path="/user" element={<UserDasboard />} />
              
              {/* Admin Dashboard Routes */}
              {isAdmin && <Route path="dashboard/*" element={<DashboardRoutes />} />}

              {/* Default route (redirect to home if path doesn't match) */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {!isAdmin && <Footer {...contactInfo} />}
    </Router>
  );
}

export default App;
