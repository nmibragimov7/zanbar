import React, {useMemo} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {Breadcrumb} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {knowledges} from "@/shared/constants/knowledge";

import rightIcon from "@/shared/assets/images/svg/right_base.svg";
import arrowIcon from "@/shared/assets/images/svg/arrow_right.svg";

const Id = () => {
  const router = useRouter();
  const id = !isNaN(Number(router.query.id)) ? Number(router.query.id) : 0;
  const knowledge = useMemo(() => {
    return knowledges.find(k => k?.id === id);
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
              title: <Link href={`/knowledge`}>База знаний</Link>,
            },
            {
              title: <span>{knowledge?.title}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center mb-5 md:mb-10"}>
          <h1 className={"text-xl md:text-3xl font-medium mb-6"}>{knowledge?.title}</h1>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[790px] grid gap-4 px-3 md:px-5"}>
            {knowledge?.children && knowledge?.children.length ? (
              <>
                {knowledge?.children.map((k: any, idx: number) => (
                  <div
                    key={idx}
                    className={"cursor-pointer transition-all hover:opacity-70 flex items-center justify-between shadow rounded-2xl py-2 px-4"}
                  >
                    <div className={"flex items-center gap-4"}>
                      <div className={"bg-purple-200 rounded-lg w-12 h-12 flex items-center justify-center"}>
                        <Image src={rightIcon} alt={""}/>
                      </div>
                      <span>{k?.title}</span>
                    </div>
                    <Image src={arrowIcon} alt={""} className={"w-5 h-5"}/>
                  </div>
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