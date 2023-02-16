import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import { useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import CheckBoxInput from './CheckBoxInput';
import Button from './Button';
const Form = () => {
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
  const [gba, setGba] = useState('');
  const [professionalCertificate, setProfessionalCertificate] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [totalReleventExperience, setTotalReleventExperience] = useState('');
  const [currentCompany, setcurrentCompany] = useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [cv, setCv] = useState<any>();
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const location = useLocation();
  const { position } = location.state;
  // const d = new Date();
  // const l = d.getFullYear();
  const currentYear = new Date().getFullYear();
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const allYears = range(currentYear, currentYear - 30, -1);
  const submitForm = async () => {
    const formDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
      country: country,
      city: city,
      nationality: nationality,
      degree: degree,
      major: major,
      graduationYear: graduationYear,
      GBA: gba,
      professionalCertificate: professionalCertificate,
      workExperience: workExperience === 'yes' ? true : false,
      totalYearsOfExperience: totalExperience,
      totalYearsOfRelevantExperience: totalReleventExperience,
      currentCompany: currentCompany,
      currentJobTitle: currentJobTitle,
      linkedInUrl: linkedInUrl,
      CV: cv,
    };
    const obj = { data: formDetails };
    const add = await fetch('http://localhost:1337/api/form-submissions', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const addResponse = await add.json();
    console.log(addResponse);
    console.log(JSON.stringify(obj));
  };
  const setValNationality = (val: string) => {
    setNationality(val);
  };

  const fetchNationality = async () => {
    const nationality = await fetch('http://localhost:1337/api/nationalities');
    const jsonNationality = await nationality.json();
    setAllNationality(jsonNationality.data[0].attributes.nationality);
  };
  const fetchCountry = async () => {
    const country = await fetch('http://localhost:1337/api/countries');
    const jsonCountry = await country.json();
    setAllCountry(jsonCountry.data[0].attributes.country);
  };
  const setValCountry = (country: string) => {
    setCountry(country);
  };

  const setValGraduationYear = (year: string) => {
    setGraduationYear(year);
  };

  useEffect(() => {
    fetchCountry();
    fetchNationality();
  }, []);
  return (
    <div className="h-screen">
      <div className="text-salam-blue py-10 px-20 text-3xl font-bold">
        <div>
          {'Apply for the position of: '}
          {position}
        </div>
      </div>
      <div className="grid mx-10 md:grid-cols-3">
        <div />
        <div>
          <div className="font-semibold text-lg mb-10">
            Personal Information
          </div>

          <InputBox
            placeholder={'First Name'}
            type={'text'}
            handleChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Last Name'}
            type={'text'}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Email'}
            type={'email'}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Phone'}
            type={'number'}
            handleChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <div className="h-[1px] bg-salam-blue my-14" />

          <div className="font-semibold text-lg mb-10">Residence</div>

          <Dropdown
            choices={allCountry.map(
              (country: { name: string; code: string }) => country.name
            )}
            placeholder={'Country of Residence'}
            onClick={setValCountry}
            isMandatory={false}
          />
          <InputBox
            placeholder={'City of Residence'}
            type={'text'}
            handleChange={(e) => {
              setCity(e.target.value);
            }}
          />

          <Dropdown
            choices={allNationality}
            placeholder={'Nationality'}
            onClick={setValNationality}
            isMandatory={false}
          />

          <div className="h-[1px] bg-salam-blue my-14" />

          <div className="font-semibold text-lg mb-10">
            Educational Information
          </div>

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

          <InputBox
            placeholder={'Major'}
            type={'text'}
            handleChange={(e) => {
              setMajor(e.target.value);
            }}
          />
          <Dropdown
            choices={allYears}
            placeholder={'Graduation year'}
            onClick={setValGraduationYear}
            isMandatory={false}
          />
          <InputBox
            max={100}
            placeholder={'GBA or %'}
            type={'number'}
            handleChange={(e) => {
              setGba(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Professional Certificate'}
            type={'text'}
            handleChange={(e) => {
              setProfessionalCertificate(e.target.value);
            }}
          />
          <div className="h-[1px] bg-salam-blue my-14" />

          <div className="font-semibold text-lg mb-10">
            Professional Experience
          </div>

          <CheckBoxInput
            name="work experience"
            title="Do you have any work experience?"
            options={['yes', 'no']}
            onClick={(e: any) => {
              setWorkExperience(e.target.value);
            }}
          />
          {workExperience === 'yes' && (
            <>
              <CheckBoxInput
                name="total experience"
                title="Total years of experience?"
                options={['0-3', '3-5', '5-10', '10+']}
                onClick={(e: any) => {
                  setTotalExperience(e.target.value);
                }}
              />

              <CheckBoxInput
                name="total relevant experience"
                title="Total years of relevant experience?"
                options={['0-3', '3-5', '5-10', '10+']}
                onClick={(e: any) => {
                  setTotalReleventExperience(e.target.value);
                }}
              />

              <InputBox
                placeholder={'Current Company?'}
                type={'text'}
                handleChange={(e) => {
                  setcurrentCompany(e.target.value);
                }}
              />

              <InputBox
                placeholder={'Current job title?'}
                type={'text'}
                handleChange={(e) => {
                  setCurrentJobTitle(e.target.value);
                }}
              />
            </>
          )}
          <div className="h-[1px] bg-salam-blue my-14" />

          <div className="font-semibold text-lg mb-10">{'Attachments'}</div>
          <InputBox
            placeholder={'LinkedIn Profile URL'}
            type={'text'}
            handleChange={(e) => {
              setLinkedInUrl(e.target.value);
            }}
          />
          <InputBox
            title="CV Upload as PDF"
            placeholder={'CV Upload as PDF.'}
            type={'file'}
            handleChange={(e) => {
              setCv(e.target.files);
            }}
          />
          <Button
            styles="w-full my-10"
            buttonType="primary"
            onClick={() => {
              submitForm();
            }}
            title={'Submit Form'}
          />
          <div className="h-[1px] bg-white my-28 md:my-14" />
        </div>
        <div />
      </div>
    </div>
  );
};

export default Form;
