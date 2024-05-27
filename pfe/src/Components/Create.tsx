import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface NewTour {
  tourname: string;
  creator: string; // should be ObjectId string
  date: string;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  imageUrl: string;
}

const TourForm: React.FC = () => {
  const initialFormData: NewTour = {
    imageUrl: '',
    tourname: '',
    creator: '', // this should be populated with an ObjectId string
    date: new Date().toISOString().split('T')[0],
    price: 0,
    description: '',
    attendees: 0,
    location: '',
    duration: '',
  };

  const [formData, setFormData] = useState<NewTour>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImageFile(selectedFile);
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: URL.createObjectURL(selectedFile),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      console.error('Please select an image');
      return;
    }

    console.log('Collected Tour Data before sending:', formData);

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', imageFile);

      const cloudinaryCloudName = 'dpnba7vok';
      const uploadPreset = 'tuzria4w';

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

      const newTour: NewTour = {
        ...formData,
        imageUrl: cloudinaryResponse.data.secure_url,
      };

      // Assuming you have the user's ID stored in localStorage
      const userId = localStorage.getItem('userId');
      if (userId) {
        newTour.creator = userId;
      }

      const backendResponse = await axios.post('http://localhost:3000/api/tours/create', newTour);

      console.log('Tour created successfully:', backendResponse.data);

      setFormData(initialFormData);
      setImageFile(null); // Reset selected image file
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error creating tour:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
    <div className="row mb-3">
      <label htmlFor="image" className="col-sm-2 col-form-label">
        Tour Image:
      </label>
      <div className="col-sm-10">
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
        />
        {formData.imageUrl && <img src={formData.imageUrl} alt="Tour Preview" className="mt-3" style={{ width: '300px', height: '200px', objectFit: 'cover' }}/>}
      </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="tourname" className="col-sm-2 col-form-label">
          Tour Name:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="tourname"
            name="tourname"
            value={formData.tourname}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="creator" className="col-sm-2 col-form-label">
          Creator:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="creator"
            name="creator"
            value={formData.creator}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="date" className="col-sm-2 col-form-label">
          Date:
        </label>
        <div className="col-sm-10">
          <input
            type="date"
            id="date"
            name="date"
            // Example of type assertion
            value={formData.date}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="description" className="col-sm-2 col-form-label">
          Description:
        </label>
        <div className="col-sm-10">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            rows={3} // Adjust rows as needed
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="price" className="col-sm-2 col-form-label">
          Price:
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="attendees" className="col-sm-2 col-form-label">
          Attendees:
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="location" className="col-sm-2 col-form-label">
          Location:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="duration" className="col-sm-2 col-form-label">
          Duration:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="duration"
            placeholder="example 8h-12h"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      {isSubmitted && (
        <div className="alert alert-success mt-3" role="alert">
          Tour created successfully!
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Create +
      </button>
    </form>
  );
};

export default TourForm;










