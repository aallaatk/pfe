import React, { useState } from 'react';

interface GuiderProps {
  name: string;
  age: number;
  languages: string[];
  rating: number;
  about: string;
  email: string;
  gsm: number;
  img: string;
  id: string; 
}

const Guider: React.FC<GuiderProps> = ({ name, age, languages, rating, about, email, gsm, img, id }: GuiderProps) => {
  const [contactExpanded, setContactExpanded] = useState<boolean>(true);
  const [aboutExpanded, setAboutExpanded] = useState<boolean>(false);
  const contactInfoId = `contactInfoCollapse-${id}`;
  const aboutId = `aboutCollapse-${id}`;

  const handleContactCollapse = () => {
    setContactExpanded(!contactExpanded);
  };

  const handleAboutCollapse = () => {
    setAboutExpanded(!aboutExpanded);
  };

  return (
    <div className="card" style={{ width: "100%" }}>
      <img src={img} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '350px' }} />
      <div className="card-body">
        <h5 className="card-title text-center" style={{fontWeight:'bold', color:'#040073', fontSize:'24px'}}>{name}</h5>
        <h5><span style={{fontWeight:'bold', color:'#040073', fontSize:'24px'}}>Age: </span>{age}</h5>
        <h5><span style={{fontWeight:'bold', color:'#040073', fontSize:'24px'}}>Languages: </span>{languages.join(", ")}</h5>
        <h5><span style={{fontWeight:'bold', color:'#040073', fontSize:'24px'}}>Rating: </span>{rating} <i className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i></h5>
        <div className="row">
          <div className="col">
            <button  style={{color:'white'}}    className="btn btn-grad mb-2" type="button" onClick={handleContactCollapse}>
              Contact
            </button>
          </div>
          <div className="col">
            <button  style={{color:'white'}}  className="btn btn-grad mb-2" type="button" onClick={handleAboutCollapse}>
              About
            </button>
          </div>
        </div>
        <div className={`row mt-3 ${contactExpanded ? '' : 'd-none'}`}>
          <div className="col">
            <div className={`collapse multi-collapse${contactExpanded ? ' show' : ''}`} id={contactInfoId}>
              <div className="card card-body">
                <p><span style={{fontWeight:'bold', color:'#040073', fontSize:'18px'}}>Email: </span>{email}</p>
                <p><span style={{fontWeight:'bold', color:'#040073', fontSize:'18px'}}>Phone Number:</span> +216 {gsm}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`row mt-3 ${aboutExpanded ? '' : 'd-none'}`}>
          <div className="col">
            <div className={`collapse multi-collapse${aboutExpanded ? ' show' : ''}`} id={aboutId}>
              <div className="card card-body">
                <p>{about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guider;
