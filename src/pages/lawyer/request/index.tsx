import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import writeIcon from "@/shared/assets/images/svg/request_by_write.svg";
import findIcon from "@/shared/assets/images/svg/request_by_find.svg";

const Index = () => {
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
              title: <span>Поиск юриста</span>,
            },
          ]}
        />
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>Поиск юриста</h1>
          </div>
        </div>
        <div className={"text-black px-3 md:px-5"}>
          <h2 className={"font-semibold text-2xl mb-4"}>Выберите тип поиска</h2>
          <div className={"flex flex-col md:grid md:grid-cols-2 gap-4 mb-10"}>
            <Link
              href={"/lawyer/request/create"}
              className={"transition-all hover:opacity-70 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6"}
            >
              <div>
                <p className={"font-semibold text-purple-1000 mb-2"}>Написать заявку</p>
                <p className={"text-xs"}>
                  Вы можете в свободной форме написать о своей ситуации и создать заявку. С Вами свяжется сертифицированный юрист нашей платформы.
                </p>
              </div>
              <Image src={writeIcon} alt={""} className={"w-30 h-30 object-contain"}/>
            </Link>
            <Link
              href={"/lawyer/request/list"}
              className={"transition-all hover:opacity-70 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6"}
            >
              <div>
                <p className={"font-semibold text-purple-1000 mb-2"}>Найти юриста самостоятельно</p>
                <p className={"text-xs"}>
                  Вам откроется список сертифицированных юристов нашей платформы. Вы можете выбрать того, кто Вам понравится.
                </p>
              </div>
              <Image src={findIcon} alt={""} className={"w-30 h-30 object-contain"}/>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;