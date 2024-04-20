import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import tour from '../assets/tour.png';
import user from '../assets/user.png';
import guider from '../assets/guider.png';
import calendar from '../assets/calendar.png';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className='sidebar'>
      <Sidebar>
        <Menu>
          <SubMenu
            label={
              <Link to="/dashboard/users">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={user} alt="User Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                  <span>Users</span>
                </div>
              </Link>
            }
          >
            <Link to="/dashboard/users">
              <MenuItem>Browse users</MenuItem>
            </Link>
            <Link to="/dashboard/user/create">
              <MenuItem>Create a user</MenuItem>
            </Link>
          </SubMenu>
          <Link to="/dashboard/guiders">
            <MenuItem>
              <img src={guider} alt="Guider Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
              Guiders
            </MenuItem>
          </Link>
          <SubMenu
            label={
              <Link to="/dashboard/tours">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={tour} alt="Tour Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                  <span>Tours</span>
                </div>
              </Link>
            }
          >
            <Link to="/dashboard/tours">
              <MenuItem>Browse tours</MenuItem>
            </Link>
            <Link to="/tours/create">
              <MenuItem>Create a tour</MenuItem>
            </Link>
          </SubMenu>
          <Link to="/dashboard/calendar">
            <MenuItem>
              <img src={calendar} alt="Calendar Icon" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
              Calendar
            </MenuItem>
          </Link>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
