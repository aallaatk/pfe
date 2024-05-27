import React from 'react';
import { Link } from 'react-router-dom';
import homerIcon from '../assets/home.png';
import cart from '../assets/cart.png';
import tourIcon from '../assets/tour.png';

interface LogoutProps {
  logout: () => void;
}

const DashboardSideBar: React.FC<LogoutProps> = ({ logout }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white m-0 p-0" style={{ width: '280px' }}>
      {/* Sidebar header/logo */}
      <span className="h2 text-center">General</span>
      <hr />
      {/* Sidebar navigation links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/user/info">
            <img src={homerIcon} alt="Home Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Info
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
          <ul className="dropdown-menu">
            <li>
              <Link to="/user/tour/create" className="dropdown-item">
                Create a tour
              </Link>
            </li>
            <li>
              <Link to="/user/tour/created-tours" className="dropdown-item">
                Created Tours
              </Link>
            </li>
            <li>
              <Link to="/user/tour/reserved" className="dropdown-item">
                Reserved tours
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/guiders">
            <img src={cart} alt="Guiders Icon" className="me-2" style={{ width: '30px', height: '30px' }} />
            Cart
          </Link>
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
