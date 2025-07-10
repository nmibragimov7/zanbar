import React, {FC} from 'react';
import Link from "next/link";
import Image from "next/image";

import {classNames} from "@/shared/lib/classNames";

import logoIcon from "@/shared/assets/images/svg/logo_white.svg";

interface LogoProps {
  className?: string;
  classNamIcon?: string;
}

const Logo: FC<LogoProps> = ({className, classNamIcon}) => {
  return (
    <>
      <Link href={"/"} className={classNames("bg-purple-1000 w-10 h-10 rounded-xl flex items-center justify-center", className)}>
        <Image src={logoIcon} alt="logo" className={classNames("w-8 h-8 object-contain", classNamIcon)}/>
      </Link>
    </>
  );
};

export default Logo;