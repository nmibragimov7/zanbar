import React, {useMemo} from 'react';
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {Breadcrumb} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {knowledges} from "@/shared/constants/knowledge";

const Instructions = () => {
  const {t, i18n} = useTranslation();
  const knowledge = useMemo(() => {
    return knowledges.find(k => k?.id === "instructions");
  }, []);

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>Главная</Link>,
            },
            {
              title: <Link href={`/knowledge`}>База знаний</Link>,
            },
            {
              title: <span>{t(knowledge?.title || "")}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <h1 className={"text-xl md:text-3xl font-medium"}>{t(knowledge?.title || "")}</h1>
        </div>
      </MainLayout>
    </>
  );
};

export default Instructions;
export const getStaticProps = getDefaultStaticProps;