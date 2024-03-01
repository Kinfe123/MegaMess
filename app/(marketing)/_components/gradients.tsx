import { PlusSvg } from "./section-svg";

export const Gradient = () => {
    return (
      <>
        <div className="relative z-20 h-6 mx-2.5 bg-red-900 w-20 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
        <div className="relative z-20 h-6 mx-6 bg-red-900/70 w-20 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
      </>
    );
  };
  
  export const BottomLine = () => {
    return (
      <>
        <div className="hidden absolute top-[50.25rem] left-3 right-3 h-[0.0625rem] bg-n7 pointer-events-none xl:block" />
  
        <PlusSvg className="hidden absolute top-[49.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />
  
        <PlusSvg className="hidden absolute top-[49.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
      </>
    );
  };
  