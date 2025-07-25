import React from 'react';
import {useRouter} from "next/router";
import {Skeleton} from "antd";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import NotStarted from "@/widgets/NotStarted/NotStarted";
import Request from "@/shared/ui/Request/Request";

import {useRequests} from "@/entities/Request/Request.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Requests = () => {
  const router = useRouter();
  const {user} = useAuth();

  const {data, isFetching} = useRequests();

  return (
    <>
      <CabinetLayout>
        {!isFetching && data?.data?.content && data?.data?.content.length ? (
          <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>Ваши заявки {data?.data?.content.length}</h2>
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
                title={`${user?.firstname}, вы еще не отправили ни одного заявки.`}
                description={"Начните учиться уже сегодня"}
                button={"Найти юриста"}
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