import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import tour from '../assets/tour.png'
import user from '../assets/user.png'
import guider from '../assets/guider.png'
import calendar from '../assets/calendar.png'
import { Link } from 'react-router-dom';
function SideBar() {
  return (
    <div className='sidebar'>
    <Sidebar>
    <Menu>
   
      <SubMenu label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={user} alt="Tour Icon" style={{width: '30px', height: '30px', marginRight: '8px' }} />
              <span>Users</span>
            </div>
          }> 
        <MenuItem> Browse users </MenuItem>
        <Link to="/create"><MenuItem> Create a user </MenuItem></Link>
        
      </SubMenu>
      <MenuItem> <img src={guider} alt="tour" style={ { width: '30px', height: '30px', marginRight: '8px' }} />Guiders </MenuItem>
      <SubMenu label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={tour} alt="Tour Icon" style={{width: '30px', height: '30px' ,marginRight: '8px' }} />
              <span>Tours</span>
            </div>
          }> 
        <MenuItem> Browse tours </MenuItem>
        <MenuItem> Create a tour </MenuItem>
      </SubMenu>
      <MenuItem><img src={calendar} alt="tour" style={ { width: '30px', height: '30px',  marginRight: '3px'}} /> Calendar </MenuItem>
     
    </Menu>
  </Sidebar></div>
  )
}

export default SideBar