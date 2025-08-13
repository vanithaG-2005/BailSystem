import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [barCouncilId, setBarCouncilId] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role) {
      alert('Please select a role');
      return;
    }
    if (role === 'judge') {
      alert('You cannot register as a judge');
      return;
    }
    if (role === 'advocate' && !barCouncilId) {
      alert('Bar Council ID is required for advocates');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role,
        barCouncilId: role === 'advocate' ? barCouncilId : undefined,
      });
      alert(`${role} registered successfully`);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="victim">Victim</option>
          <option value="advocate">Advocate</option>
          <option value="judge">Judge</option>
        </select>
        <br />
        {role === 'advocate' && (
          <>
            <input
              type="text"
              placeholder="Bar Council ID"
              value={barCouncilId}
              onChange={(e) => setBarCouncilId(e.target.value)}
              required
            /><br />
          </>
        )}
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Register;