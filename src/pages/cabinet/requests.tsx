import React from 'react';
import {useRouter} from "next/router";
import {Skeleton} from "antd";
import {useTranslation} from "next-i18next";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import NotStarted from "@/widgets/NotStarted/NotStarted";
import Request from "@/shared/ui/Request/Request";

import {useRequests} from "@/entities/Request/Request.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Requests = () => {
  const router = useRouter();
  const {user} = useAuth();
  const {t} = useTranslation();

  const {data, isFetching} = useRequests();

  return (
    <>
      <CabinetLayout>
        {!isFetching && data?.data?.content && data?.data?.content.length ? (
          <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>{t('cabinet.request.title')} {data?.data?.content.length}</h2>
        ) : null}
        <div className={"mb-10"}>
          <Skeleton
            loading={isFetching}
            active
            paragraph={false}
            className={"h-[112px]"}
          >
            {data?.data?.content && data?.data?.content.length ? (
              <div>
                <div className={"grid gap-6 pb-[10vh]"}>
                  {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((r: any, idx: number) => (
                    <Request
                      key={idx}
                      status={r?.status}
                      category={r?.application?.category}
                      format={r?.application?.format}
                      amount={r?.application?.amount}
                    />
                  )) : null}
                </div>
              </div>
            ) : (
              <NotStarted
                title={`${user?.firstname}, ${t('cabinet.request.notfound.text.0')}`}
                description={t('cabinet.request.notfound.text.1')}
                button={t('cabinet.request.notfound.button.0')}
                onClick={async () => router.push("/lawyer")}
              />
            )}
          </Skeleton>
        </div>
      </CabinetLayout>
    </>
  );
};

export default Requests;
export const getStaticProps = getDefaultStaticProps;