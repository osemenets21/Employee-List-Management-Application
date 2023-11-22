import React, { useState } from 'react';
import './Login.scss';
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error during login');
      }

      const data = await response.json();
     
      console.log('Login successful', data);
      setToken(data.accessToken);
    } catch (error) {
      console.error('Error during login. Please try again.', error);
      
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      {token ? ( 
        <div>
          <p>Token: {token}</p>
          <p>You can now use this token for further requests.</p>
        </div>
      ) : (
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            onClick={handleLogin}
          >
            {"Sign In"}
          </button>
        </form>
      )}
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/Sign-Up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};
