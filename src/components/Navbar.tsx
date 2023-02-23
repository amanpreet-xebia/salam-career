import React from 'react';
import Header from './Header';
import Logo from '../assets/logo.svg';
import DropDown from '../assets/dropDown.svg';
const Navbar = () => {
  return (
    <div>
      <Header />
      <div className="relative border-b-[0.1px] h-20 border-gray-500 bg-salam-blue flex gap-4 md:gap-8 px-4 py-2 text-white">
        <img className="absolute left-3 z-20" alt="logo" src={Logo} />
      </div>
    </div>
  );
};

export default Navbar;
