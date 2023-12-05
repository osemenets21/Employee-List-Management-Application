import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const saveTokenToLocalStorage = (token: any) => {
    localStorage.setItem("accessToken", token);
  };

  const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  const clearTokenFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("https://fair-teal-puppy-veil.cyclic.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error during login");
      }

      const data = await response.json();

      console.log("Login successful", data);
      setToken(data.accessToken);
      setUser(data.user);

      saveTokenToLocalStorage(data.accessToken);
    } catch (error) {
      console.error("Error during login. Please try again.", error);
      throw new Error("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    clearTokenFromLocalStorage();
    setToken(null);
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const storedToken = getAccessTokenFromLocalStorage();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return {
    token,
    user,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
