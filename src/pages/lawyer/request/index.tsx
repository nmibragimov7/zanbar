import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import writeIcon from "@/shared/assets/images/svg/request_by_write.svg";
import findIcon from "@/shared/assets/images/svg/request_by_find.svg";

const Index = () => {
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
              title: <Link href={`/lawyer`}>{t('breadcrumb.7')}</Link>,
            },
            {
              title: <span>{t('breadcrumb.13')}</span>,
            },
          ]}
        />
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>{t('lawyer.request-page.title')}</h1>
          </div>
        </div>
        <div className={"text-black px-3 md:px-5"}>
          <h2 className={"font-semibold text-2xl mb-4"}>{t('lawyer.request-page.description.0')}</h2>
          <div className={"flex flex-col md:grid md:grid-cols-2 gap-4 mb-10"}>
            <Link
              href={"/lawyer/request/create"}
              className={"transition-all hover:opacity-70 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6"}
            >
              <div>
                <p className={"font-semibold text-purple-1000 mb-2"}>{t('lawyer.request-page.button.0')}</p>
                <p className={"text-xs"}>
                  {t('lawyer.request-page.description.1')}
                </p>
              </div>
              <Image src={writeIcon} alt={""} className={"w-30 h-30 object-contain"}/>
            </Link>
            <Link
              href={"/lawyer/request/list"}
              className={"transition-all hover:opacity-70 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6"}
            >
              <div>
                <p className={"font-semibold text-purple-1000 mb-2"}>{t('lawyer.request-page.button.1')}</p>
                <p className={"text-xs"}>
                  {t('lawyer.request-page.description.2')}
                </p>
              </div>
              <Image src={findIcon} alt={""} className={"w-30 h-30 object-contain"}/>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;