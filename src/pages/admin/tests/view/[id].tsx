import React from 'react';
import Image from "next/image";
import {Button, Pagination, Skeleton, Table} from "antd";
import {useRouter} from "next/router";
import {ColumnsType} from "antd/es/table";

import {useTestByIdByAdmin} from "@/entities/Test/Test.module";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";

import closeIcon from "@/shared/assets/images/svg/close.svg";
import avatarIcon from "@/shared/assets/images/png/avatar.png";

const tabs = [
  {
    label: "Описание",
    value: "description"
  },
  {
    label: "Пользователи",
    value: "users"
  },
]

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const [active, setActive] = React.useState("description");
  const [page, setPage] = React.useState(1);

  const columns: ColumnsType = [
    {
      title: "Имя",
      dataIndex: "name",
      render: (data) => <div className={"text-sm flex items-center gap-3"}>
        <div className={"w-10 h-10 rounded-full"}>
          <Image src={avatarIcon} alt={""} className={"w-full h-full object-contain"}/>
        </div>
        <span>Расулова Мадина</span>
      </div>
    },
    {
      title: "Статус",
      key: "status",
      render: (data) => <div></div>
    },
    {
      title: "Пройдено  уроков",
      key: "completed",
      render: (data) => <div className={"text-dark-400 text-sm"}>12/12</div>
    },
    {
      title: "Дата начала",
      dataIndex: "create_at",
      render: (data) => <div className={"text-dark-400 text-sm"}>12.02.2024</div>
    },
  ];
  const rows = [
    {
      name: "Расулова Мадина",
      status: "COMPLETED",
      completed: 12,
      create_at: "",
    },
  ]

  const onError = () => {
    router.push({
      pathname: "/admin/tests",
    });
  }
  const {data, isFetching} = useTestByIdByAdmin({testId: id, onError});

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <FormLayout>
        <div className={"flex items-center justify-between border-b border-gray-300 py-4 mb-8"}>
          <Button
            className={"md:w-[135px] h-[44px] flex items-center gap-3 font-medium shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
            disabled={isFetching}
            onClick={() => router.back()}
          >
            <Image src={closeIcon} alt={""} className={"w-2.5 h-2.5"}/>
            <span className={"hidden md:block"}>Закрыть</span>
          </Button>
        </div>
        <div>
          <div className={"flex items-center justify-between mb-5"}>
            <Tabs
              tabs={tabs}
              onToggle={(value: string) => setActive(value)}
            />
          </div>
          {active === "description" ? (
            <>
              {isFetching ? (
                <>
                  <div className={"bg-gray-100 w-full h-6 mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-6 mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-6 mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-[320px] mb-8"}></div>
                  <div className={"bg-gray-100 w-full h-6 mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-6 mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-6"}></div>
                </>
              ) : (
                <>
                  <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Наименование</div>
                    <div className={"grow"}>{data?.data?.title}</div>
                  </div>
                  <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Курс</div>
                    <div className={"grow"}>{data?.data?.courseId}</div>
                  </div>
                  <div className={"fflex flex-col md:flex-row gap-2 md:gap-4 mb-8"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Полное описание</div>
                    <div className={"grow"}>{data?.data?.type}</div>
                  </div>
                  {data?.data?.questions && data?.data?.questions.length ? (
                    <>
                      {data?.data?.questions.map((item: any, idx: number) => (
                        <div key={idx} className={"mb-10"}>
                          <p className={"text-xl font-medium mb-4"}>Вопрос {item?.questionNumber}</p>
                          <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                            <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Текст вопроса
                            </div>
                            <div className={"grow"}>{item?.text}</div>
                          </div>
                          {item?.answers.map((answer: any, idy: number) => (
                            <div key={idy} className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                              <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>
                                Ответ {idy + 1}{answer?.correct ? " – Правильный" : ""}
                              </div>
                              <div className={"grow"}>{answer?.text}</div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <>
              <div className={"w-full mb-10"}>
                <div className={"border border-gray-200 rounded-xl overflow-hidden"}>
                  <Skeleton
                    loading={false}
                    active
                    paragraph={false}
                    className={"w-full h-full mb-4"}
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
            </>
          )}
        </div>
      </FormLayout>
    </>
  );
};

export default Id;