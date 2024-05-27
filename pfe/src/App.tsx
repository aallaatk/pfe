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

import Home from './Pages/Home';
import DashboardHeader from './Components/DashboardHeader';
import DashboardStats from './Components/DashboardStats';
import DashboardUsers from './Components/DashboardUsers';
import DashboardGuiders from './Components/DashboardGuiders';

import Create from './Components/Create';
import CreateSite from './Components/CreateSite';
import DashboardSites from './Components/DashboardSites';
import UserDashboardInfo from './Components/UserDashboardInfo';
import UserDashboardSideBar from './Components/UserDashboardSideBar';
import UserDashboardHeader from './Components/UserDashboardHeader';
import UserDashboardCreatedTours from './Components/UserDashboardCreatedTours';
import DashboardReservedTours from './Components/UserDashboardReservedTour';
import SiteDetails from './Components/SiteDestails';
import DashboardSideBar from './Components/DahsboardSideBar';
import GuiderDashboardHeader from './Components/GuiderDashboardHeader';
import GuiderDashboardSideBar from './Components/GuiderDashboardSideBar';
import GuiderDashboardInfo from './Components/GuiderDashboardInfo';
import GuiderDashboardCreatedTours from './Components/GuiderDashboardCreatedTours';

import CalendarComponent from './Components/Calander';

import Cart from './Components/Cart';
import TourDetails from './Components/TourDetails';
import DashboardTours from './Components/DashboardTours';
import Cancel from './Components/Cancel';
import Success from './Components/Succes';

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
      <Route path="calendar" element={<CalendarComponent />} />
      <Route path="*" element={<Navigate to="stats" />} />
    </Routes>
  );
}

function UserDashboardRoutes() {
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="info" element={<UserDashboardInfo />} />
      <Route path="tour/create" element={<Create />} />
      <Route path="tour/created-tours" element={<UserDashboardCreatedTours userId={userId} />} />
      <Route path="tour/reserved" element={<DashboardReservedTours userId={userId} />} />
      <Route path="cart" element={<Cart cart={[]}   />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="*" element={<Navigate to="info" />} />
    </Routes>
  );
}

function GuiderDashboardRoutes() {
  const [guiderId, setGuiderId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    console.log("Guider ID from local storage:", id);
    if (id) {
      setGuiderId(id);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }                                          

  return (
    <Routes>
      <Route path="info" element={<GuiderDashboardInfo />} />
      <Route path="tour/create" element={<Create />} />
      <Route path="tour/created-tours" element={<GuiderDashboardCreatedTours guiderId={guiderId} />} />
      <Route path="tour/reserved" element={<DashboardReservedTours userId={guiderId} />} />
      <Route path="*" element={<Navigate to="info" />} />
    </Routes>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isGuider, setIsGuider] = useState<boolean>(false); // Added isGuider state
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    if (role === 'admin') {
      setIsAdmin(true);
    } else if (role === 'user') {
      setIsUser(true);
    } else if (role === 'guider') { // Set isGuider to true if role is 'guider'
      setIsGuider(true);
    }
    setUserId(id || '');
    setLoading(false);
  }, []);

  const handleLogin = (role: string) => {
    if (role === 'admin') {
      setIsAdmin(true);
      setIsUser(false);
      setIsGuider(false);
    } else if (role === 'user') {
      setIsUser(true);
      setIsAdmin(false);
      setIsGuider(false);
    } else if (role === 'guider') {
      setIsGuider(true);
      setIsAdmin(false);
      setIsUser(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsAdmin(false);
    setIsUser(false);
    setIsGuider(false);
    setUserId('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      {(!isAdmin && !isUser && !isGuider) && (
        <div>
          <TopContact {...contactInfo} />
          <Header />
        </div>
      )}

      <div className="container-fluid">
        {(isAdmin || isUser || isGuider) && (
          <div className="row justify-content-center">
            <div className="col-12 m-0 p-0">
              {isAdmin && <DashboardHeader />}
              {isUser && <UserDashboardHeader userId={userId} />}
              {isGuider && <GuiderDashboardHeader userId={userId} />}
              <Header />
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          {(isAdmin || isUser || isGuider) && (
            <div className="col-3 p-0">
              {isAdmin && <DashboardSideBar logout={logout} />}
              {isUser && <UserDashboardSideBar logout={logout} />}
              {isGuider && <GuiderDashboardSideBar logout={logout} />}
            </div>
          )}

          <div className={isAdmin || isUser || isGuider ? 'col-9' : 'col-12'}>
            <Routes>
              {/* Public Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/tours" element={<Tours />} />
              <Route
                path="/tour/:id"
                element={
                  <TourDetails
                    isAuthenticated={ isUser || isGuider} // Assuming user is authenticated if any of isAdmin, isUser, or isGuider is true
                    userId={userId}
                  />
                }
              />
              <Route path="/sites" element={<Sites />} />
              <Route path="/sites/:id" element={<SiteDetails />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/guider/*" element={<GuiderDashboardRoutes />} />
              <Route path="/user/*" element={<UserDashboardRoutes />} />

              {/* Admin Dashboard Routes */}
              {isAdmin && <Route path="/dashboard/*" element={<DashboardRoutes />} />}

              {/* Default route (redirect to home if path doesn't match) */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </div>
      {(!isAdmin && !isUser && !isGuider) && (
        <div>
          <Footer {...contactInfo} />
        </div>
      )}
    </Router>
  );
}

export default App;
