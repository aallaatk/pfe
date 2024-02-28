import { Contact } from "./TopContact";

const Footer = ({phone,email,address}:Contact) => {
  return (
    <footer className="bg-light text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
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
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4"><i className="fas fa-gem me-3"></i>
                Tunisian heritage djerba
              </h6>
              <p>
             Tunisian heritage Djerba, offers seamless booking for guided tours in the picturesque island of Djerba, Tunisia, ensuring an enriching travel experience with knowledgeable local guides.
              </p>
            </div>

            {/* Products */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Sites</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Houmt Souk
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                El Ghriba synagogue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Djerba Explore Park
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Sentido Djerba Beach
                </a>
              </p>
            </div>

            {/* Useful links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </div>

            {/* Contact */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-2"></i>
                {address}
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                {email}
              </p>
              <p>
                <i className="fas fa-phone me-3"></i>+216 {phone}
              </p>
              
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-primary" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'white' }}>
        © {new Date().getFullYear()} TH Djerba | All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
