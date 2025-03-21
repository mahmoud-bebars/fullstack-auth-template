import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/components/auth-provider";

import { logo } from "@/constants";
import { TITLE } from "@/constants/env";

import LoginForm from "@/components/login-form";

type Props = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const Login = ({ setTitle }: Props) => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setAuth(false);
        setTitle(TITLE + " | Login");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setTitle(TITLE + " | Authenticating...");
      const timer = setTimeout(() => {
        setAuth(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (auth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className=" flex items-center justify-center animate-ping rounded-full w-32 h-32">
          <img
            loading="lazy"
            className="mx-auto w-24 md:w-32 lg:w-44 "
            src={logo}
            alt="company_logo"
          />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={state ? state?.history : "/"} replace={true} />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center ">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
