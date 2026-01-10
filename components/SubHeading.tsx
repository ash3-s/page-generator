import React from "react";

interface SubHeadingProps {
  pageSubHeading: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ pageSubHeading }) => (
  <div className="p-3 my-2 max-w-sm lg:max-w-full">
    <h2 className=" max-w-fit text-4xl font-semibold">{pageSubHeading}</h2>
  </div>
);

export default SubHeading;
