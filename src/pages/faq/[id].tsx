import React, {useMemo} from 'react';
import Link from "next/link";
import {Breadcrumb} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Faq from "@/shared/ui/Faq/Faq";

import {faq} from "@/shared/constants/faq";

export async function getServerSideProps(context: any) {
  const {locale} = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru')),
    }
  }
}

const Id = () => {
  const {t, i18n} = useTranslation();
  const router = useRouter();
  const id = !isNaN(Number(router.query.id)) ? Number(router.query.id) : 0;
  const item = useMemo(() => {
    return faq.find(f => f?.id === id);
  }, [id]);
  console.log(item)

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
              title: <Link href={`/faq`}>{t('breadcrumb.6')}</Link>,
            },
            {
              title: <span>{t(item?.title || "")}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <h1 className={"text-xl md:text-3xl font-medium"}>{t(item?.title || "")}</h1>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[790px] grid gap-4 px-3 md:px-5"}>
            {item?.children && item?.children.length ? (
              <>
                {item?.children.map((f: any, idx: number) => (
                  <div key={idx}>
                    {f?.question && f?.answer ? (
                      <Faq question={t(f?.question)} answer={t(f?.answer)} />
                    ) : null}
                    {f?.image_ru && f?.image_kz ? (
                      <img src={i18n.language === "ru" ? f?.image_ru : f?.image_kz} alt=""/>
                    ) : null}
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

export default Id;
// export const getStaticProps = getDefaultStaticProps;
