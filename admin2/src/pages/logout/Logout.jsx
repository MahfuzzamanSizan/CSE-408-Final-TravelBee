import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Logout = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT_START' }); 
    try {
        localStorage.setItem("user", null);
        localStorage.setItem("token", null);
        localStorage.setItem("isAdmin", null);
      await axios.post('http://localhost:8000/api/auth/logout'); 
      dispatch({ type: 'LOGOUT_SUCCESS' });
      navigate('/login'); 

    } catch (err) {
      dispatch({ type: 'LOGOUT_FAILURE', payload: err.message }); 
    }
  };

  return (
    <div className="logout">
      <h2>Logout</h2>
      <button disabled={loading} onClick={handleLogout}>
        Logout
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Logout;
