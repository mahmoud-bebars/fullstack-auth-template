import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = ({ setTitle }: { setTitle: (title: string) => void }) => {
  useEffect(() => {
    setTitle("404");
  });

  return (
    <>
      <section className="relative z-10 h-screen w-screen flex items-center justify-center flex-col  ">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none  sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight ">
                  Oops! That page can’t be found
                </h4>
                <p className="mb-8 text-lg ">
                  The page you are looking for it maybe deleted
                </p>
                <a href="/">
                  <Button variant="link" className="">
                    Go Home
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
