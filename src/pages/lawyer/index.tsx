import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Button} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Status from "@/shared/ui/Status/Status";
import Faq from "@/shared/ui/Faq/Faq";

import logoIcon from "@/shared/assets/images/png/logo.png";
import fineIcon from "@/shared/assets/images/svg/fine.svg";
import evictionIcon from "@/shared/assets/images/svg/eviction.svg";
import trespassingIcon from "@/shared/assets/images/svg/trespassing.svg";
import collectionIcon from "@/shared/assets/images/svg/collection.svg";
import complaintIcon from "@/shared/assets/images/svg/complaint.svg";
import adviceIcon from "@/shared/assets/images/svg/advice.svg";

const Index = () => {
  return (
    <MainLayout>
      <div className={"flex flex-col items-center font-medium text-sm md:text-base bg-gray-100 py-10 md:mb-10"}>
        <div className={"w-full max-w-[790px] px-3 md:px-5"}>
          <div className={"flex items-center justify-between gap-4 bg-purple-1000 rounded-2xl p-4 mb-10"}>
            <div className={"text-white"}>
              <p className={"text-lg font-bold mb-2"}>Расскажем, как работает поиск юристов</p>
              <p className={"text-sm"}>Отвечаем на вопросы</p>
            </div>
            <Image src={logoIcon} alt="logo" className={"w-10 h-10 object-contain"}/>
          </div>
        </div>

        <div className={"w-full max-w-[790px] text-black px-3 md:px-5"}>
          <h2 className={"font-semibold text-2xl mb-4"}>Популярные кейсы</h2>
          <div className={"grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-8"}>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={fineIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Обжалование штрафа</span>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={evictionIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Выселение арендатора</span>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={trespassingIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Нарушение границ</span>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={collectionIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Сбор доказательств</span>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={complaintIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Жалоба на полицию</span>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={adviceIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Юридическая консультация</span>
            </div>
            <div className={"hidden md:block"}></div>
            <div className={"col-span-2 md:col-span-1 flex flex-col gap-2"}>
              <div
                className={"relative bg-gray--200 rounded-xl flex items-center justify-center cursor-not-allowed py-6"}>
                <Image src={adviceIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                <Status type={"red"} text={"Скоро"} className={"absolute top-1 left-1 !text-xs !py-0.5 !px-2"}/>
              </div>
              <span className={"font-medium text-sm"}>Процедура банкротства</span>
            </div>
            <div className={"hidden md:block"}></div>
          </div>
        </div>

        <div className={"w-full max-w-[790px] px-3 md:px-5"}>
          <div className={"flex flex-col md:flex-row md:items-center md:justify-center gap-4"}>
            <Link href={"/lawyer/request"} className={"w-full"}>
              <Button
                type={"primary"}
                className={"w-full !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all"}
              >
                Найти юриста
              </Button>
            </Link>
            <Link href={"/lawyer/register"} className={"w-full"}>
              <Button
                className={"w-full !h-[44px] !shadow-none !bg-purple-100 text-purple-1000 !rounded-[100px] transition-all"}
              >
                Стать юристом платформы
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;