import React, { useState } from 'react';
// import AppContext from '../AppContext';
import InputBox from './InputBox';
import { useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import { Nationality } from '../constants/dropdown';
// import { Dropdown } from '../components/Dropdown';
const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [gba, setGba] = useState('');
  const [professionalCertificate, setProfessionalCertificate] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [totalReleventExperience, setTotalReleventExperience] = useState('');
  const [currentCompany, setcurrentCompany] = useState('');
  const [name, setName] = useState('');
  const location = useLocation();
  const { position } = location.state;
  const setValNationality = (val: string) => {
    setNationality(val);
  };
  return (
    <div className="h-screen">
      <div className="text-salam-blue p-20 text-3xl font-bold">
        <span>
          {'Apply for the position of: '}
          {position}
        </span>
      </div>
      <div className="grid grid-cols-3">
        <div />
        <div>
          <span className="font-semibold text-lg">Personal Information</span>
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
            type={'text'}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Phone'}
            type={'text'}
            handleChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <div className="h-[1px] bg-salam-blue my-14" />

          <span className="font-semibold text-lg">Residence</span>
          <InputBox
            placeholder={'Country of Residence '}
            type={'text'}
            handleChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <InputBox
            placeholder={'City of Residence'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* <InputBox
            placeholder={'Nationality'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          /> */}
          <Dropdown
            choices={Nationality}
            placeholder={'Nationality'}
            onClick={setValNationality}
            isMandatory={false}
          />
          {/* <Dropdown /> */}
          <div className="h-[1px] bg-salam-blue my-14" />

          <span className="font-semibold text-lg">Educational Information</span>
          <InputBox
            placeholder={'Educational Degree'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Major'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Graduation year'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'GBA or %'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="h-[1px] bg-salam-blue my-14" />

          <span className="font-semibold text-lg">Professional Experience</span>
          <InputBox
            placeholder={'Do you have any work experience'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Total years of experience?'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Total years of relevant experience?'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder={'Current Company?'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />

          <InputBox
            placeholder={'Current job title?'}
            type={'text'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            title="CV Upload as PDF"
            placeholder={'CV Upload as PDF.'}
            type={'file'}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="h-[1px] bg-salam-blue my-14" />
        </div>
        <div />
      </div>
    </div>
  );
};

export default Form;
