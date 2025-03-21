import { useContext, useEffect /* useState */ } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { routes } from "@/routes";

import { TITLE } from "@/constants/env";

import { AuthContext } from "@/components/auth-provider";

import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";

const Layout = ({ setTitle }: { setTitle: (title: string) => void }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const nonPaths = ["/login", "/register"];
  const navigate = useNavigate();

  // Responsible for Title Changing Based on Found pathname in Changing Effect
  useEffect(() => {
    const str = pathname.substring(1);
    const name = str.charAt(0).toUpperCase() + str.substring(1);
    const ChangeTitle = (title: string) => {
      setTitle(title);
    };
    ChangeTitle(`${TITLE} | ${name === "" ? "Home" : name}`);
  }, [pathname]);

  // Redirecting to Login If User Not Found - Most Secure If Authorization Not Found
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { history: pathname } });
    } else if (!routes.map((route) => route.path).includes(pathname)) {
      navigate("/404");
    } else {
      navigate(pathname);
    }
  }, [pathname, user]);

  return (
    <main>
      {!nonPaths.includes(pathname) && <Navbar />}

      <Outlet />

      {!nonPaths.includes(pathname) && <Footer />}
    </main>
  );
};
export default Layout;
