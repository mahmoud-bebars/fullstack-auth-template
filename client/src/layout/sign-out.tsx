import { useContext } from "react";

import { AuthContext } from "@/components/auth-provider";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SginOutComponent = ({ icon }: { icon?: boolean }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Button
      variant="destructive"
      size={icon ? "icon" : "default"}
      onClick={logout}
      className={`${icon ? "" : "w-full gap-2"}`}
    >
      <LogOut className="w-4 h-4" /> {!icon && "Sgin Out"}
    </Button>
  );
};

export default SginOutComponent;
