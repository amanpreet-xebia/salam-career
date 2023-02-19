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
      <div className="text-salam-blue p-20 text-3xl font-bold">
        <span>Job Listings</span>
      </div>
      <div className="md:grid md:grid-cols-2 gap-16 mx-24">
        {jobs.map((item: any) => (
          <div key={item.id} className={'m-2 cursor-pointer'}>
            <JobCard
              category={item.attributes.category}
              description={item.attributes.description}
              jobCode={item.attributes.jobCode}
              name={item.attributes.name}
              longDescription={item.attributes.longDescription}
            />
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-white my-60 md:my-16" />
    </div>
  );
};

export default JobListing;
