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
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              to={'/form'}
              state={{
                position: props.name,
                longDescription: props.longDescription,
                category: props.category,
              }}
              className={
                'relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-salamgreen'
              }
            >
              <span className="ml-3">Apply Now</span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default jobCard;
