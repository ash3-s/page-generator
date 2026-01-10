import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaCommentDots } from "react-icons/fa";

const FloatingIcon = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleMenu}
        className="bg-brand-color text-white p-4 rounded-full shadow-md hover:bg-brand-color focus:outline-none cursor-pointer"
      >
        <FaCommentDots size={36} />
      </button>

      {isMenuOpen && (
        <div className="absolute bottom-20 right-0 z-40 flex flex-col items-center space-y-3">
          <button className="flex items-center space-x-2 bg-brand-color text-white p-4 rounded-full cursor-pointer">
            <FaPhoneAlt />
          </button>
          <button className="flex items-center space-x-2 bg-brand-color text-white p-4 rounded-full cursor-pointer">
            <FaCommentDots />
          </button>
          <button className="flex items-center space-x-2 bg-brand-color text-white p-4 rounded-full cursor-pointer">
            <FaEnvelope />
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
