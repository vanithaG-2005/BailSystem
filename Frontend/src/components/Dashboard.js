
// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Dynamic welcome message */}
      {role && (
        <h2>
          Welcome {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
      )}
      <h2>{role && role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h2>

      {role === 'victim' && <p>Welcome Victim! You can now apply for bail.</p>}
      {role === 'advocate' && <p>Welcome Advocate! You can manage bail applications.</p>}
      {role === 'judge' && <p>Welcome Judge! You can review and approve bails.</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default Dashboard;
