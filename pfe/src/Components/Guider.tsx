import React from 'react';

interface GuiderProps {
  name: string;
  age: number;
  languages: string[];
  rating: number;
  about: string;
  email: string;
  gsm: number;
}

const Guider: React.FC<GuiderProps> = ({ name, age, languages, rating, about, email, gsm }: GuiderProps) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <h5>Age: {age}</h5>
        <h5>Languages: {languages.join(", ")}</h5>
        <h5>Rating: {rating} <i className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i></h5>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#contactInfoCollapse" aria-expanded="false" aria-controls="contactInfoCollapse">
              Contact
            </button>
          </div>
          <div className="col">
            <button className="btn btn-primary mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#aboutCollapse" aria-expanded="false" aria-controls="aboutCollapse">
              About
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="collapse multi-collapse" id="contactInfoCollapse">
              <div className="card card-body">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {gsm}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="collapse multi-collapse" id="aboutCollapse">
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
