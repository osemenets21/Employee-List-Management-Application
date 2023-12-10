import React, { useEffect, useState } from "react";
import "./ResetPassword.scss";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { AlertSuccess } from "../../components/AlertSuccess/AlertSuccess";
import AlertAttention from "../../components/AlertAttention/AlertAttention";

export const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [resetSuccess, setResetSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValue = email;

    try {
      await sendPasswordResetEmail(auth, emailValue);
      setResetSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (resetSuccess) {
      const timeoutId = setTimeout(() => {
        setResetSuccess(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [resetSuccess]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">
        Reset password
      </h1>

      <form
        className="flex flex-col gap-4"
        name="ResetPasswordForm"
        onSubmit={(e) => resetPassword(e)}
      >
        <input
          type="email"
          placeholder="email"
          className={`border p-3 rounded-lg ${
            email && emailRegex.test(email)
              ? "border-green-500"
              : email
              ? "border-red-500"
              : ""
          }`}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {resetSuccess && (
          <AlertSuccess title="Reset password was successful. Check your email" />
        )}

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {"Reset"}
        </button>
      </form>
    </div>
  );
};
