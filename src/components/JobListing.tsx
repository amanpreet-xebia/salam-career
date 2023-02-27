/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import JobCard from './jobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const showToast = (msg: string) => {
    toast.error(msg, {
      data: {
        title: 'Hello World Again',
        position: toast.POSITION.TOP_CENTER,
      },
    });
  };
  const fetchJobs = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings`)
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => {
        showToast('Something Went Wrong');
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="h-full min-h-screen">
      <div className="text-salam-blue p-20 pb-10 text-3xl font-bold">
        <span>Apply for Jobs at Salam</span>
      </div>
      <div
        className={
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-100 py-8 rounded-xl'
        }
      >
        <ul
          role="list"
          className="list-none grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {jobs.length === 0 ? (
            <div className="text-salamgreen">
              No open positions at this time
            </div>
          ) : (
            jobs.map((item: any) => (
              <JobCard
                key={item.id}
                category={item.attributes.category}
                description={item.attributes.description}
                jobCode={item.attributes.jobCode}
                name={item.attributes.name}
                longDescription={item.attributes.longDescription}
              />
            ))
          )}
        </ul>
      </div>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        autoClose={false}
      />
    </div>
  );
};

export default JobListing;
