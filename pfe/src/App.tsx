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
import DashboardTours from './Components/DashboardTours';
import Create from './Components/Create';
import Home from './Pages/Home';
import DashboardUsers from './Components/DashboardUsers';
import DashboardGuiders from './Components/DashboardGuiders';
import AdminDashboard from './Pages/AdminDashboard';
import DashboardHeader from './Components/DashboardHeader';
import DashboardSideBar from './Components/DahsboardSideBar';
import DashboardStats from './Components/DashboardStats';
import CreateSite from './Components/CreateSite';
import DashboardSites from './Components/DashboardSites';
import SiteDetails from './Components/SiteDestails';
// import CreateSite from './Components/CreateSite';


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
              
              {/* Admin Dashboard Routes */}
              {isAdmin && (
                <>
                <Route path="/dashboard/stats" element={<DashboardStats />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard/users" element={<DashboardUsers />} />
                  <Route path="/dashboard/guiders" element={<DashboardGuiders />} />
                  <Route path="/dashboard/tours" element={<DashboardTours />} />
                  <Route path="/dashboard/sites" element={<DashboardSites />} />
                  <Route path="/dashboard/tours/create" element={<Create />} />
                  <Route path="/dashboard/sites/create" element={<CreateSite />} />
                </>
              )}

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
