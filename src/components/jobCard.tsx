import React from 'react';
import { Link } from 'react-router-dom';

const jobCard = (props: {
  id: number;
  name: string;
  description: string;
  jobCode: string;
  category: string;
  longDescription: any;
}) => {
  return (
    <li className=" col-span-1 divide-y divide-gray-200 rounded-lg bg-white">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {props.name}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {props.category}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            {props.description}
          </p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              to={`/job/${props.jobCode}`}
              state={{
                id: props.id,
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
    </li>
  );
};

export default jobCard;
