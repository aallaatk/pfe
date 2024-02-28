import Button from "./Button"
import logo from '../assets/logo.png'
function Header() {
  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} style={{width:"130px",height:"10%"}} alt="logo" /> </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
       
        <li className="nav-item">
          <a className="nav-link" href="#" >Tours</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Sites</a>
        </li>         
        <li className="nav-item">
          <a className="nav-link" href="#">guiders</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        {/* <li className="nav-item">
         
        </li> 
        <li className="nav-item">
       
        </li>   */}
      </ul>
      <Button text={"Sign Up"} bclass={" btn btn-grad m-1 "}/>
      <Button text={"Log In"} bclass={" btn btn-grad m-1 "}/>
    </div>
  </div>
</nav>
  )
}

export default Header