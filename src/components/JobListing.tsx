/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import JobCard from './jobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const showToast = (msg: string) => {
    toast.error(msg, {
      data: {
        title: 'Hello World Again',
        position: toast.POSITION.TOP_CENTER,
      },
    });
  };
  const [location, setLocation] = useState({ value: 'All', label: 'All' });
  const handleLocationChange = (location: any) => {
    setLocation(location);
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
  const fetchLocations = async () => {
    axios
      .get(
        `${process.env.REACT_APP_STRAPI_URL}api/content-type-builder/content-types/api::salam-job-listing.salam-job-listing`
      )
      .then((res) => {
        setLocations(res.data.data.schema.attributes.location.enum);
        const locations = res.data.data.schema.attributes.location.enum.map(
          (location: String) => ({ value: location, label: location })
        );
        setLocations(locations);
      })
      .catch((err) => {
        showToast('Something Went Wrong');
      });
  };

  useEffect(() => {
    fetchJobs();
    fetchLocations();
  }, []);
  console.log(location.value);

  return (
    <div className="h-full min-h-screen">
      <div className="text-salam-blue p-20 pb-10 text-3xl font-bold">
        <span>Apply for Jobs at Salam</span>
      </div>

      <Select
        options={locations}
        isSearchable
        onChange={handleLocationChange}
        // value={country.value}
        placeholder="Location"
        className="react-select-container w-52 ml-20 mt-0 m-10"
        classNamePrefix="react-select"
      />
      <div
        className={'mx-auto max-w-7xl px-2 lg:px-8 bg-gray-100 py-8 rounded-xl'}
      >
        <ul
          role="list"
          className="relative m-0 min-h-[30px] list-none grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {jobs.filter((item: any) => {
            if (location.value.toString() === 'All') {
              return item;
            } else if (item.attributes.location === location.value) {
              return item;
            }
          }).length === 0 && (
            <div className="w-full block text-center absolute">
              <h3 className="text-gray-800 font-bold text-2xl">
                No open positions at this time
              </h3>
            </div>
          )}
          {jobs
            .filter((item: any) => {
              if (location.value.toString() === 'All') {
                return item;
              } else if (item.attributes.location === location.value) {
                return item;
              }
            })
            .map((item: any) => (
              <JobCard
                key={item.id}
                id={item.id}
                category={item.attributes.department}
                description={item.attributes.jobSummary}
                jobCode={item.attributes.jobCode}
                name={item.attributes.jobTitle}
                longDescription={item.attributes.jobDescription}
                jobLevel={item.attributes.jobLevel}
                location={item.attributes.location}
              />
            ))}
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
