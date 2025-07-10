import React from 'react';
import Image from "next/image";

import {classNames} from "@/shared/lib/classNames";

import arrowIcon from "@/shared/assets/images/svg/arrow.svg";

interface NavigateProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const Navigate: React.FC<NavigateProps> = ({title, className, onClick}) => {
  return (
    <>
      <span
        className={
          classNames("cursor-pointer w-9 h-9 md:w-full md:h-auto max-w-[180px] transition-all hover:border-primary inline-flex items-center justify-center gap-3 border border-gray-200 rounded-lg md:py-2 md:px-4", className)
        }
        onClick={onClick}
      >
        <span className={"hidden md:block"}>{title}</span>
        <Image src={arrowIcon} alt={""}/>
      </span>
    </>
  );
};

export default Navigate;