import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import UniversalButton from "../../components/UniversalButton/UniversalButton";
import useAuth from "../../hooks/useAuth";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);

      navigate('/');
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("An error occurred. Please try again.");
      } else {
        console.error("Server error:", error.message); 
        setError("Wrong email or password"); 
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">Login</h1>

      {error && (
        <div className="text-red-500 text-center my-3">{error}</div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {"Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <UniversalButton
          type="link"
          action="/sign-up"
          title={<span className="text-blue-700 dark:text-white">Sign up</span>}
        />
      </div>
    </div>
  );
};

export default Login;
