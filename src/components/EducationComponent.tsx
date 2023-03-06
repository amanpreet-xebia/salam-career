import React, { useState } from 'react';
import Select from 'react-select';
import InputBox from './InputBox';

const EducationComponent = (props: {
  item: string;
  allYears: { value: string; label: string }[];
  removeObj: (val: string) => void;
  length: number | undefined;
  createIndex: (degree: string) => void;
  setValue: React.Dispatch<
    React.SetStateAction<
      | {
          degree: string;
          major: string;
          GPA: string;
          graduationYear: string;
        }[]
      | undefined
    >
  >;
  value:
    | { degree: string; major: string; GPA: string; graduationYear: string }[]
    | undefined;
}) => {
  const [checked, setChecked] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const handleChange = () => {
    setChecked(!checked);
    if (checked) {
      props.removeObj(props.item);
    } else {
      props.createIndex(props.item);
      props.length && setIndex(props.length);
    }
  };
  const setValGraduationYear = (val: any) => {
    let items = props.value ? [...props.value] : [];
    let item = {
      ...items[index],
      graduationYear: val.value,
    };
    items[index] = item;
    props.setValue(items);
  };
  const EducationInformation = () => {
    const handleGpa = (e: any) => {
      const regex = /^(\d{0,1}[.]{0,1}\d{0,1})$/;
      if (e.target.value === '' || regex.test(e.target.value)) {
        console.log('hello');

        let items = props.value ? [...props.value] : [];
        let item = {
          ...items[index],
          GPA: e.target.value,
        };
        items[index] = item;
        props.setValue(items);
      }
    };
    return (
      <div className="grid grid-cols-6 gap-6 my-5">
        <div className="col-span-6 sm:col-span-3">
          <InputBox
            placeholder={'Major'}
            type={'text'}
            handleChange={(e) => {
              let items = props.value ? [...props.value] : [];
              let item = {
                ...items[index],
                major: e.target.value,
              };
              items[index] = item;
              props.setValue(items);
            }}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Select
            options={props.allYears}
            isSearchable
            onChange={setValGraduationYear}
            placeholder="Graduation Year"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputBox
            value={props.value && props.value[index].GPA}
            placeholder={'GPA or %'}
            type={'text'}
            handleChange={handleGpa}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="myCheck"
          type="checkbox"
          // onClickCapture={()=>{isCH}}
          // onClick={props.onClick}

          value={props.item}
          name={props.item}
          className="w-4 h-4 text-roman-silver bg-gray-100 border-gray-300 "
          checked={checked}
          onChange={handleChange}
        />
        <label
          about={props.item}
          className="ml-2 text-sm font-medium text-roman-silver"
        >
          {props.item}
        </label>
      </div>

      {checked &&
        props.item !== 'below high school' &&
        props.item !== 'High school' &&
        EducationInformation()}
    </>
  );
};

export default EducationComponent;
