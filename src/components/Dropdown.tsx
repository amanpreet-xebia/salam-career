import React, { useState } from 'react';
import { downChevronBlack } from '../assets';
interface dropdownProps {
  choices: (string | number)[];
  onClick: (val: string) => void;
  isMandatory: boolean;
  icon?: any;
  placeholder: string;
}
const Dropdown = (props: dropdownProps) => {
  const [openDropdown, setOpenDropDown] = useState(false);
  const [value, setValue] = useState(props.placeholder);
  return (
    // <div className="flex flex-col text-black">
    <div
      className=" mb-6 cursor-pointer bg-white border-[1px]
       border-roman-silver relative 
       flex flex-row justify-between m-auto 
       outline-none font-normal  py-3 rounded-lg 
       px-2"
      onClick={() => {
        setOpenDropDown(!openDropdown);
      }}
    >
      {props.icon ? (
        <div className="px-3">
          <props.icon />
        </div>
      ) : (
        <span className="font-extralight px-4">{value}</span>
      )}
      <div className="flex align-middle">
        {/* <downChevronBlack /> */}
        <img alt="downChevron" src={downChevronBlack} />
      </div>

      {openDropdown && (
        <div className="absolute max-h-40 overflow-scroll cursor-pointer text-center rounded-md bg-white w-full top-12 -right-10 text-black font-light flex flex-col flex-grow z-10 m-auto mx-10 shadow-2xl">
          {props.choices.map((item: any, index: number) => (
            <span
              key={index}
              className="p-1 justify-center"
              onClick={() => {
                setValue(item);
                props.onClick(item);
                setOpenDropDown(false);
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
    // </div>
  );
};

export default Dropdown;
