import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateUser } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Get user data from location state or initialize empty
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    // If we have user data from the navigation state, use it
    if (location.state && location.state.user) {
      setUserData(location.state.user);
    } else {
      // If no user data, go back to users list
      toast.error('User data not found');
      navigate('/users');
    }
  }, [location.state, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!userData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!userData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await updateUser(id, userData);
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-page">
      <Navbar />
      <div className="edit-user-container">
        <h2>Edit User</h2>
        
        <div className="user-avatar-container">
          <img src={userData.avatar} alt={`${userData.first_name} ${userData.last_name}`} className="user-avatar-large" />
        </div>
        
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              className={errors.first_name ? 'error' : ''}
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              className={errors.last_name ? 'error' : ''}
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/users')}>
              Cancel
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser; 