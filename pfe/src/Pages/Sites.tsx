import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Site from '../Components/Site';


interface SiteData {
  _id: string;
  sitename: string;
  sitedescription: string;
  sitelocation: string;
  siteimages: string[];
}

const Sites: React.FC = () => {
  const [sitesData, setSitesData] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get<SiteData[]>('http://localhost:3000/sites');

        if (Array.isArray(response.data)) {
          setSitesData(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore Sites</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : sitesData.length > 0 ? (
        <div className="row">
          {sitesData.map((site) => (
            <div className="col-md-4 mb-4" key={site._id}>
              <Site id={site._id} siteimages={site.siteimages} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No sites found matching your criteria.</p>
      )}
    </div>
  );
};

export default Sites;
