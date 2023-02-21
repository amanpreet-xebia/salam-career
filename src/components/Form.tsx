/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import CheckBoxInput from './CheckBoxInput';
import Button from './Button';
import axios, { AxiosRequestHeaders } from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const showToast = (msg: string) => {
    toast.error(msg, {
      data: {
        title: 'Hello World Again',
        position: toast.POSITION.TOP_CENTER,
      },
    });
  };
  const handlePhoneNumber = (e: any) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };

  const [allNationality, setAllNationality] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [gpa, setGpa] = useState('');
  const [professionalCertificate, setProfessionalCertificate] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [totalReleventExperience, setTotalReleventExperience] = useState('');
  const [currentCompany, setcurrentCompany] = useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [cv, setCv] = useState<any>();
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [gender, setGender] = useState('');
  const location = useLocation();
  const { longDescription, position, category } = location.state;
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
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
        country: country,
        city: city,
        nationality: nationality,
        degree: degree,
        major: major,
        graduationYear: graduationYear.toString(),
        GPA: gpa,
        professionalCertificate: professionalCertificate,
        isWorkExperience: workExperience,
        totalYearsOfExperience: totalExperience,
        totalYearsOfRelevantExperience: totalReleventExperience,
        currentCompany: currentCompany,
        currentJobTitle: currentJobTitle,
        linkedInUrl: linkedInUrl,
        jobTitle: position,
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
            console.log(res.data);
            navigate('/success');
          })
          .catch(() => {
            showToast('Something Went Wrong');
          });
      })
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const allYears = range(currentYear, currentYear - 30, -1);

  const setValNationality = (val: string) => {
    setNationality(val);
  };

  const fetchNationality = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/nationalities`)
      .then((res) => setAllNationality(res.data.data[0].attributes.nationality))
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const fetchCountry = async () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/countries`)
      .then((res) => setAllCountry(res.data.data[0].attributes.country))
      .catch(() => {
        showToast('Something Went Wrong');
      });
  };
  const setValCountry = (country: string) => {
    setCountry(country);
  };

  const setValGraduationYear = (year: string) => {
    setGraduationYear(year);
  };

  const handleFileValidation = (e: any) => {
    const fileSizeInKB = e.target.files[0]?.size / 1024;
    if (fileSizeInKB > 5120) {
      e.target.value = null;
      window?.alert('please upload file under 5MB');
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchNationality();
  }, []);
  return (
    <div className="h-screen">
      <div className=" flex mx-5 mt-20 md:mx-20  mb-0 justify-center">
        <div className="max-w-screen-md lg:w-[70%] w-[100%]">
          <div className="text-2xl mb-3 font-medium leading-6 text-gray-900">
            {position}
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 mx-3 text-base font-medium text-green-800">
              {category}
            </span>
          </div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            children={longDescription}
          />
        </div>
      </div>
      {/* Application form */}
      <div className="bg-gray-100 p-10 mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {/* personal deatils block */}
          <div className="md:grid md:grid-cols-3 md:gap-6">
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
                      <InputBox
                        required
                        placeholder={'Phone'}
                        type={'text'}
                        maxLength={10}
                        value={phoneNumber}
                        handleChange={handlePhoneNumber}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <CheckBoxInput
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
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Residence
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Dropdown
                        choices={allCountry.map(
                          (country: { name: string; code: string }) =>
                            country.name
                        )}
                        placeholder={'Country of Residence'}
                        onClick={setValCountry}
                        isMandatory={false}
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
                      <Dropdown
                        choices={allNationality}
                        placeholder={'Nationality'}
                        onClick={setValNationality}
                        isMandatory={false}
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
          {/* Educational Information block */}
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
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
                        title="Educational Degree"
                        name="educational degree"
                        options={[
                          'Ph.D.',
                          `Master's degree`,
                          `Bachelor's degree`,
                          'Diploma',
                          'High school',
                          'below high school',
                        ]}
                        onClick={(e: any) => {
                          setDegree(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Major'}
                        type={'text'}
                        handleChange={(e) => {
                          setMajor(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Dropdown
                        choices={allYears}
                        placeholder={'Graduation year'}
                        onClick={setValGraduationYear}
                        isMandatory={false}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'GPA or %'}
                        type={'number'}
                        handleChange={(e) => {
                          setGpa(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputBox
                        placeholder={'Professional Certificate'}
                        type={'text'}
                        handleChange={(e) => {
                          setProfessionalCertificate(e.target.value);
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
          {/* Professional Experience block */}
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Professional Experience
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <CheckBoxInput
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
                          <CheckBoxInput
                            name="total experience"
                            title="Total years of experience?"
                            options={['0-3', '3-5', '5-10', '10+']}
                            onClick={(e: any) => {
                              setTotalExperience(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <CheckBoxInput
                            name="total relevant experience"
                            title="Total years of relevant experience?"
                            options={['0-3', '3-5', '5-10', '10+']}
                            onClick={(e: any) => {
                              setTotalReleventExperience(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <InputBox
                            placeholder={'Current Company?'}
                            type={'text'}
                            handleChange={(e) => {
                              setcurrentCompany(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <InputBox
                            placeholder={'Current job title?'}
                            type={'text'}
                            handleChange={(e) => {
                              setCurrentJobTitle(e.target.value);
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
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Attachments block */}
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
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
                    <div className="col-span-6 sm:col-span-6">
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
            styles="my-10 font-bold mx-auto w-3/12 text-lg"
            buttonType="primary"
            title={'Apply'}
          />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Form;
