import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bailsystem.onrender.com/api/auth/login', {
        username,
        password,
        role,
      });
      alert(res.data.message);
      // Optionally store token for authentication
      // localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='form'>
      <h2>Login</h2>
      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Login Icon" className='login-icon' />
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <p>DON'T HAVE AN ACCOUNT? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}


export default Login;
