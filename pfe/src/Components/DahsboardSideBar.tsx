import React from 'react';
import { Link } from 'react-router-dom';
import homerIcon from '../assets/home.png';
import userIcon from '../assets/user.png';
import guiderIcon from '../assets/guider.png';
import tourIcon from '../assets/tour.png';
import calendarIcon from '../assets/calendar.png';

interface LogoutProps {
  logout: () => void;
}

const DashboardSideBar: React.FC<LogoutProps> = ({ logout }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark m-0 p-0" style={{ width: '280px' }}>
      {/* Sidebar header/logo */}
      <span className="h2 text-center">General</span>
      <hr />

      {/* Sidebar navigation links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/stats">
            <img src={homerIcon} alt="Home Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/users">
            <img src={userIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/guiders">
            <img src={guiderIcon} alt="Guiders Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Guiders
          </Link>
        </li>
        <li className="nav-item dropdown">
          {/* Dropdown toggle */}
          <span
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={tourIcon} alt="Tours Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Tours
          </span>

          {/* Dropdown menu */}
          <ul className="dropdown-menu  bg-dark">
            <li>
              <Link to="/dashboard/tours" className="dropdown-item">
                Browse Tours
              </Link>
            </li>
            <li>
              <Link to="/dashboard/tours/create" className="dropdown-item">
                Create a Tour
              </Link>
            </li>
          </ul>
        </li>
        {/* SITE Dropdown */}
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={calendarIcon} alt="Calendar Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Sites
          </span>
          <ul className="dropdown-menu bg-dark">
            <li>
              <Link to="/dashboard/sites" className="dropdown-item">
                Browse Sites
              </Link>
            </li>
            <li>
              <Link to="/dashboard/sites/create" className="dropdown-item">
                Create a site
              </Link>
            </li>
          </ul>
        </li>
        {/* LOGOUT */}
        <li className="nav-item">
          <button onClick={logout} className="nav-link">
            <i className="fa-solid fa-right-from-bracket" style={{ color: '#cc0014' }}></i>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSideBar;



<li className="nav-item">
          <Link className="nav-link" to="/tours">
            <img src={calendarIcon} alt="Calendar Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Calendar
          </Link>
        </li>