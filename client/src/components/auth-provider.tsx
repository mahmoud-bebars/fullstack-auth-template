import { createContext, ReactNode, useEffect, useState } from "react";
import { ISessionUser } from "@/types/common.types";

import useListener from "@/hooks/useListener";

import Axios from "axios";

import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  user: ISessionUser | null;
  setAuthenticated: (authenticated: boolean) => void;
  setUser: (user: ISessionUser | null) => void;
  logout: () => void;
};

const initalValue = {
  authenticated: false,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initalValue);

const AuthProvider = ({ children }: Props) => {
  const getUser = useListener(); // checking on user by the accessToken
  const [authenticated, setAuthenticated] = useState(initalValue.authenticated);
  const [user, setUser] = useState<ISessionUser | null>(initalValue.user);

  useEffect(() => {
    const Authorization = localStorage.getItem("Authorization");
    if (Authorization) {
      Axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("Authorization");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setUser(getUser);
    }
  }, [user, getUser]);

  // logout function
  const logout = () => {
    localStorage.removeItem("Authorization");
    setUser(null);
    Axios.defaults.headers.common["Authorization"] = "";
    setAuthenticated(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
