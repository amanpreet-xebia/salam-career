import React, { useContext } from 'react';
import Header from './Header';
import Logo from '../assets/logo.svg';
import DropDown from '../assets/dropDown.svg';
import AppContext from '../AppContext';
const Navbar = () => {
  const value = useContext(AppContext);

  //   const selectedLanguage = localStorage.getItem('selectedLanguage');
  return (
    <div>
      <Header />
      <div className="relative border-b-[0.1px] h-20 border-gray-500 bg-salam-blue flex gap-4 md:gap-8 px-4 py-2 text-white">
        <img className="absolute left-3 z-20" alt="logo" src={Logo} />
        <div className="flex left-32 absolute">
          <div className="flex m-auto">
            <span>Salam Fiber</span>
            <img className="mx-2" width={15} alt="dropdown" src={DropDown} />
          </div>
          <div className="flex m-4 ">
            <span>5G</span>
            <img className="mx-2" width={15} alt="dropdown" src={DropDown} />
          </div>
          {/* <div>
            <span>5G</span>
            <img alt="dropdown" src={DropDown} className={'bg-red-300'}></img>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
