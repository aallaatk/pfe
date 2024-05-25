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
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredSites = sitesData.filter((site) =>
    site.sitename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore Sites</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search sites by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredSites.length > 0 ? (
        <div className="row">
          {filteredSites.map((site) => (
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
