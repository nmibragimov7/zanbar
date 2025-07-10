import React from 'react';

import {classNames} from "@/shared/lib/classNames";

type StatusType = "blue" | "green" | "orange";
interface StatusProps {
  type: StatusType;
  text: string;
  className?: string;
}

const Status: React.FC<StatusProps> = ({type, text, className}) => {
  return (
    <>
      <div
        className={
          classNames(
            "inline-flex items-center gap-2 bg-green-300 rounded-2xl text-sm text-green-500 font-medium py-1 px-3",
            {"!bg-blue-300 !text-blue-500": type === "blue"},
            {"!bg-orange-300 !text-orange-500": type === "orange"},
            className
          )
        }
      >
        <div
          className={
            classNames(
              "w-1.5 h-1.5 rounded-full bg-green-400",
              {"!bg-blue-400": type === "blue"},
              {"!bg-orange-400": type === "orange"},
            )
          }
        ></div>
        <span>{text}</span>
      </div>
    </>
  );
};

export default Status;