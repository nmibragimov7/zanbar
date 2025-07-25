import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {knowledges} from "@/shared/constants/knowledge";

import bookIcon from "@/shared/assets/images/svg/book.svg";

const Index = () => {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>{t('knowledges.title')}</h1>
          </div>
        </div>
        <div className={"px-3 md:px-5"}>
          <div className={"grid md:grid-cols-2 gap-6 pb-[10vh]"}>
            {knowledges.map((item: any, idx: number) => (
              <Link
                key={idx}
                href={`/knowledge/${item?.id}`}
                className={"transition-all cursor-pointer hover:opacity-70 flex items-center justify-between gap-2 bg-purple-100 rounded-2xl py-6 px-6"}
              >
                <p className={"text-xl font-semibold text-purple-1000"}>{t(item?.title)}</p>
                <Image src={bookIcon} alt={""} className={"w-10 h-10 md:w-14 md:h-14 shrink-0"} />
              </Link>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;