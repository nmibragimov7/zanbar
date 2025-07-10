import React from 'react';
import Link from "next/link";
import Image from "next/image";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {knowledges} from "@/shared/constants/knowledge";

import bookIcon from "@/shared/assets/images/svg/book.svg";

const initial = [
  {
    title: "о праве собственности на приватизируемое жилище",
    href: "/documents/knowledge/o_prave_sobstvennosti_na_privatiziruemoe_zhilishche.docx",
  },
  {
    title: "о прекращении права собственности",
    href: "/documents/knowledge/o_prekrashchenii_prava_sobstvennosti.docx",
  },
  {
    title: "О признании действительным акта выполненных работ",
    href: "/documents/knowledge/o_priznanii_deystvitelnymi_aktov_vypolnennyh_rabot.docx",
  },
  {
    title: "о признании гражданина безвестно отсутствующим",
    href: "/documents/knowledge/o_priznanii_grazhdanina_bezvestno_otsutstvuyushchim.docx",
  },
  {
    title: "о признании гражданина недееспособным",
    href: "/documents/knowledge/o_priznanii_grazhdanina_nedeesposobnym.docx",
  },
  {
    title: "о признании недостойным наследником",
    href: "/documents/knowledge/o_priznanii_grazhdanina_nedostoynym_naslednikom.docx",
  },
  {
    title: "о признании гражданина ограниченно дееспособным",
    href: "/documents/knowledge/o_priznanii_grazhdanina_ogranicheno_deesposobnym.docx",
  },
  {
    title: "о признании недействительным договора и взыскании суммы",
    href: "/documents/knowledge/o_priznanii_nedeystvitelnym_dogovora.docx",
  },
  {
    title: "о признании незаконным одностороннее расторжение договора",
    href: "/documents/knowledge/o_priznanii_nezakonnym_rastorzhenie_dogovora.docx",
  },
]

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium mb-6"}>База знаний</h1>
          </div>
        </div>
        <div className={"px-3 md:px-5"}>
          <div className={"grid md:grid-cols-3 gap-6 pb-[10vh]"}>
            {knowledges.map((item: any, idx: number) => (
              <Link
                key={idx}
                href={`/knowledge/${item?.id}`}
                className={"transition-all cursor-pointer hover:opacity-70 flex items-center justify-between gap-4 bg-purple-100 rounded-2xl py-4 px-6"}
              >
                <p className={"text-2xl font-semibold text-purple-1000"}>{item?.title}</p>
                <Image src={bookIcon} alt={""}/>
              </Link>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;