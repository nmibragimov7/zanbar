import React from 'react';
import Link from "next/link";
import {Breadcrumb, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Lawyer from "@/shared/ui/Lawyer/Lawyer";

import {useLawyers} from "@/entities/Lawyer/Lawyer.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Index = () => {
  const router = useRouter();
  const {data, isFetching} = useLawyers();

  const onNavigate = (idx: number) => {
    router.push(`/lawyer/request/list/${idx}`);
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
              title: <Link href={`/lawyer`}>Найти юриста</Link>,
            },
            {
              title: <Link href={`/lawyer/request`}>Поиск юриста</Link>,
            },
            {
              title: <span>Список юристов</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>Список юристов</h1>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <div className={"w-full max-w-[790px] text-black px-3 md:px-5"}>
            <div className={"grid gap-4 pb-[10vh]"}>
              <Skeleton
                loading={isFetching}
                active
                paragraph={false}
                className={"h-[128px]"}
              >
                {data?.data?.content && data?.data?.content.length ? data?.data?.content.map((l: any, idx: number) => (
                  <Lawyer key={idx} {...l} onClick={() => onNavigate(idx)} />
                )) : null}
              </Skeleton>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;