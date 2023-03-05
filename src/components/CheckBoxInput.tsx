/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import EducationComponent from './EducationComponent';

const CheckBoxInput = (props: {
  title: string;
  options: string[];
  name: string;
  required: boolean;
  value:
    | { degree: string; major: string; GPA: string; graduationYear: string }[]
    | undefined;
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
}) => {
  const currentYear = new Date().getFullYear();
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const allYearsNumber = range(currentYear, currentYear - 30, -1);
  const allYears = allYearsNumber.map((item) => ({
    value: item.toString(),
    label: item.toString(),
  }));

  const createIndex = (degree: string) => {
    props.value
      ? props.setValue([
          ...props.value,
          { degree: degree, GPA: '', graduationYear: '', major: '' },
        ])
      : props.setValue([
          { degree: degree, GPA: '', graduationYear: '', major: '' },
        ]);
  };
  const removeObj = (degree: string) => {
    props.setValue(
      props.value?.filter((item) => {
        return item.degree !== degree;
      })
    );
    console.log(props.value);
  };

  return (
    <>
      <div className="text-salam-blue font-semibold py-2">{props.title}</div>
      {props.options.map((item, index) => (
        <EducationComponent
          setValue={props.setValue}
          value={props.value}
          key={index}
          item={item}
          length={props.value?.length}
          allYears={allYears}
          removeObj={removeObj}
          createIndex={createIndex}
        />
      ))}
    </>
  );
};

export default CheckBoxInput;
