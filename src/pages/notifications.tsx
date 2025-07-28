import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Button, Pagination, Skeleton} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {useNotifications} from "@/entities/Request/Request.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";
import {classNames} from "@/shared/lib/classNames";

import {notificationStatus} from "@/shared/constants/status";

import approvedIcon from "@/shared/assets/images/svg/notification_approved.svg";
import revokedIcon from "@/shared/assets/images/svg/notification_revoked.svg";

const Notifications = () => {
  const {isAuth} = useAuth();
  const {t} = useTranslation();

  const [page, setPage] = React.useState(1);

  const {data, isFetching} = useNotifications({isAuth, page: page - 1, size: 6});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>{t('notification.title')}</h1>
          </div>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[790px] grid gap-4 px-3 md:px-5"}>
            <div className={"grid gap-4"}>
              {isFetching ? (
                <>
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[240px]"}
                  />
                </>
              ) : (
                <>
                  {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((n: any, idx: number) => (
                    <div
                      key={idx}
                      className={"flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 text-primary bg-gray--100 rounded-xl p-6"}
                    >
                      <div>
                        <Image src={n?.status === notificationStatus.approved ? approvedIcon : revokedIcon} alt={""} className={"mb-4"}/>
                        <p className={"font-semibold text-lg mb-2"}>{n?.title}</p>
                        <p className={"text-sm text-dark-400 mb-4"}>
                          {n?.content}
                        </p>
                      </div>
                      {n?.status === notificationStatus.approved ? (
                        <Link href={"https://t.me/zan_aibot"} target={"_blank"} className={"w-full md:w-[300px]"}>
                          <Button
                            className={
                              classNames(
                                "w-full !h-[44px] shadow-none bg-blue-400 text-white !rounded-lg transition-all",
                              )
                            }
                          >
                            <span>{t('notification.button.0')}</span>
                          </Button>
                        </Link>
                      ) : (
                        <Link href={"https://t.me/zan_aibot"} target={"_blank"} className={"w-full md:w-[300px]"}>
                          <Button
                            className={
                              classNames(
                                "w-full !h-[44px] shadow-none bg-white border-gray-200 !rounded-lg transition-all",
                              )
                            }
                          >
                            <span>{t('notification.button.1')}</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  )) : null}
                </>
              )}
            </div>
            {!isFetching && data?.data?.totalPages && data?.data?.totalPages > 1 ? (
              <div className={"flex items-center justify-center mt-[10vh]"}>
                <Pagination
                  current={page}
                  total={data?.data?.totalPages * 6}
                  pageSize={6}
                  showSizeChanger={false}
                  onChange={onChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Notifications;
export const getStaticProps = getDefaultStaticProps;