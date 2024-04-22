import  { useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  country: string;
  gsm: string;
  birthDate: string;
  isGuider: boolean;
  cinFile: string | null;
}

function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      setUsers(response.data);
      setEditableFields({}); // Clear editable fields state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (userId: string) => {
    // Toggle editable state for the selected user
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [userId]: true
    }));
  };

  const handleSaveUser = async (userId: string) => {
    const updatedUser = users.find((user) => user._id === userId);
    if (updatedUser) {
      try {
        await axios.put<User>(`http://localhost:3000/users/${userId}`, updatedUser);
        fetchUsers(); // Refresh users after successful update
        displayMessage('Changes saved');
      } catch (error) {
        console.error('Error updating user:', error);
        displayMessage('Failed to save changes');
      }
    }

    // Disable editing mode after saving changes
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [userId]: false
    }));
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from state
      displayMessage('User deleted');
    } catch (error) {
      console.error('Error deleting user:', error);
      displayMessage('Failed to delete user');
    }
  };

  const displayMessage = (messageText: string) => {
    setMessage(messageText);
    setTimeout(() => {
      setMessage(null); // Clear message after 2 seconds
    }, 2000);
  };

  const handleFieldChange = (userId: string, field: keyof User, value: string | boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((prevUser) =>
        prevUser._id === userId ? { ...prevUser, [field]: value } : prevUser
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date ? date.toLocaleDateString() : '';
  };

  return (
    <div className='container p-0'>
      <h2 className='text-center mt-4' style={{ fontWeight: 'bold' }}>Users</h2>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>GSM</th>
              <th>Birth Date</th>
              <th>Is Guider</th>
              <th>CIN File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {editableFields[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.name}
                      onChange={(e) => handleFieldChange(user._id, 'name', e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editableFields[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.email}
                      onChange={(e) => handleFieldChange(user._id, 'email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editableFields[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.country}
                      onChange={(e) => handleFieldChange(user._id, 'country', e.target.value)}
                    />
                  ) : (
                    user.country
                  )}
                </td>
                <td>
                  {editableFields[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.gsm}
                      onChange={(e) => handleFieldChange(user._id, 'gsm', e.target.value)}
                    />
                  ) : (
                    user.gsm
                  )}
                </td>
                <td>
                  {editableFields[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={user.birthDate}
                      onChange={(e) => handleFieldChange(user._id, 'birthDate', e.target.value)}
                    />
                  ) : (
                    formatDate(user.birthDate)
                  )}
                </td>
                <td>{user.isGuider ? 'Yes' : 'No'}</td>
                <td>{user.cinFile ? user.cinFile : 'N/A'}</td>
                <td className="d-flex justify-content-center">
                  {editableFields[user._id] ? (
                    <button className="btn btn-success me-1" onClick={() => handleSaveUser(user._id)}>
                      Save <i className="fa-solid fa-floppy-disk ms-1" style={{ color: '#ffffff' }}></i>
                    </button>
                  ) : (
                    <button className="btn btn-primary me-1" onClick={() => handleEditUser(user._id)}>
                      Edit <i className="fa-solid fa-pen-to-square ms-1" style={{ color: '#ffffff' }}></i>
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                    Delete <i className="fa-solid fa-trash ms-1" style={{ color: '#ffffff' }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardUsers
