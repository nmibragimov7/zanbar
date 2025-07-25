import React, {PropsWithChildren} from 'react';
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";

import {useAuth} from "@/shared/hooks/useAuth";

const tabs = [
  {
    label: "Ваши заявки",
    value: "/cabinet/requests"
  },
  {
    label: "Курсы",
    value: "/cabinet/courses",
  },
  {
    label: "Тесты",
    value: "/cabinet/tests",
  },
  {
    label: "Форум",
    value: "/cabinet/questions",
  },
  {
    label: "Ответы",
    value: "/cabinet/answers",
  },
  {
    label: "Настройки",
    value: "/cabinet/settings",
  },
]

const CabinetLayout: React.FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();
  const {user} = useAuth();

  const onToggle = async (pathname: string) => {
    await router.push(pathname);
  }

  return (
    <>
      <MainLayout>
        <div className={"container mx-auto"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              <div className={"text-center mt-10 mb-8"}>
                <p className={"text-sm md:text-base text-purple-1000 font-semibold mb-4"}>Личный кабинет</p>
                <p className={"text-3xl md:text-5xl font-medium"}>{user?.firstname}</p>
              </div>
              <div className={"scroll overflow-x-auto flex flex-nowrap items-center justify-center gap-4 mb-10"}>
                <Tabs
                  activeTab={router.pathname}
                  tabs={tabs}
                  className={"w-full px-3"}
                  onToggle={onToggle}
                />
              </div>
              <div className={"px-3 md:px-0"}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
);
};

export default CabinetLayout;