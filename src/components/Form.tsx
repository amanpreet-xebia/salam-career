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
const Form = ({ jobId }: any) => {
  const showToast = (msg: string) => {
    toast.error(msg, {
      data: {
        title: '',
        position: toast.POSITION.TOP_CENTER,
      },
    });
  };
  const [count, setCount] = useState<number>(0);
  const [allNationality, setAllNationality] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState({
    value: String,
    label: String,
  });
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState({ value: String, label: String });
  const [city, setCity] = useState('');
  const [educationInformation, setEducationInformation] = useState<
    {
      degree: string;
      major: string;
      GPA: string;
      graduationYear: string;
    }[]
  >();
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
  const jobCode = params.jobId;

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
        country: country.value,
        city: city,
        nationality: nationality.value,
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

  useEffect(() => {
    console.log('yo' + JSON.stringify(educationInformation));

    axios
      .get(`${process.env.REACT_APP_STRAPI_URL}api/salam-job-listings`)
      .then((res) => {
        res.data.data
          .filter((item: any) => item.attributes.jobCode === jobCode)
          .map((item: any) => {
            setPosition(item.attributes.name);
            setLongDescription(item.attributes.longDescription);
            setCategory(item.attributes.category);
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
  }, [id, count, position, longDescription, category, educationInformation]);
  return (
    <div className="h-full min-h-screen">
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
          {/* Personal Details block */}
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
          <div className="md:grid md:grid-cols-3 md:gap-6">
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
          <div className="md:grid md:grid-cols-3 md:gap-6">
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
          <div className="md:grid md:grid-cols-3 md:gap-6">
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
            styles="my-10  font-bold mx-auto w-3/12 text-lg"
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
