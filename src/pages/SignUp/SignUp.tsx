import React, { useState } from 'react';
import './SignUp.scss';
import UniversalButton from '../../components/UniversalButton/UniversalButton';
import { AlertSuccess } from '../../components/AlertSuccess/AlertSuccess';

export const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userName, setUserName] = useState("");
  const [signupError, setSignupError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = async () => {
    setEmailError("");
    setPasswordError("");
    setSignupError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }


    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch('https://fair-teal-puppy-veil.cyclic.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error during sign-up');
      }

      setSuccessMessage('User registered successfully');

      setPasswordError("");
      setEmailError("");
      setSignupError("");
      console.log('User registered successfully');
    } catch (error) {
      setSignupError('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={`input-group ${passwordError ? "error" : ""}`}>
          <input
            type="password"
            placeholder="password"
            className="border p-3 py-3 rounded-lg w-full"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {emailError && <div className="error-message">{emailError}</div>}
        {passwordError && <div className="error-message">{passwordError}</div>}
        {signupError && <div className="error-message">{signupError}</div>}
        <button
          type="button"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={handleSignUp}
        >
          {"Sign Up"}
        </button>
      </form>
      {successMessage && <AlertSuccess title={"Registration was successful"}/>}
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>

        <UniversalButton
          type="link"
          action="/login"
          title={<span className="text-blue-700 dark:text-white">Sign in</span>}
        />
      </div>
    </div>
  );
};
