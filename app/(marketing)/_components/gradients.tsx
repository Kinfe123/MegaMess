import { PlusSvg } from "./section-svg";

export const Gradient = () => {
    return (
      <>
        <div className="relative z-1 h-6 mx-2.5 bg-n11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
        <div className="relative z-1 h-6 mx-6 bg-n11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
      </>
    );
  };
  
  export const BottomLine = () => {
    return (
      <>
        <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />
  
        <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />
  
        <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
      </>
    );
  };
  