import React, {PropsWithChildren} from 'react';
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";

const tabs = [
  {
    label: "Заявки",
    value: "/admin/requests",
  },
  {
    label: "Курсы",
    value: "/admin/courses",
  },
  {
    label: "Тесты",
    value: "/admin/tests",
  },
  {
    label: "Форум",
    value: "/admin/forum",
  },
  // {
  //   label: "Пользователи",
  //   value: "/admin/users",
  // },
]

const AdminLayout: React.FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();

  const onToggle = async (pathname: string) => {
    await router.push(pathname);
  }

  return (
    <>
      <MainLayout>
        <div>
          <div className={"scroll overflow-x-auto flex flex-nowrap items-center gap-4 mt-4 md:mt-0 mb-10"}>
            <Tabs
              activeTab={router.pathname}
              tabs={tabs}
              className={"w-full px-3"}
              onToggle={onToggle}
            />
          </div>
          <div className={"px-3 md:px-5"}>
            {children}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default AdminLayout;