import { TITLE } from "@/constants/env";
import { logo } from "@/constants";

import { ModeToggle } from "@/components/mode-toggle";
import SginOutComponent from "./sign-out";
const Navbar = () => {
  return (
    <header className="w-full  z-10 sticky top-0 backdrop-blur">
      <div className="w-full px-1 md:px-3 lg:px-5 flex justify-between  items-center py-2">
        <div className="w-full px-4 flex items-center justify-between">
          <img
            loading="lazy"
            src={logo}
            className="w-10"
            alt={TITLE + " Logo"}
          />

          <div className="flex items-center gap-2">
            <ModeToggle />
            <SginOutComponent icon={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
