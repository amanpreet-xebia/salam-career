import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import RadioInput from './RadioInput';
import Button from './Button';
import axios, { AxiosRequestHeaders } from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBoxInput from './CheckBoxInput';
import { IoMdAddCircle, IoMdTrash } from 'react-icons/io';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { degree } from '../constants/educatonData';
import { noticePeriodOptions } from '../constants/dropdown';
const Form = ({ jobId }: any) => {
  const showToast = (msg: string) => {
    toast.error(msg, {
      data: {
        title: '',
        position: toast.POSITION.TOP_CENTER,
      },
    });
  };

  const [isRelativePresent, setIsRelativePresent] = useState('');
  const [isExEmployee, setIsExEmployee] = useState('');
  const [summary, setSummary] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [level, setLevel] = useState('');
  const [count, setCount] = useState<number>(0);
  const [allNationality, setAllNationality] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [language, setLanguage] = useState<{ value: String; label: String }[]>(
    []
  );
  const [nationality, setNationality] = useState<{
    value: String;
    label: String;
  }>();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<{ value: String; label: String }>();
  const [city, setCity] = useState('');
  const [educationInformation, setEducationInformation] = useState<
    {
      degree: string;
      major: string;
      GPA: string;
      graduationYear: string;
    }[]
  >();
  const [noticePeriod, setNoticePeriod] = useState<{
    value: String;
    label: String;
  }>();
  const [id, setId] = useState();
  const [certificate, setCertificate] = useState('');
  const [professionalCertificate, setProfessionalCertificate] = React.useState<
    string[]
  >([]);
  const [workExperience, setWorkExperience] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [totalReleventExperience, setTotalReleventExperience] = useState('');
  const [currentCompany, setcurrentCompany] = useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [cv, setCv] = useState<any>();
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [gender, setGender] = useState('');
  const params = useParams();
  const [longDescription, setLongDescription] = useState('');
  const [position, setPosition] = useState('');
  const [category, setCategory] = useState('');
  const [jobInIqama, setJobInIqama] = useState('');
  const [isIqamaTransferable, setisIqamaTransferable] = useState('');
  const [relativeName, setRelativeName] = useState('');
  const jobCode = params.jobId;
  const [currSalary, setCurrSalary] = useState('');
  const [expSalary, setExpSalary] = useState('');
  const [allLanguages, setAllLanguages] = useState([]);

  const navigate = useNavigate();
  let headers = {
    'Content-Type': 'application/json',
  } as unknown as AxiosRequestHeaders;
  const submitForm = async () => {
    const formDetails = {
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        Gender: gender,
        country: country?.value,
        city: city,
        nationality: nationality?.value,
        educationInformation: educationInformation,
        professionalCertificate: professionalCertificate,
        isWorkExperience: workExperience,
        totalYearsOfExperience: totalExperience,
        totalYearsOfRelevantExperience: totalReleventExperience,
        currentCompany: currentCompany,
        currentJobTitle: currentJobTitle,
        linkedInUrl: linkedInUrl,
        jobTitle: position,
        jobCode: jobCode,
        job: id,
        noticePeriod: noticePeriod?.value,
        jobInIqama: jobInIqama,
        isIqamaTransferable: isIqamaTransferable,
        language: language.map((lang) => lang.value),
        isRelativePresent: isRelativePresent,
        relative: relativeName,
        isExEmployee: isExEmployee,
        currentSalary: currSalary,
        expectedSalary: expSalary,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_STRAPI_URL}api/form-submissions`,
        JSON.stringify(formDetails),
        { headers }
      )

      .then((res: any) => {
        const formData = new FormData();
        formData.append('ref', 'api::form-submission.form-submission');
        formData.append('refId', res.data.data.id);
        formData.append('field', 'CV');
        formData.append('files', cv);

        axios
          .post(`${process.env.REACT_APP_STRAPI_URL}api/upload`, formData)
          .then((res: any) => {
            axios
              .get(
                `${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings?populate=*`
              )
              .then((res) => {
                axios
                  .put(
                    `${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings/${id}`,
                    {
                      data: {
                        applicationCount: res.data.data.filter(
                          (item: any) => item.id === id
                        )[0].attributes.candidates.data.length,
                      },
                    }
                  )
                  .then(() => {
                    navigate('/success');
                  })
                  .catch(() => {
                    showToast('Something Went Wrong');
                  });
              })
              .catch(() => {
                showToast('Something Went Wrong');
              });
          })
          .catch(() => {
            showToast('Something Went Wrong');
          });
      })
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };

  const setValNationality = (val: any) => {
    setNationality(val);
  };

  const fetchNationality = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/nationalities`)
      .then((res) => {
        const nationalities = res.data.data[0].attributes.nationality.map(
          (nationality: String) => ({ value: nationality, label: nationality })
        );
        setAllNationality(nationalities);
      })
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const fetchCountry = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/countries`)
      .then((res) => {
        const countries = res.data.data[0].attributes.country.map(
          (country: String) => ({ value: country, label: country })
        );
        setAllCountry(countries);
      })
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const fetchLanguages = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/languages`)
      .then((res) => {
        const languages = res.data.data[0].attributes.language.map(
          (country: String) => ({ value: country, label: country })
        );
        setAllLanguages(languages);
      })
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const addCertificate = () => {
    if (certificate !== '' && professionalCertificate.length <= 10) {
      setProfessionalCertificate([...professionalCertificate, certificate]);
      setCertificate('');
    }
  };
  const deleteCertificate = (cert: string) => {
    const newCertificates = professionalCertificate.filter((certificate) => {
      return certificate !== cert;
    });
    setProfessionalCertificate(newCertificates);
  };

  const handleFileValidation = (e: any) => {
    const fileSizeInKB = e.target.files[0]?.size / 1024;
    if (fileSizeInKB > 5120) {
      e.target.value = null;
      window?.alert('please upload file under 5MB');
    }
  };
  const handleCountryChange = (country: any) => {
    setCountry(country);
  };
  const handleLanguageChange = (language: any) => {
    setLanguage(language);
  };
  const handleNoticePeriodChange = (period: any) => {
    setNoticePeriod(period);
  };
  useEffect(() => {
    console.log(JSON.stringify(educationInformation));

    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings`)
      .then((res) => {
        res.data.data
          .filter((item: any) => item.attributes.jobCode === jobCode)
          .map((item: any) => {
            setPosition(item.attributes.jobTitle);
            setLongDescription(item.attributes.jobDescription);
            setCategory(item.attributes.department);
            setLocation(item.attributes.location);
            setLevel(item.attributes.jobLevel);
            setSummary(item.attributes.jobSummary);
            setId(item.id);
            if (item.attributes.applicationCount === null) {
              setCount(0);
            } else {
              setCount(item.attributes.applicationCount);
            }
          });
      })
      .catch((err) => {
        showToast('Something Went Wrong');
      });
    // }
    fetchCountry();
    fetchNationality();
    fetchLanguages();
  }, [id, count, position, longDescription, category, educationInformation]);
  return (
    <div className="h-full min-h-screen">
      <div className=" flex mx-5 mt-20 md:mx-20  mb-0 justify-center">
        <div className=" max-w-screen-lg lg:w-[70%] w-[100%]">
          <div>
            <div className="mt-5 border-t border-gray-200">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Title
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {position}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Level
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {level}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {location}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Department
                  </dt>

                  <dd className="mt-1 bg-green-100 rounded-full px-2 max-w-min p-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {category}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Summary
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {summary}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      children={longDescription}
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      {/* Application form */}
      <div className="bg-gray-100 p-10 mt-10">
        <h2 className="text-center text-3xl mb-4 font-bold">Apply Now</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="w-full md:w-9/12 m-auto"
        >
          {/* Personal Details block */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        required
                        placeholder={'First Name'}
                        type={'text'}
                        handleChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Last Name'}
                        type={'text'}
                        handleChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        required
                        placeholder={'Email'}
                        type={'email'}
                        handleChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <PhoneInput
                        country={'sa'}
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <RadioInput
                        required={true}
                        title="Gender"
                        name="gender"
                        options={['Male', 'Female']}
                        onClick={(e: any) => {
                          setGender(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Residence Detials block */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0 font-medium leading-6 text-gray-900">
                  Residence
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        options={allCountry}
                        isSearchable
                        onChange={handleCountryChange}
                        // value={country.value}
                        placeholder="Country of Residence"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'City of Residence'}
                        type={'text'}
                        handleChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        options={allNationality}
                        isSearchable
                        onChange={setValNationality}
                        // value={country.value}
                        placeholder="Nationality"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                      {nationality?.value &&
                        nationality?.value !== 'Saudi Arabian' && (
                          <div className="col-span-6 sm:col-span-3">
                            <RadioInput
                              required={
                                country?.value !== 'Saudi Arabian'
                                  ? true
                                  : false
                              }
                              name="type"
                              options={['Local', 'Overseas']}
                              onClick={(e: any) => {
                                setType(e.target.value);
                              }}
                            />
                          </div>
                        )}
                      {nationality?.value !== 'Saudi Arabian' &&
                        type === 'Local' && (
                          <>
                            <div className="col-span-6 sm:col-span-3">
                              <RadioInput
                                required={
                                  country?.value !== 'Saudi Arabian' &&
                                  type === 'Local'
                                    ? true
                                    : false
                                }
                                title="Is your iqama transferable?"
                                name="iqamaStatus"
                                options={['Yes', 'No']}
                                onClick={(e: any) => {
                                  setisIqamaTransferable(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <InputBox
                                required={
                                  country?.value !== 'Saudi Arabia' &&
                                  type === 'Local'
                                    ? true
                                    : false
                                }
                                placeholder={'Mention your job in iqama.'}
                                type={'text'}
                                handleChange={(e) => {
                                  setJobInIqama(e.target.value);
                                }}
                              />
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Educational Information block */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0 font-medium leading-6 text-gray-900">
                  Educational Information
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <CheckBoxInput
                        required={true}
                        title="Educational Degree"
                        name="educational degree"
                        options={degree}
                        value={educationInformation}
                        setValue={setEducationInformation}
                      />
                    </div>
                    {/* {EducationInformation()} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Professional Certificates */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0 font-medium leading-6 text-gray-900">
                  Professional Certificates
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      {professionalCertificate.length > 0 ? (
                        <ul className="m-0">
                          {professionalCertificate.map((certificate, index) => (
                            <li
                              key={index}
                              className="flex first:border-0 bg-salam-background center min-w-full justify-between px-2 py-2 box-border border-t border-roman-silver"
                            >
                              <p>{certificate}</p>
                              <IoMdTrash
                                onClick={() => deleteCertificate(certificate)}
                                size={20}
                                color={'red'}
                                className="min-w-[20px]"
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>add your professional certificates</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Professional Certificate'}
                        type={'text'}
                        handleChange={(e) => {
                          // professCert.push(e.target.value)
                          setCertificate(e.target.value);
                        }}
                        value={certificate}
                      />
                    </div>
                    <div className="flex my-auto">
                      <IoMdAddCircle
                        onClick={addCertificate}
                        size={40}
                        color={
                          certificate === '' &&
                          professionalCertificate.length <= 10
                            ? 'grey'
                            : 'green'
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Professional Experience block */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0 font-medium leading-6 text-gray-900">
                  Professional Experience
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <RadioInput
                        required={true}
                        name="work experience"
                        title="Do you have any work experience?"
                        options={['Yes', 'No']}
                        onClick={(e: any) => {
                          setWorkExperience(e.target.value);
                        }}
                      />
                    </div>
                    {workExperience === 'Yes' && (
                      <>
                        <div className="col-span-6 sm:col-span-3">
                          <RadioInput
                            required={workExperience === 'Yes' ? true : false}
                            name="total experience"
                            title="Total years of experience?"
                            options={['0-3', '3-5', '5-10', '10+']}
                            onClick={(e: any) => {
                              setTotalExperience(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <RadioInput
                            required={workExperience === 'Yes' ? true : false}
                            name="total relevant experience"
                            title="Total years of Job relevant experience?"
                            options={['0-3', '3-5', '5-10', '10+']}
                            onClick={(e: any) => {
                              setTotalReleventExperience(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <InputBox
                            required={workExperience === 'Yes' ? true : false}
                            placeholder={'Current Company?'}
                            type={'text'}
                            handleChange={(e) => {
                              setcurrentCompany(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <InputBox
                            required={workExperience === 'Yes' ? true : false}
                            placeholder={'Current job title?'}
                            type={'text'}
                            handleChange={(e) => {
                              setCurrentJobTitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <Select
                            options={noticePeriodOptions}
                            isSearchable
                            onChange={handleNoticePeriodChange}
                            // value={country.value}
                            placeholder="Notice Period"
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Compensation and expectation. (optional) */}

          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0 font-medium leading-6 text-gray-900">
                  Compensation and expectation.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Current salary'}
                        type={'text'}
                        handleChange={(e) => {
                          setCurrSalary(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Expected salary'}
                        type={'text'}
                        handleChange={(e) => {
                          setExpSalary(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0  font-medium leading-6 text-gray-900">
                  Additional Information
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        options={allLanguages}
                        isSearchable
                        isMulti
                        onChange={handleLanguageChange}
                        value={language}
                        required={true}
                        placeholder="Language"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <RadioInput
                        required={true}
                        name="isRelative"
                        title="Do you have any relatives working with us."
                        options={['Yes', 'No']}
                        onClick={(e: any) => {
                          setIsRelativePresent(e.target.value);
                        }}
                      />
                    </div>
                    {isRelativePresent === 'Yes' && (
                      <div className="col-span-6 sm:col-span-3">
                        <InputBox
                          placeholder={'Please provide Relative name'}
                          type={'text'}
                          handleChange={(e) => {
                            setRelativeName(e.target.value);
                          }}
                        />
                      </div>
                    )}
                    <div className="col-span-6 sm:col-span-6">
                      <RadioInput
                        required={true}
                        name="isExEmployee"
                        title="Are you an Ex-Employee of Salam?"
                        options={['Yes', 'No']}
                        onClick={(e: any) => {
                          setIsExEmployee(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Attachments block */}
          <div className="md:grid md:grid-cols md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg pt-5 md:pt-0  font-medium leading-6 text-gray-900">
                  Attachments
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <InputBox
                        placeholder={'LinkedIn Profile URL'}
                        type={'url'}
                        handleChange={(e) => {
                          setLinkedInUrl(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 ">
                      <InputBox
                        required
                        title="CV Upload as PDF"
                        placeholder={'CV Upload as PDF.'}
                        type={'file'}
                        handleChange={(e) => {
                          setCv(e.target.files[0]);
                          handleFileValidation(e);
                        }}
                        accept=".pdf"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {}}
            styles="my-10 font-bold mx-auto w-3/12 text-lg uppercase"
            buttonType="primary"
            title={'Apply'}
          />
        </form>
        <ToastContainer
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
          autoClose={false}
        />
      </div>
    </div>
  );
};

export default Form;
