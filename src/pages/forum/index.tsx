import React from 'react';
import {Pagination, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";
import Question from "@/shared/ui/Question/Question";

import {useCategories, useQuestions} from "@/entities/Forum/Forum.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const tabs = [
  {
    label: "Популярные",
    value: "popular"
  },
  {
    label: "Новые",
    value: "new"
  },
]

const Forum = () => {
  const router = useRouter();

  const [active, setActive] = React.useState("popular");
  const [page, setPage] = React.useState(1);

  const {data: response, isFetching: isFetchingCategories} = useCategories();
  const {data, isFetching} = useQuestions({page: page - 1, size: 10});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium mb-6"}>Форум</h1>
            <p className={"text-dark-400 text-base md:text-xl"}>Задавайте вопросы и получайте ответы</p>
          </div>
        </div>
        <div className={"px-3 md:px-5 mb-10"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              <h2
                className={"font-medium text-2xl md:text-[30px] mb-8"
              }>
                Категории {response?.data && response?.data.length ? response?.data.length : 0}
              </h2>

              <div className={"flex flex-col md:flex-row md:items-center gap-4 mb-10"}>
                <Skeleton
                  loading={isFetchingCategories}
                  active
                  paragraph={false}
                  className={"h-[70px]"}
                >
                  {response?.data && response?.data.length ? response?.data.map((c: any, idx: number) => (
                    <div
                      key={idx}
                      className={"flex items-center gap-2 text-lg cursor-pointer transition-all hover:bg-gray-100 rounded-2xl border border-gray-300 p-5"}
                      onClick={() => router.push(`/forum/categories/${c?.id}`)}
                    >
                      <span className={"font-semibold"}>{c?.categoryName}</span> <span
                      className={"text-gray-600"}>{c?.forumsCount}</span>
                    </div>
                  )) : null}
                </Skeleton>
              </div>
              <div className={"flex items-center justify-between mb-4"}>
                <h2 className={"font-medium text-2xl md:text-[30px]"}>Вопросы</h2>
                <Tabs
                  tabs={tabs}
                  onToggle={(value: string) => setActive(value)}
                />
              </div>
              <div className={"grid gap-4"}>
                <Skeleton
                  loading={isFetching}
                  active
                  paragraph={false}
                  className={"h-[114px]"}
                >
                  {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((question: any, idx: number) => (
                    <Question key={idx} {...question} isRow />
                  )) : null}
                </Skeleton>
              </div>
              {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
                <div className={"flex items-center justify-center mt-10"}>
                  <Pagination
                    current={page}
                    total={data?.data?.totalPages * 10}
                    pageSize={10}
                    showSizeChanger={false}
                    onChange={onChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Forum;
export const getStaticProps = getDefaultStaticProps;