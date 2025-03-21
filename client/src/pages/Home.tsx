import { useContext } from "react";
import { AuthContext } from "@/components/auth-provider";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to The Application</h1>
      <p className="text-lg capitalize ">
        Hello
        <span className="font-semibold px-1">{user?.name}</span>
      </p>
      <p className="text-lg font-thin">Email: {user?.email}</p>
    </div>
  );
};

export default Home;
