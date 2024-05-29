
import React from 'react';

import cust1 from '../assets/cust1.jpg';
import cust2 from '../assets/cust2.jpg';

const CustomerFeedback: React.FC = () => {
  const feedbacks = [
    {
      src: cust1,
      alt: 'Customer 1',
      feedback: 'Amazing place, had a wonderful time!',
      name: 'John Doe',
    },
    {
      src: cust2,
      alt: 'Customer 2',
      feedback: 'A must-visit destination for everyone!',
      name: 'Jane Smith',
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Customer Feedback</h2>
      <div className="row">
        {feedbacks.map((feedback, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="d-flex border rounded p-3" style={{ height: '200px' }}>
              <div className="flex-grow-1 d-flex flex-column justify-content-center">
                <p className="mb-1"><strong>{feedback.name}</strong></p>
                <p className="mb-0">{feedback.feedback}</p>
              </div>
              <div className="ms-3">
                <img 
                  src={feedback.src} 
                  alt={feedback.alt} 
                  className="rounded-circle" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;
