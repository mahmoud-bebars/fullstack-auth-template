import { logo } from "@/constants";
import { TITLE } from "@/constants/env";

const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className=" w-[100%]  p-8">
      <div className="flex flex-row  items-center justify-between gap-y-6 gap-x-12 text-center md:justify-between">
        <div className=" flex items-center  gap-2 ">
          <img loading="lazy" src={logo} className="size-7" />
          <span className="font-bold text-xl">{TITLE}</span>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <p className="text-center font-normal">
        &copy; {year} {TITLE}
      </p>
    </footer>
  );
};

export default Footer;
