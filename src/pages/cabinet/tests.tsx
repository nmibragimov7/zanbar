import React, {useState} from 'react';
import {useRouter} from "next/router";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import NotStarted from "@/widgets/NotStarted/NotStarted";

import {useTestsHistory} from "@/entities/Test/Test.module";

import {useAuth} from "@/shared/hooks/useAuth";
import {Pagination, Skeleton} from "antd";
import Card from "@/shared/ui/Card/Card";
import {testStatus} from "@/shared/constants/status";

const Tests = () => {
  const router = useRouter();
  const {user} = useAuth();

  const [page, setPage] = useState(1);

  const {data, isFetching} = useTestsHistory({page: 0, size: 6});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <CabinetLayout>
        {isFetching || data?.data?.content && data?.data?.content.length ? (
          <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>Сданные тесты {data?.data?.content.length}</h2>
        ) : null}
        <Skeleton
          loading={isFetching}
          active
          paragraph={false}
          className={"h-[64px] mb-[10vh]"}
        >
          {data?.data?.content && data?.data?.content.length ? (
            <div>
              <div className={"grid md:grid-cols-3 gap-6 pb-[10vh]"}>
                {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((test: any, idx: number) => (
                  <Card
                    key={idx}
                    pathname={`/tests/${test?.id}`}
                    tags={test?.state && test?.state === testStatus.active ? ["Доступен"] : test?.state && test?.state === testStatus.completed ? ["Пройден"] : []}
                    title={test?.title}
                    blocked={test?.state && test?.state === testStatus.notActive}
                    description={test?.type}
                  />
                )) : null}
              </div>
              {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
                <div className={"flex items-center justify-center pb-[10vh]"}>
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
          ) : (
            <NotStarted
              title={`${user?.firstname}, вы еще не прошли ни одного теста.`}
              description={"Начните учиться уже сегодня"}
              button={"Перейти к тестам"}
              onClick={async () => router.push("/tests")}
            />
          )}
        </Skeleton>
      </CabinetLayout>
    </>
  );
};

export default Tests;