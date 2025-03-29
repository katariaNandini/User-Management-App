import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">User Management</div>
      <div className="navbar-menu">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 