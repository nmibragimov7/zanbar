import React from 'react';
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Application = () => {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center"}>
          <div dangerouslySetInnerHTML={{__html: t('application')}} className={"w-full max-w-[790px] px-3 md:px-5 my-10"}/>
        </div>
      </MainLayout>
    </>
  );
};

export default Application;
export const getStaticProps = getDefaultStaticProps;