import React from 'react';
import Image from "next/image";

import {classNames} from "@/shared/lib/classNames";

interface TagProps {
  title?: string;
  icon?: string;
  type?: "dark" | "green" | "gray";
  className?: string;
}

const Tag: React.FC<TagProps> = ({title, icon, type = "dark", className}) => {
  return (
    <>
      <div
        className={
          classNames(
            "inline-block rounded-2xl text-center text-xs p-1 px-2",
            className,
            {"bg-gray-400 text-dark-500": type === "dark"},
            {"bg-green-100 text-green-1000": type === "green"},
            {"bg-gray-400": type === "gray"},
          )
        }
      >
        {icon ? (<Image src={icon} alt={""}/>) : title}
      </div>
    </>
  );
};

export default Tag;