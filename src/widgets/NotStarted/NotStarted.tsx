import React from 'react';
import {Button} from "antd";

interface NotStartedProps {
  title: string;
  description: string;
  button: string;
  onClick: () => void;
}

const NotStarted: React.FC<NotStartedProps> = ({title, description, button, onClick}) => {
  return (
    <>
      <div className={"flex flex-col items-center text-center mt-16"}>
        <p className={"text-dark-400 text-xl"}>{title}</p>
        <p className={"text-dark-400 text-xl mb-10"}>{description}</p>
        <Button
          className={"text-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
          onClick={onClick}
        >
          {button}
        </Button>
      </div>
    </>
  );
};

export default NotStarted;