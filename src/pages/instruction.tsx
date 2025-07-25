import React from 'react';
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Instruction = () => {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center"}>
          <div dangerouslySetInnerHTML={{__html: t('instruction')}} className={"w-full max-w-[790px] px-3 md:px-5 mb-10"}/>
        </div>
      </MainLayout>
    </>
  );
};

export default Instruction;
export const getStaticProps = getDefaultStaticProps;
