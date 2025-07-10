import React from 'react';

import MainLayout from "@/widgets/MainLayout/MainLayout";

const initial = [
  {
    title: "Конституция",
    href: "/documents/legislator/k950001000_.01-01-2023.rus.pdf",
  },
  {
    title: "Уголовный кодекс",
    href: "/documents/legislator/2_.pdf",
  },
  {
    title: "Гражданский кодекс",
    href: "/documents/legislator/Гражданский кодекс Республи.docx",
  },
  {
    title: "Кодекс об административных правонарушениях",
    href: "/documents/legislator/k1400000235.09-04-2025.rus.pdf",
  },
  {
    title: "Налоговый кодекс",
    href: "/documents/legislator/Кодекс Республики Казахстан.docx",
  },
  {
    title: "Трудовой кодекс",
    href: "/documents/legislator/Трудовой кодекс Республики .docx",
  },
]

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-400 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium mb-6"}>Закон и право</h1>
          </div>
        </div>
        <div className={"px-3 md:px-5"}>
          <div className={"grid md:grid-cols-3 gap-6 pb-[10vh]"}>
          </div>
        </div>
      </MainLayout>
    </>
);
};

export default Index;