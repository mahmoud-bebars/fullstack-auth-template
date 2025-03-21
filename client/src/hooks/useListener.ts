import { useState, useEffect } from "react";
import { ISessionUser } from "@/types/common.types";

import Axios, { AxiosResponse } from "axios";
import { API } from "@/constants/env";

import { toast } from "sonner";

const useListener = () => {
  const [user, setUser] = useState<ISessionUser | null>(null);

  useEffect(() => {
    const Authorization = localStorage.getItem("Authorization");
    Axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("Authorization");
    if (Authorization) {
      // replace the API Path with the  Disred One
      Axios.get(API + "/auth")
        .then((response: AxiosResponse) => {
          // Read the Incoming Data from JWT & Set the needed one Only
          const data = response.data.user;
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
          });
          // Setting Authorization as Deafult in Headers
          Axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("Authorization");
          toast.success(`Welcome Back ${data.name}`);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("Authorization");
        });
    } else {
      setUser(null);
    }
  }, []);
  return user;
};

export default useListener;
