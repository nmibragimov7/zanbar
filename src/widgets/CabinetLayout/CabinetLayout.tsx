import React, {PropsWithChildren} from 'react';
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";

import {useAuth} from "@/shared/hooks/useAuth";

const tabs = [
  {
    label: "cabinet.tab.0",
    value: "/cabinet/requests"
  },
  {
    label: "cabinet.tab.1",
    value: "/cabinet/courses",
  },
  {
    label: "cabinet.tab.2",
    value: "/cabinet/tests",
  },
  {
    label: "cabinet.tab.3",
    value: "/cabinet/questions",
  },
  {
    label: "cabinet.tab.4",
    value: "/cabinet/answers",
  },
  {
    label: "cabinet.tab.5",
    value: "/cabinet/settings",
  },
]

const CabinetLayout: React.FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();
  const {user} = useAuth();
  const {t} = useTranslation();

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
                <p className={"text-sm md:text-base text-purple-1000 font-semibold mb-4"}>{t('cabinet.title')}</p>
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