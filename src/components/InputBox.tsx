import React, { useContext } from 'react';
import AppContext from '../AppContext';

const InputBox = (props: {
  title?: string;
  icon?: any;
  placeholder: string;
  type: string;
  styles?: string;
  inputStyles?: string;
  handleChange?: (e: any) => void;
}) => {
  const data = useContext(AppContext);
  let { locale } = data.state;
  return (
    <div className={`my-4 ${props.styles}`}>
      {props.title && <span>{props.title}</span>}
      <div className="relative  ">
        {props.icon && (
          <label
            className={`absolute top-5 ${
              locale === 'en' ? ' right-[5%]' : 'left-[5%]'
            }`}
          >
            <props.icon />
          </label>
        )}
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={`w-full p-3 ${props.inputStyles} placeholder:align-text-top outline-none focus:outline-bright-green outline-offset-0 border-roman-silver border-[1px] rounded-lg`}
          onChange={props.handleChange}
        ></input>
      </div>
    </div>
  );
};

export default InputBox;
