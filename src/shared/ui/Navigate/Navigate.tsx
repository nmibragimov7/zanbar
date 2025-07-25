import React from 'react';
import Image from "next/image";
import Link from "next/link";

import {classNames} from "@/shared/lib/classNames";

import arrowIcon from "@/shared/assets/images/svg/arrow.svg";

interface NavigateProps {
  title: string;
  href: string;
  className?: string;
}

const Navigate: React.FC<NavigateProps> = ({title, href, className}) => {
  return (
    <>
      <Link
        href={href}
        target={"_blank"}
        className={
          classNames("cursor-pointer transition-all hover:opacity-70 text-purple-1000 flex items-center gap-3", className)
        }
      >
        <span className={"text-purple-1000 text-sm"}>{title}</span>
        <Image src={arrowIcon} alt={""}/>
      </Link>
    </>
  );
};

export default Navigate;