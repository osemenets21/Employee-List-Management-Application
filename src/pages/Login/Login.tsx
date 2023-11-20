import React, { useState } from "react";
import "./Login.scss";
import UniversalButton from "../../components/UniversalButton/UniversalButton";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your logic for checking the username and password here.
    // For example, you can use state or make a request to a server.
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
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

        <UniversalButton
          type="button"
          action={handleLogin}
          title="Sign In"
          classes="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <UniversalButton
          type="link"
          action="/sign-up"
          title={<span className="text-blue-700">Sign up</span>}
        />
      </div>
    </div>
  );
};
