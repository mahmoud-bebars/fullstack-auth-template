import { FC } from "react";

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
}
export interface Router {
  path: string;
  element: FC;
}
