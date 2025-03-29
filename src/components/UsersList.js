import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user.id}`, { state: { user } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           user.email?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="users-page">
      <Navbar />
      <div className="users-container">
        <h2>Users List</h2>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <>
            <div className="users-grid">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="user-card">
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-avatar" />
                    <div className="user-info">
                      <h3>{`${user.first_name} ${user.last_name}`}</h3>
                      <p>{user.email}</p>
                    </div>
                    <div className="user-actions">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">No users found</div>
              )}
            </div>
            
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList; 