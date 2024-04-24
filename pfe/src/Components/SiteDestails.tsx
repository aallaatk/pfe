import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface SiteDetailsData {
  sitename: string;
  sitedescription: string;
  sitelocation: string;
  siteimages: string[];
}

const SiteDetails: React.FC = () => {
  const [siteDetails, setSiteDetails] = useState<SiteDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null); // State for main image

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const response = await axios.get<SiteDetailsData>(
          `http://localhost:3000/sites/${id}`
        );
        setSiteDetails(response.data);
        // Set the initial main image as the first image from site details
        if (response.data.siteimages.length > 0) {
          setMainImage(response.data.siteimages[0]);
        }
      } catch (error) {
        console.error("Error fetching site details:", error);
        setSiteDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetails();
  }, [id]);

  const handleImageClick = (image: string) => {
    // Set the clicked image as the main image
    setMainImage(image);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!siteDetails) {
    return <div>Error fetching site details. Please try again later.</div>;
  }

  const { sitename, sitedescription, sitelocation, siteimages } = siteDetails;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left half: Display the main image */}
        <div className="col-md-7 mb-3">
          {mainImage && (
            <img
              src={mainImage}
              alt={`${sitename} Main Image`}
              className="img-fluid rounded"
              style={{height: '550px', width: '100%'}}
            />
          )}
        </div>

        {/* Right half: Display site details */}
        <div className="col-md-5">
          <h2>{sitename}</h2>
          <p>
            <strong>Description:</strong> {sitedescription}
          </p>
          <p>
            <strong>Location:</strong> {sitelocation}
          </p>
        </div>
      </div>

      {/* Display the rest of the images in a row */}
      <div className="row">
        {siteimages.map((image, index) => (
          <div key={index} className="col-md-2 mb-3">
            <img
              src={image}
              alt={`${sitename} Image ${index + 1}`}
              className="img-thumbnail"
              style={{ width: "200px", height: "200px", objectFit: "cover", cursor: "pointer" }}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteDetails;
