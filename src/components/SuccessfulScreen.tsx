import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const SuccessfulScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full min-h-screen flex-col justify-center items-center p-5 align-middle">
      <FaThumbsUp color="green" size={'100'} />
      <span className="text-2xl  text-salamgreen text-center my-5">
        {'We have successfully recieved your application'}
      </span>
      <div>
        <Button
          styles="w-full my-10 font-bold"
          buttonType="primary"
          onClick={() => {
            navigate('/');
          }}
          title={'Submit Another Application'}
        />
      </div>
    </div>
  );
};

export default SuccessfulScreen;
