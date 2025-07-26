import React from 'react';
import {Pagination, Skeleton} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";
import Card from "@/shared/ui/Card/Card";

import {useCourses} from "@/entities/Course/Course.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const tabs = [
  {
    label: "Все",
    value: "all"
  },
  {
    label: "Новые",
    value: "new"
  },
]

const Index = () => {
  const {isAuth} = useAuth();
  const {t} = useTranslation();

  const [active, setActive] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const {data, isFetching} = useCourses({isAuth, page: page - 1, size: 6});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium mb-6"}>{t('course.title')}</h1>
            <p className={"text-dark-400 text-base md:text-xl"}>
              {t('course.description')}
            </p>
          </div>
        </div>
        <div className={"px-3 md:px-5 mb-10"}>
          {/*<div className={"flex items-center justify-between mb-8"}>*/}
          {/*  <Tabs*/}
          {/*    tabs={tabs}*/}
          {/*    onToggle={(value: string) => setActive(value)}*/}
          {/*  />*/}
          {/*  <Button*/}
          {/*    className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}*/}
          {/*  >*/}
          {/*    <Image src={filterIcon} alt={""}/>*/}
          {/*    <span>Фильтры</span>*/}
          {/*  </Button>*/}
          {/*</div>*/}
          <div className={"grid md:grid-cols-3 gap-6"}>
            {isFetching ? (
              <>
                <Skeleton
                  loading={true}
                  active
                  paragraph={false}
                  className={"h-[240px]"}
                />
                <Skeleton
                  loading={true}
                  active
                  paragraph={false}
                  className={"h-[240px]"}
                />
                <Skeleton
                  loading={true}
                  active
                  paragraph={false}
                  className={"h-[240px]"}
                />
              </>
            ) : (
              <>
                {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((course: any, idx: number) => (
                  <Card
                    key={idx}
                    index={idx}
                    icon={course?.image}
                    pathname={`/courses/${course?.id}`}
                    tags={course?.tags || []}
                    title={course?.title}
                  />
                )) : null}
              </>
            )}
          </div>
          {!isFetching && data?.data?.totalPages && data?.data?.totalPages > 1 ? (
            <div className={"flex items-center justify-center mt-10"}>
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
      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;