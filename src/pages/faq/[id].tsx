import React, {useMemo} from 'react';
import Link from "next/link";
import {Breadcrumb} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Faq from "@/shared/ui/Faq/Faq";

import {faq} from "@/shared/constants/faq";

const Id = () => {
  const router = useRouter();
  const id = !isNaN(Number(router.query.id)) ? Number(router.query.id) : 0;
  const item = useMemo(() => {
    return faq.find(f => f?.id === id);
  }, [id])

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
              title: <Link href={`/faq`}>FAQ</Link>,
            },
            {
              title: <span>{item?.title}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center mb-5 md:mb-10"}>
          <h1 className={"text-xl md:text-3xl font-medium mb-6"}>{item?.title}</h1>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[790px] grid gap-4 px-3 md:px-5"}>
            {item?.children && item?.children.length ? (
              <>
                {item?.children.map((f: any, idx: number) => (
                  <Faq key={idx} question={f?.question} answer={f?.answer} />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Id;