import React from 'react';
import { Link } from 'react-router-dom';

interface SiteProps {
  siteimages: string[];
  id: string;
}

const Site: React.FC<SiteProps> = ({ siteimages, id }) => {
  return (
    <div className="image-container">
      {siteimages.length > 0 && (
        <img
          src={siteimages[0]}
          className="card-img-top"
          alt="site"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      )}
      <Link to={`/sites/${id}`} className="info-button" style={{textDecoration:'none'}}>
        View Details
      </Link>
    </div>
  );
};

export default Site;
