import React, {useState} from 'react';
import {useRouter} from "next/router";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import Answer from "@/shared/ui/Answer/Answer";
import NotStarted from "@/widgets/NotStarted/NotStarted";

import {useAnswersHistory} from "@/entities/Forum/Forum.module";

import {useAuth} from "@/shared/hooks/useAuth";
import {Pagination, Skeleton} from "antd";

const Answers = () => {
  const router = useRouter();
  const {user} = useAuth();

  const [page, setPage] = useState(1);

  const {data, isFetching} = useAnswersHistory({page: 0, size: 5});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <CabinetLayout>
        {isFetching || data?.data?.content && data?.data?.content.length ? (
          <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>Мои ответы {data?.data?.content.length}</h2>
        ) : null}
        <Skeleton
          loading={isFetching}
          active
          paragraph={false}
          className={"h-[274px] mb-[10vh]"}
        >
          {data?.data?.content && data?.data?.content.length ? (
            <div>
              <div className={"grid gap-6 pb-[10vh]"}>
                {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((answer: any, idx: number) => (
                  <Answer
                    key={idx}
                    type={"cabinet"}
                    {...answer}
                  />
                )) : null}
              </div>
              {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
                <div className={"flex items-center justify-center pb-[10vh]"}>
                  <Pagination
                    current={page}
                    total={data?.data?.totalPages * 5}
                    pageSize={5}
                    showSizeChanger={false}
                    onChange={onChange}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <NotStarted
              title={`${user?.firstname}, вы еще не ответили ни на один вопрос.`}
              description={"Начните делиться уже сегодня"}
              button={"Перейти к форуму"}
              onClick={async () => router.push("/forums")}
            />
          )}
        </Skeleton>
      </CabinetLayout>
    </>
  );
};

export default Answers;