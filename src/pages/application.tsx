import React from 'react';
import Link from "next/link";
import {Breadcrumb} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Application = () => {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>{t('breadcrumb.0')}</Link>,
            },
            {
              title: <span>{t('breadcrumb.14')}</span>,
            },
          ]}
        />
        <div className={"flex justify-center"}>
          <div dangerouslySetInnerHTML={{__html: t('application')}} className={"w-full max-w-[790px] px-3 md:px-5 mt-10 md:mt-0 mb-10"}/>
        </div>
      </MainLayout>
    </>
  );
};

export default Application;
export const getStaticProps = getDefaultStaticProps;