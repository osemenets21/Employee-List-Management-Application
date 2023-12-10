import { useEffect, useState } from "react";
import { UserAuth } from "../types";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<UserAuth | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out was successful");
      })
      .catch((error) => console.log(error));
  };

  return {
    authUser,
    setAuthUser,
    handleLogout,
  };
};
