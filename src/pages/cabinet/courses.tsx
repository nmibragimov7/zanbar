import React, {useState} from 'react';
import {Pagination, Skeleton} from "antd";
import {useRouter} from "next/router";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import Card from "@/shared/ui/Card/Card";
import NotStarted from "@/widgets/NotStarted/NotStarted";

import {useCoursesHistory} from "@/entities/Course/Course.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Courses = () => {
  const router = useRouter();
  const {user} = useAuth();

  const [page, setPage] = useState(1);

  const {data, isFetching} = useCoursesHistory({page: 0, size: 9});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <CabinetLayout>
        {!isFetching && data?.data?.content && data?.data?.content.length ? (
          <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>Пройденные курсы {data?.data?.content.length}</h2>
        ) : null}
        <div className={"mb-10"}>
          <Skeleton
            loading={isFetching}
            active
            paragraph={false}
            className={"h-[64px] mb-[10vh]"}
          >
            {data?.data?.content && data?.data?.content.length ? (
              <div>
                <div className={"grid md:grid-cols-3 gap-6 pb-[10vh]"}>
                  {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((course: any, idx: number) => (
                    <Card
                      key={idx}
                      icon={course?.image}
                      pathname={`/courses/${course?.id}`}
                      tags={course?.tags}
                      title={course?.title}
                    />
                  )) : null}
                </div>
                {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
                  <div className={"flex items-center justify-center pb-[10vh]"}>
                    <Pagination
                      current={page}
                      total={data?.data?.totalPages * 9}
                      pageSize={9}
                      showSizeChanger={false}
                      onChange={onChange}
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <NotStarted
                title={`${user?.firstname}, вы еще не прошли ни одного курса.`}
                description={"Начните учиться уже сегодня"}
                button={"Перейти к курсам"}
                onClick={async () => router.push("/courses")}
              />
            )}
          </Skeleton>
        </div>
      </CabinetLayout>
    </>
  );
};

export default Courses;
export const getStaticProps = getDefaultStaticProps;