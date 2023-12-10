import React, { useState } from "react";
import UniversalButton from "../../components/UniversalButton/UniversalButton";
import { AlertSuccess } from "../../components/AlertSuccess/AlertSuccess";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const usernameRegex = /^[a-zA-Z]+[a-zA-Z0-9_]*$/;

  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const validateUserName = (username: string) => {
    return usernameRegex.test(username);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setUserNameError("");
    setSignupError("");

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
    }).catch((error) => {
        console.log(error);
        
    })

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long."
      );
      return;
    }

    if (!validateUserName(userName)) {
      setUserNameError(
        "Username can only contain letters, numbers, and underscores."
      );
      return;
    }



    // try {
    //   const response = await fetch("http://localhost:5002/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: userName,
    //       email: email,
    //       password: password,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Error during sign-up");
    //   }

    //   setSuccessMessage("User registered successfully");

    //   setPasswordError("");
    //   setEmailError("");
    //   setUserNameError("");
    //   setSignupError("");
    //   console.log("User registered successfully");
    // } catch (error) {
    //   setSignupError("Error during sign-up. Please try again.");
    // }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {successMessage && <AlertSuccess title={"Registration was successful"} />}
      <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" name="SignUpForm">
        <input
          type="text"
          placeholder="username"
          className={`border p-3 rounded-lg ${
            userName && !validateUserName(userName)
              ? "border-red-500"
              : userName
              ? "border-green-500"
              : ""
          }`}
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {userNameError && <div className="error-message">{userNameError}</div>}
        <input
          type="email"
          placeholder="email"
          className={`border p-3 rounded-lg ${
            email && !emailRegex.test(email)
              ? "border-red-500"
              : email
              ? "border-green-500"
              : ""
          }`}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={`input-group ${passwordError ? "error" : ""}`}>
          <input
            type="password"
            placeholder="password"
            className={`border p-3 py-3 rounded-lg w-full ${
              password && !validatePassword(password)
                ? "border-red-500"
                : password
                ? "border-green-500"
                : ""
            }`}
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

export default SignUp;
