import React from 'react';

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Link from "next/link";
import {Button} from "antd";

const Help = () => {
  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-400 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium mb-6"}>Онлайн правовой консультант</h1>
            <p className={"text-dark-400 text-base md:text-xl mb-10"}>Интеллектуальный онлайн-консультант предоставляет автоматизированные ответы на правовые вопросы в режиме 24/7. Система использует алгоритмы обработки естественного языка и базу знаний, основанную на актуальных нормах казахстанского законодательства. Консультант помогает пользователям получить первичную информацию по интересующим темам, а также предлагает ссылки на соответствующие законы, шаблоны и обучающие материалы.</p>
            <Link href={"https://t.me/zan_aibot"} target={"_blank"}>
              <Button
                className={"w-[170px] !h-[44px] shadow-none bg-black text-white !rounded-lg"}
              >
                Перейти
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Help;