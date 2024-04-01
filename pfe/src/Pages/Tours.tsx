import { useState, useEffect } from 'react';
import axios from 'axios';
import Tour from '../Components/Tour';
import { TourInfo } from '../functions';

function Tours() {
    const [tours, setTours] = useState<TourInfo[]>([]);
  
    useEffect(() => {
      const fetchTours = async () => {
        try {
          const response = await axios.get<TourInfo[]>('/api/tours');
          setTours(response.data);
        } catch (error) {
          console.error('Error fetching tours:', error);
        }
      };
      fetchTours();
    }, []);
  
    return (
        <div className="container">
          <h2 className='text-center mt-2'>Available Tours</h2>
          <div className="row mt-5">
            {Array.isArray(tours) && tours.length > 0 ? (
              tours.map((tour) => (
                <div className="col-md-4" key={tour.tourname}>
                  <Tour
                    tourname={tour.tourname}
                    creator={tour.creator}
                    date={tour.date}
                    price={tour.price}
                    image={tour.image}
                    description={tour.description}
                    attendees={tour.attendees} location={''} duration={''}                  />
                </div>
              ))
            ) : (
              <p style={{fontWeight:'bold',fontSize:'22px'}}>No tours available</p>
            )}
          </div>
        </div>
      );
      
  }
  
  export default Tours;
