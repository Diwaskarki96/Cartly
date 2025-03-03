import React from "react";

const Container = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className=" m-auto max-w-6xl xl:max-w-7xl py-8 px-[10px] ">
      {children}
    </div>
  );
};

export default Container;
