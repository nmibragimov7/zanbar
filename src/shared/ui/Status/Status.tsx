import React from 'react';

import {classNames} from "@/shared/lib/classNames";

type StatusType = "blue" | "green" | "orange" | "red" | "purple" | "gray";
interface StatusProps {
  type: StatusType;
  text: string;
  className?: string;
  onClick?: () => void;
}

const Status: React.FC<StatusProps> = ({type, text, className, onClick}) => {
  return (
    <>
      <div
        className={
          classNames(
            "inline-flex items-center gap-2 bg-green-300 rounded-2xl text-sm text-green-500 font-medium py-1 px-3",
            {"!bg-blue-300 !text-blue-500": type === "blue"},
            {"!bg-orange-300 !text-orange-500": type === "orange"},
            {"!bg-red-100 !text-red-500": type === "red"},
            {"!bg-purple-300 !text-purple-1000": type === "purple"},
            {"!bg-gray-400 !text-dark-500": type === "gray"},
            className
          )
        }
        onClick={onClick}
      >
        <span>{text}</span>
      </div>
    </>
  );
};

export default Status;