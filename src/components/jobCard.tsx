import React from 'react';
import { Link } from 'react-router-dom';

const jobCard = (props: {
  name: string;
  description: string;
  jobCode: string;
  category: string;
}) => {
  return (
    <Link
      to={'./form'}
      state={{ position: props.name }}
      className="border-2 flex h-6 justify-center items-center text-center border-salam-blue flex-col p-3 rounded-md min-h-[200px]"
    >
      <div className="">
        <div>
          <span className="font-bold">{'Job Title: '}</span>
          {props.name}
        </div>

        <div>
          <span className="font-bold"> {'Job Description: '}</span>
          {props.description}
        </div>

        <div>
          <span className="font-bold">{'Job Code: '}</span>
          {props.jobCode}
        </div>

        <div>
          <span className="font-bold">{'Job Category:'}</span>
          {props.category}
        </div>
      </div>
    </Link>
  );
};

export default jobCard;