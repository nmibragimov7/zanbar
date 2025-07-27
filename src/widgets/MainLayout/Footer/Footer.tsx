import React from 'react';
import {useTranslation} from "next-i18next";

const Footer = () => {
  const {t} = useTranslation();

  return (
    <>
      <div className={"bg-gray-400 flex flex-col md:flex-row items-center justify-center md:justify-between py-[5vh] px-3 md:px-5"}>
        {/*<Image src={logoIcon} alt={""}/>*/}
        <div className={"h-20 flex items-center"}>
          {/*<p className={"text-5xl"}>Logo</p>*/}
        </div>

        <div className={"md:w-1/2 flex flex-col items-center justify-center md:block md:text-end px-3 md:px-6 mt-10 md:mt-0"}>
          <p className={"md:text-xs"}>
            {t('footer.description.0')}
          </p>
          <p className={"text-gray-600 md:text-xs mt-2"}>{t('footer.description.1')}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;