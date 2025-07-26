import React, {useMemo} from 'react';
import Link from "next/link";
import {Breadcrumb, Skeleton} from "antd";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Status from "@/shared/ui/Status/Status";
import Navigate from "@/shared/ui/Navigate/Navigate";

import {useLawyers} from "@/entities/Lawyer/Lawyer.module";

export async function getServerSideProps(context: any) {
  const {locale} = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru')),
    }
  }
}

const Idx = () => {
  const router = useRouter();
  const idx = parseInt(String(router.query?.idx));
  const {t} = useTranslation();

  const {data, isFetching} = useLawyers();
  const lawyer: any = useMemo(() => {
    if (data?.data?.content && data?.data?.content.length) {
      return data?.data?.content[idx];
    }

    return null;
  }, [data, idx]);
  const name = useMemo(() => {
    if (!lawyer?.firstName) return "Ю";
    return lawyer?.firstName.substr(0, 1);
  }, [lawyer]);
  const phone = useMemo(() => {
    if (lawyer?.phoneNumber) {
      return lawyer?.phoneNumber.replace(/^\+7\s*\((\d{3})\)\s*(\d{3})\s*(\d{4})$/, "8$1$2$3");
    }

    return "";
  }, [lawyer])

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
              title: <Link href={`/lawyer/request`}>{t('breadcrumb.9')}</Link>,
            },
            {
              title: <Link href={`/lawyer/request/list`}>{t('breadcrumb.11')}</Link>,
            },
            {
              title: <span>{lawyer?.firstName} {lawyer?.lastName}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>Список юристов</h1>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <div className={"w-full max-w-[790px] text-primary px-3 md:px-5 mb-10"}>
            <Skeleton
              loading={isFetching}
              active
              paragraph={false}
              className={"w-full h-[400px] mb-4"}
            >
              <div>
                <div className={"flex items-center gap-6 mb-4"}>
                  <div className={"shrink-0 w-28 h-28 rounded-full overflow-hidden shadow-200 p-2"}>
                    <div className={"w-full h-full rounded-full overflow-hidden"}>
                      {lawyer?.profilePictureBase64 ? (
                        <img
                          src={`data:image/png;base64,${lawyer?.profilePictureBase64}`}
                          alt={""}
                          className={"w-full h-full object-cover"}
                        />
                      ) : (
                        <div
                          className={"bg-green-100 w-full h-full flex items-center justify-center text-white font-medium text-2xl"}
                        >
                          <p>{name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Status type={"purple"} text={"Партнер"} className={"!bg-gray-0 mb-2"}/>
                    <p className={"font-semibold text-2xl mb-2"}>{lawyer?.firstName} {lawyer?.lastName}</p>
                    <p className={"text-dark-400 text-lg"}>{lawyer?.city}</p>
                  </div>
                </div>
                <div className={"bg-gray-100/50 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>{lawyer?.phoneNumber || "-"}</p>
                  <p className={"text-dark-400 text-sm mb-2"}>Номер телефона</p>
                  <Navigate title={"Позвонить"} href={`tel:${phone}`}/>
                </div>
                <div className={"bg-gray-100/50 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>{lawyer?.email || "-"}</p>
                  <p className={"text-dark-400 text-sm mb-2"}>Рабочая почта</p>
                  <Navigate title={"Написать"} href={`mailto:${lawyer?.email}`}/>
                </div>
                <div className={"bg-gray-100/50 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>@{lawyer?.telegramAccount || "-"}</p>
                  <p className={"text-dark-400 text-sm mb-2"}>Telegram аккаунт</p>
                  <Navigate title={"Связаться"} href={`https://t.me/${lawyer?.telegramAccount}`}/>
                </div>
                <div className={"bg-gray-100/50 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>Специализация</p>
                  <div className={"flex flex-wrap items-center gap-1"}>
                    {lawyer?.specials && lawyer?.specials.length ? (
                      <>
                        {lawyer?.specials.map((s: string, idx: number) => (
                          <Status key={idx} type={"purple"} text={s}
                                  className={"text-xs !bg-gray-0 whitespace-nowrap"}/>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={"bg-gray-100/50 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>Удостоверение личности</p>
                  <Navigate title={"Посмотреть"} href={lawyer?.udostakBase64}/>
                </div>
                <div className={"bg-gray-100 p-4 mb-4"}>
                  <p className={"font-semibold mb-2"}>Диплом об образовании</p>
                  <Navigate title={"Посмотреть"} href={lawyer?.diplomBase64}/>
                </div>
                <div className={"bg-gray-100/50 p-4"}>
                  <p className={"font-semibold mb-2"}>Лицензия</p>
                  <Navigate title={"Посмотреть"} href={lawyer?.licenceBase64}/>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Idx;
