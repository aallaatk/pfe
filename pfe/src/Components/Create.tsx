import React, { useState } from 'react';
import axios from 'axios';
import { TourInfo } from '../functions';

const TourForm: React.FC = () => {
  const [formData, setFormData] = useState<TourInfo>({
    tourname: '',
    creator: '',
    date: '',
    price: 0,
    description: '',
    attendees: 0,
    image: null,
    // Add missing fields here
    location: '',
    duration: '',
    // Add more fields as needed
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, value ? value.toString() : ''); // Check for null value before calling toString()
        }
      });
      const res = await axios.post('http://localhost:3000/api/tours', formDataToSend, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

      console.log(res.data);
      setFormData({
        tourname: '',
        creator: '',
        date: '',
        price: 0,
        description: '',
        attendees: 0,
        image: null,
        location: '', // Provide default value for location
        duration: '', // Provide default value for duration
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row mb-3">
        <label htmlFor="image" className="col-sm-2 col-form-label">Tour Image:</label>
        <div className="col-sm-10">
          <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="tourname" className="col-sm-2 col-form-label">Tour Name:</label>
        <div className="col-sm-10">
          <input type="text" id="tourname" name="tourname" value={formData.tourname} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="creator" className="col-sm-2 col-form-label">Creator:</label>
        <div className="col-sm-10">
          <input type="text" id="creator" name="creator" value={formData.creator} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
        <div className="col-sm-10">
          <input type="text" id="date" name="date" value={formData.date} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="price" className="col-sm-2 col-form-label">Price:</label>
        <div className="col-sm-10">
          <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="location" className="col-sm-2 col-form-label">Location:</label>
        <div className="col-sm-10">
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration:</label>
        <div className="col-sm-10">
          <input type="text" id="duration" placeholder='example 8h-12h' name="duration" value={formData.duration} onChange={handleInputChange} className="form-control" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Create +</button>
    </form>
  );

};

export default TourForm;
