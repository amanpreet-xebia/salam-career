import React, { useEffect, useState } from 'react';
import JobCard from './jobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const jobs = await fetch('http://localhost:1337/api/salam-job-listings');
    const jsonJobs = await jobs.json();
    setJobs(jsonJobs.data);
    console.log(jsonJobs);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="h-screen">
      <div className="text-salam-blue p-20 text-3xl font-bold">
        <span>Job Listings</span>
      </div>
      <div className="grid grid-cols-2 gap-16 mx-24">
        {jobs.map((item: any) => (
          <div key={item.id} className={'m-2 cursor-pointer'}>
            <JobCard
              category={item.attributes.category}
              description={item.attributes.description}
              jobCode={item.attributes.jobCode}
              name={item.attributes.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
