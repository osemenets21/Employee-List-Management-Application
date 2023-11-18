import React, { useState } from 'react';
import './Login.scss';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your logic for checking the username and password here.
    // For example, you can use state or make a request to a server.
  };

  return (
    <div className="login-page dark:bg-slate-500">
      <div className="login-form dark:bg-slate-800 dark:border-slate-800">
        <h1 className='dark:text-white'>Login</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="dark:bg-slate-500" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
