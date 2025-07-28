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

const UsefulInformation = () => {
  const {t, i18n} = useTranslation();
  const knowledge = useMemo(() => {
    return knowledges.find(k => k?.id === "useful-information");
  }, []);
  const links = useMemo(() => {
    return (knowledge?.children || []).filter((c: any) => c?.isLink);
  }, [knowledge]);
  const contacts = useMemo(() => {
    return (knowledge?.children || []).filter((c: any) => !c?.isLink);
  }, [knowledge]);

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
        <div className={"flex flex-col items-center"}>
          <div className={"w-full max-w-[790px] px-3 md:px-5 mb-10"}>
            <div className={"grid gap-4"}>
              {links.length ? (
                <>
                  {links.map((k: any, idx: number) => (
                    <div key={idx}>
                      <Link
                        href={k?.link}
                        target={"_blank"}
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
          <div className={"w-full max-w-[790px] px-3 md:px-5 mb-10"}>
            <div className={"grid gap-2"}>
              <p className={"font-semibold"}>{t('knowledges.useful-information.text')}</p>
              {contacts.length ? (
                <>
                  {contacts.map((c: any, idx: number) => (
                    <div key={idx}>
                      <p className={"text-sm text-dark-400"}>{t(c?.title)}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default UsefulInformation;
export const getStaticProps = getDefaultStaticProps;