import React from 'react';
import Image from "next/image";

import logoIcon from "@/shared/assets/images/png/logo_dark.png";

const Footer = () => {
  return (
    <>
      <div className={"bg-gray-400 flex flex-col md:flex-row items-center justify-center md:justify-between py-[5vh] px-3 md:px-5"}>
        {/*<Image src={logoIcon} alt={""}/>*/}
        <div className={"h-20 flex items-center"}>
          {/*<p className={"text-5xl"}>Logo</p>*/}
        </div>

        <div className={"md:w-1/2 flex flex-col items-center justify-center md:block md:text-end px-3 md:px-6 mt-10 md:mt-0"}>
          <p className={"md:text-xs"}>
            Проект реализован при поддержке в рамках реализации программы № BR24993166 «Разработка комплексной инновационной онлайн-платформы, автоматизированной системы юридической помощи и единой системы автоматизации работы юристов»
          </p>
          <p className={"text-gray-600 md:text-xs mt-2"}>Научный руководитель: PhD, профессор Ахмедиярова Айнур Танатаровна</p>
        </div>
      </div>
    </>
  );
};

export default Footer;