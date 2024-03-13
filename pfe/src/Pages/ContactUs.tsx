import { contactInfo } from "../functions";
import Button from "../Components/Button";
import Lcu from "../Components/Lcu";
import Rcu from "../Components/Rcu";
function ContactUs() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 p-5">
          <h2 className="text-center mb-3" style={{ color:'#040073', fontSize:'2.5em' }}>Contact Us</h2>
          <Lcu />
        </div>
        <div className="col-md-6 text-center p-5" >
          <h2 className="text-center mb-3" style={{ color:'#040073', fontSize:'2.5em' }}>Contact Info</h2>
          <Rcu {...contactInfo} />
          <div className="mt-5">
          <a href="#" className="me-4 text-reset">
            {/* Facebook icon */}
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            {/* Twitter icon */}
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            {/* Google icon */}
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            {/* Instagram icon */}
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            {/* LinkedIn icon */}
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            {/* GitHub icon */}
            <i className="fab fa-github"></i>
          </a>
        </div>
          <p className="text-center  mt-3" style={{ fontFamily: 'Merriweather, serif', fontSize:'18px', marginBottom: '50px' }}>
            Have a question, feedback, or inquiry?<br /> We're here to help! Feel free to reach out to us at any time.
          </p>
        </div>
      </div>
      <div className="row pl-5 pr-5">
        <Button text={"Send"} bclass={"btn btn-grad"} />
      </div>
    </div>
  );
}

export default ContactUs;
