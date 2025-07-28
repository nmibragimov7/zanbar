import React, {useMemo} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {Breadcrumb} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {knowledges} from "@/shared/constants/knowledge";

import rightIcon from "@/shared/assets/images/svg/right_base.svg";
import arrowIcon from "@/shared/assets/images/svg/arrow_right.svg";

const Templates = () => {
  const {t, i18n} = useTranslation();
  const knowledge = useMemo(() => {
    return knowledges.find(k => k?.id === "templates");
  }, []);

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
              title: <Link href={`/knowledge`}>{t('breadcrumb.4')}</Link>,
            },
            {
              title: <span>{t(knowledge?.title || "")}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <h1 className={"text-xl md:text-3xl font-medium"}>{t(knowledge?.title || "")}</h1>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[1024px] grid gap-4 px-3 md:px-5"}>
            {knowledge?.children && knowledge?.children.length ? (
              <>
                {knowledge?.children.map((k: any, idx: number) => (
                  <div key={idx}>
                    <Link
                      href={`/documents/исковые заявления/${i18n.language}/${k?.document}`}
                      download
                      locale={false}
                      className={"cursor-pointer transition-all hover:opacity-70 flex items-center justify-between shadow rounded-2xl py-2 px-4"}
                    >
                      <div className={"flex items-center gap-4"}>
                        <div
                          className={"bg-purple-200 rounded-lg shrink-0 w-12 h-12 flex items-center justify-center"}>
                          <Image src={rightIcon} alt={""}/>
                        </div>
                        <span>{t(k?.title)}</span>
                      </div>
                      <Image src={arrowIcon} alt={""} className={"w-5 h-5"}/>
                    </Link>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Templates;
export const getStaticProps = getDefaultStaticProps;