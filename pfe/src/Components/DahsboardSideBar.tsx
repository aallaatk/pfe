import { Link } from 'react-router-dom';
import homerIcon from '../assets/home.png';
import userIcon from '../assets/user.png';
import guiderIcon from '../assets/guider.png';
import tourIcon from '../assets/tour.png';
import calendarIcon from '../assets/calendar.png';
interface LogoutProps {
  logout: () => void;
}
const DashboardSideBar: React.FC<LogoutProps> = ({logout}) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-light" style={{ width: '280px' }}>
      {/* Sidebar header/logo */}
      <span className='h2 text-center'>General</span>
      <hr />

      {/* Sidebar navigation links */}
      <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
              <Link className="nav-link" to="/tours">
              <img src={homerIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />Home</Link>
            
        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/dashboard/users">
              <img src={userIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />Users</Link>
            
        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/dashboard/guiders">
              <img src={guiderIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />Guiders</Link>
            
        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/dashboard/tours">
              <img src={tourIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />Tours</Link>
            
        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/tours">
              <img src={calendarIcon} alt="Users Icon" className="me-2" style={{ width: '30px', height: '30px' }} />Calendar</Link>
        </li>
        <li className="nav-item 'me-2'">
             <button onClick={logout} ><i className="fa-solid fa-right-from-bracket " style={{color: '#cc0014'}}></i>Log out</button>
        </li>
      </ul>
     
    </div>
  );
};

export default DashboardSideBar;
