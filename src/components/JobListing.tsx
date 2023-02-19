/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobCard from './jobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings`)
      .then((res) => {
        setJobs(res.data.data);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="h-screen">
      <div className="text-salam-blue p-20 pb-10 text-3xl font-bold">
        <span>Apply for Jobs at Salam</span>
      </div>
      <div
        className={'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-100 py-8'}
      >
        <ul
          role="list"
          className="list-none grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {jobs.map((item: any) => (
            <JobCard
              key={item.id}
              category={item.attributes.category}
              description={item.attributes.description}
              jobCode={item.attributes.jobCode}
              name={item.attributes.name}
              longDescription={item.attributes.longDescription}
            />
          ))}
        </ul>
      </div>
      <div className="h-[1px] bg-white my-60 md:my-16" />
    </div>
  );
};

export default JobListing;
