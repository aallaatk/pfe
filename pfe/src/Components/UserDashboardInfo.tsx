import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  country: string;
  gsm: string;
  birthDate: string;
  isGuider: boolean;
  imageUrl?: string;
}

const UserInfoForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('No user ID found in local storage');
        return;
      }

      try {
        const response = await axios.get<User>(`http://localhost:3000/info/user/${userId}`);
        setUser(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching user info');
        setUser(null);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      await axios.put(`http://localhost:3000/users/${editedUser._id}`, editedUser);
      setIsEditing(false);
      setUser(editedUser);
      setError('');
    } catch (error) {
      setError('Error updating user info');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5 text-center">
      {user && (
        <div className="mt-3">
          <img src={user.imageUrl} alt="User" className="img-fluid mt-3" style={{ width: '300px', height: '300px' }} />
          {isEditing ? (
            <>
              <h3>Edit User Details</h3>
              <form className="row g-3 justify-content-center">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editedUser?.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editedUser?.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={editedUser?.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gsm" className="form-label">GSM</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gsm"
                    name="gsm"
                    value={editedUser?.gsm}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="birthDate" className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    name="birthDate"
                    value={editedUser?.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                  <button type="button" className="btn btn-danger ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3>User Details</h3>
              <p><strong>ID:</strong> {user._id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>GSM:</strong> {user.gsm}</p>
              <p><strong>Birth Date:</strong> {new Date(user.birthDate).toLocaleDateString()}</p>
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      )}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default UserInfoForm;
