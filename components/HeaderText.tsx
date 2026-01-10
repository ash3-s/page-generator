import React from "react";

interface HeaderTextProps {
  pageHeading: string;
  pageCaption: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({
  pageHeading,
  pageCaption,
}) => (
  <>
    <div className="flex flex-col gap-2 lg:px-10 p-3 sm:flex-row sm:justify-between mb-4 items-center">
      <h3 className="text-lg text-center font-semibold sm:text-left sm:text-2xl md:text-3xl lg:text-4xl">
        {pageHeading}
      </h3>
      <p className="hidden sm:block font-medium">{pageCaption}</p>
    </div>
  </>
);

export default HeaderText;
