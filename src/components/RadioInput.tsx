import React from 'react';

const RadioInput = (props: {
  title: string;
  options: string[];
  onClick: (e: any) => void;
  name: string;
  required: boolean;
}) => {
  return (
    <>
      <div className="text-salam-blue font-semibold py-2">{props.title}</div>
      {props.options.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            required={props.required}
            id="default-radio-1"
            type="radio"
            onClick={props.onClick}
            value={item}
            name={props.name}
            className="w-4 h-4 text-roman-silver bg-gray-100 border-gray-300 "
          />
          <label
            about={props.name}
            className="ml-2 text-sm font-medium text-roman-silver"
          >
            {item}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioInput;
