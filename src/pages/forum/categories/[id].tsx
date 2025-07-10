import React, {useMemo} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Pagination, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Question from "@/shared/ui/Question/Question";

import {useCategories, useQuestionsByCategory} from "@/entities/Forum/Forum.module";

import chatIcon from "@/shared/assets/images/svg/chat_black.svg";

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const [page, setPage] = React.useState(1);

  const {data: response, isFetching: isFetchingCategories} = useCategories();
  const {data, isFetching} = useQuestionsByCategory({page: page - 1, size: 10, categoryId: id});

  const category = useMemo(() => {
    if (response?.data && response.data.length) {
      return response.data.find((item: any) => String(item.id) === id);
    }
    return null
  }, [response, id]);

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>Главная</Link>,
            },
            {
              title: <Link href={`/forum`}>Форум</Link>,
            },
            {
              title: <span>{category?.categoryName}</span>,
            },
          ]}
        />
        <div className={"mt-10 md:mt-0 px-3 md:px-5"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              <div className={"flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6"}>
                <h2 className={"font-medium text-2xl md:text-[30px]"}>{category?.categoryName}</h2>
                <Button
                  className={"flex items-center gap-2 text-sm font-semibold !h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                  onClick={() => router.push("/forum/create")}
                >
                  <Image src={chatIcon} alt={""}/>
                  <span>Задать вопрос</span>
                </Button>
              </div>
              <div className={"grid gap-4 pb-[10vh]"}>
                <Skeleton
                  loading={isFetching || isFetchingCategories}
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
                <div className={"flex items-center justify-center pb-[10vh]"}>
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

export default Id;