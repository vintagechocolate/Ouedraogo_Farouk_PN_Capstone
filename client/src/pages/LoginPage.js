import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/authUtils';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { from } = location.state || { from: { pathname: '/' } };

    const handleLogin = async () => {
      try {
        const response = await axios.post('/api/users/login', { email, password });
        login(response.data.token);
        navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    if (email && password) {
      handleLogin();
    }
  }, [email, password, location.state, login, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
