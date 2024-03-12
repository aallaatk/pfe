import Button from "./Button"
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home"><img src={logo} style={{width:"130px",height:"10%"}} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link className="nav-link" to="/tours">Tours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sites">Sites</Link>
            </li>         
            <li className="nav-item">
              <Link className="nav-link" to="/guiders">Guiders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <Button text={"Sign Up"} bclass={" btn btn-grad m-1 "}/>
          <Button text={"Log In"} bclass={" btn btn-grad m-1 "}/>
        </div>
      </div>
    </nav>
  );
}

export default Header;
