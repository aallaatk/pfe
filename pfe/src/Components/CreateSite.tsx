import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Image {
  publicId: string;
  url: string;
}

interface SiteFormData {
  sitename: string;
  description: string;
  location: string;
  images: Image[];
}

const CreateSite: React.FC = () => {
  const initialFormData: SiteFormData = {
    sitename: "",
    description: "",
    location: "",
    images: [],
  };

  const [siteData, setSiteData] = useState<SiteFormData>(initialFormData);

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

    const selectedFile = files[0];

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append("file", selectedFile);

      const cloudinaryCloudName = "dpnba7vok"; // Cloudinary cloud name
      const uploadPreset = "tuzria4w"; // Cloudinary upload preset

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formDataForUpload,
        {
          params: {
            upload_preset: uploadPreset,
          },
        }
      );

      const newImage: Image = {
        publicId: cloudinaryResponse.data.public_id,
        url: cloudinaryResponse.data.secure_url,
      };

      setSiteData((prevData) => ({
        ...prevData,
        images: [...prevData.images, newImage],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/sites", {
        sitename: siteData.sitename,
        description: siteData.description,
        location: siteData.location,
        images: siteData.images.map((image) => image.url),
      });

      console.log("New site created:", response.data);

      // Reset form state after successful submission
      setSiteData(initialFormData);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4" style={{ fontWeight: "bold" }}>
        Add New Site
      </h2>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={siteData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={siteData.location}
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
        {siteData.images.length > 0 && (
          <div className="row">
            {siteData.images.map((image, index) => (
              <div key={index} className="col-4 mb-3">
                <img
                  src={image.url}
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
