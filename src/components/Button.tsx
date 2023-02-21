import React from 'react';
interface buttonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  buttonType: 'primary' | 'secondary' | 'dark' | 'transparent';
  icon?: any;
  styles?: string;
}
const Button = (props: buttonProps) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      onClick={props.onClick}
      className={` block ${props.styles}  justify-center  ${
        props.buttonType === 'primary' && 'bg-bright-green text-white'
      } ${
        props.buttonType === 'dark' &&
        'bg-white text-roman-silver border-romtext-roman-silver'
      }  ${
        props.buttonType === 'secondary' &&
        'bg-white text-bright-green border-bright-green'
      } ${
        props.buttonType === 'transparent' &&
        'bg-transparent text-bright-green border-bright-green'
      }  text-sm rounded-lg  
    } p-2 px-6 font-inter border-[1px] `}
    >
      {props.icon ? (
        <div className="flex gap-2">
          <props.icon />
          <span className={` font-interSemiBold`}>{props.title}</span>
        </div>
      ) : (
        <span className={` font-interSemiBold`}>{props.title}</span>
      )}
    </button>
  );
};

export default Button;
