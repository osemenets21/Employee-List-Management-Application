import React, { useState } from 'react';
import './SignUp.scss';

export const SignUp: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = () => {
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Add your logic for user registration here.
    // For example, you can make a request to a server to create the account.

    // Reset the password and email error messages
    setPasswordError('');
    setEmailError('');
  };

  return (
    <div className="signup-page dark:bg-slate-500">
      <div className="signup-form dark:bg-slate-800 dark:border-slate-800">
        <h1 className='dark:text-white'>Sign Up</h1>
        <div className={`input-group ${emailError ? 'error' : ''}`}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={`input-group ${passwordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={`input-group ${passwordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {emailError && <div className="error-message">{emailError}</div>}
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button className='dark:bg-slate-500' onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};
