import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface SiteFormData {
  sitename: string;
  sitedescription: string;
  sitelocation: string;
  siteimages: string[]; // This should be an array of URLs
}

const CreateSite: React.FC = () => {
  const initialFormData: SiteFormData = {
    sitename: "",
    sitedescription: "",
    sitelocation: "",
    siteimages: [], // Initialize as empty array
  };

  const [siteData, setSiteData] = useState<SiteFormData>(initialFormData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSiteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles: FileList = files;

    const uploadedImages: string[] = [];
    for (const file of selectedFiles) {
      try {
        const formDataForUpload = new FormData();
        formDataForUpload.append("file", file);

        const cloudinaryCloudName = "dpnba7vok";
        const uploadPreset = "tuzria4w";

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          formDataForUpload,
          {
            params: {
              upload_preset: uploadPreset,
            },
          }
        );
        console.log('Cloudinary Response:', cloudinaryResponse.data);
        const imageUrl = cloudinaryResponse.data.secure_url;
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setSiteData((prevData) => ({
      ...prevData,
      siteimages: [...prevData.siteimages, ...uploadedImages],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/sites/create", {
        sitename: siteData.sitename,
        sitedescription: siteData.sitedescription,
        sitelocation: siteData.sitelocation,
        siteimages: siteData.siteimages,
      });

      console.log("New site created:", response.data);

      setSiteData(initialFormData); // Reset form state after successful submission
      setShowSuccessMessage(true);

      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating site:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4" style={{ fontWeight: "bold" }}>
        Add New Site
      </h2>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Site created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sitename" className="form-label">
            Site Name
          </label>
          <input
            type="text"
            className="form-control"
            id="sitename"
            name="sitename"
            value={siteData.sitename}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sitedescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="sitedescription"
            name="sitedescription"
            value={siteData.sitedescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sitelocation" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="sitelocation"
            name="sitelocation"
            value={siteData.sitelocation}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Cloudinary Image Upload Input */}
         <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">
          Upload Images
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          onChange={handleImageUpload}
          accept="image/*"
          multiple
        />
      </div>
        {/* Display Uploaded Images */}
        {siteData.siteimages.length > 0 && (
          <div className="row">
            {siteData.siteimages.map((imageUrl, index) => (
              <div key={index} className="col-4 mb-3">
                <img
                  src={imageUrl}
                  alt={`site-${index}`}
                  className="img-fluid"
                />
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSite;
