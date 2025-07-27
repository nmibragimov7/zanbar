import React from 'react';
import Image from "next/image";
import {Button, Pagination, Skeleton, Table} from "antd";
import {ColumnsType} from "antd/es/table";

import AdminLayout from "@/widgets/AdminLayout/AdminLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import filterIcon from "@/shared/assets/images/svg/filter.svg";
import dotsIcon from "@/shared/assets/images/svg/dots.svg";
import avatarIcon from "@/shared/assets/images/png/avatar.png";

const Users = () => {
  const [page, setPage] = React.useState(1);

  const columns: ColumnsType = [
    {
      title: "Наименование",
      dataIndex: "name",
      render: (data) => <div className={"text-sm flex items-center gap-3"}>
        <div className={"w-10 h-10 rounded-full"}>
          <Image src={avatarIcon} alt={""} className={"w-full h-full object-contain"}/>
        </div>
        <span>Расулова Мадина</span>
      </div>
    },
    {
      title: "Эл.почта",
      key: "username",
      render: (data) => <div className={"text-dark-400 text-sm"}>madina@gmail.com</div>
    },
    {
      title: "Курсы",
      key: "courses",
      render: (data) => <div className={"text-dark-400 text-sm"}>12</div>
    },
    {
      title: "Вопросы",
      key: "questions",
      render: (data) => <div className={"text-dark-400 text-sm"}>12</div>
    },
    {
      title: "Ответы",
      key: "answers",
      render: (data) => <div className={"text-dark-400 text-sm"}>12</div>
    },
    {
      title: "Дата создания",
      dataIndex: "create_at",
      render: (data) => <div className={"text-dark-400 text-sm"}>12.02.2024</div>
    },
  ];
  const rows = [
    {
      name: "Современные технологии органического земледелия",
      course: "Современные технологии органического земледелия",
      type: "Основной тест",
      create_at: "",
      status: "",
      completed: "120",
    },
  ]

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <AdminLayout>
        <div className={"flex items-center justify-between mb-10"}>
          <p className={"text-[30px] font-medium"}>Пользователи</p>
          <div className={"flex items-center gap-4"}>
            <Button
              className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
            >
              <Image src={filterIcon} alt={""}/>
              <span className={"hidden md:inline-block"}>Фильтры</span>
            </Button>
            <Button
              className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
            >
              <Image src={dotsIcon} alt={""}/>
              <span className={"hidden md:inline-block"}>Еще</span>
            </Button>
          </div>
        </div>
        <div className={"w-full mb-10"}>
          <div className={"border border-gray-200 rounded-xl overflow-hidden"}>
            <Skeleton
              loading={false}
              active
              paragraph={false}
              className={"w-full h-[400px] mb-4"}
            >
              <div className={"w-full overflow-x-auto mb-4"}>
                <Table
                  columns={columns}
                  dataSource={
                    rows.map((item: any, idx: number) => ({
                      key: item?.id || idx,
                      ...item,
                    })) || []
                  }
                  pagination={false}
                />
              </div>
            </Skeleton>
            <div className={"flex items-center justify-center mb-4"}>
              <Pagination
                current={page}
                total={100}
                pageSize={10}
                showSizeChanger={false}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Users;
export const getStaticProps = getDefaultStaticProps;
