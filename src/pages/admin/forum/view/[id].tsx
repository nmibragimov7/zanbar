import React, {useMemo} from 'react';
import Image from "next/image";
import {Button, Skeleton, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import Tabs from "@/shared/ui/Tabs/Tabs";

import {useQuestionById} from "@/entities/Forum/Forum.module";

import {formatDate} from "@/shared/lib/date";

import closeIcon from "@/shared/assets/images/svg/close.svg";

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

export async function getServerSideProps(context: any) {
  const {locale} = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru')),
    }
  }
}

const Id = () => {
  const router  = useRouter();
  const id: any = router.query?.id;

  const [active, setActive] = React.useState("description");

  const onError = () => {
    router.push({
      pathname: "/admin/forum",
    });
  }
  const {data, isFetching} = useQuestionById({questionId: id, onError});

  const columns: ColumnsType = [
    {
      title: "Наименование",
      dataIndex: "text",
      render: (data) => <div className={"text-dark-400 text-sm"}>{data}</div>
    },
    {
      title: "Автор",
      key: "name",
      render: (data) => <div className={"text-sm flex items-center gap-2"}>
        <div className={"w-8 h-8 rounded-full overflow-hidden"}>
          {data?.user?.userImage ? (
            <img src={data?.user?.userImage} alt={""} className={"w-full h-full object-contain"}/>
          ) : (
            <div
              className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}
            >
              {data?.user?.firstname ? data?.user?.firstname.toUppercase().substr(0, 1) : "A"}
            </div>
          )}
        </div>
        <span>{data?.user?.firstname}</span>
      </div>
    },
    {
      title: "Дата публикации",
      dataIndex: "createdDate",
      render: (data) => <div className={"text-dark-400 text-sm"}>{formatDate(data, "dd.MM.yyyy")}</div>
    },
  ];
  const rows = useMemo(() => {
    return data?.data?.answersList || [];
  }, [data])

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
          {/*<div*/}
          {/*  className={"flex items-center gap-2 bg-green-300 rounded-2xl text-sm text-green-500 font-medium py-1 px-3"}>*/}
          {/*  <div className={"w-1.5 h-1.5 rounded-full bg-green-400"}></div>*/}
          {/*  <span>Опубликован</span>*/}
          {/*</div>*/}
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
                  <div className={"bg-gray-100 w-full h-[320px] mb-4"}></div>
                  <div className={"bg-gray-100 w-full h-6 mb-8"}></div>
                </>
              ) : (
                <>
                  <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Тема</div>
                    <div className={"grow"}>{data?.data?.forumTitle}</div>
                  </div>
                  <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-4"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Фото</div>
                    <div className={"grow"}>
                      {data?.data?.forumImage ? (
                        <div className={"w-full md:w-[480px] h-[320px] rounded-lg border border-gray-200 p-4"}>
                          <img src={data?.data?.forumImage} alt={""} className={"w-full h-full object-contain"}/>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className={"flex flex-col md:flex-row gap-2 md:gap-4 mb-8"}>
                    <div className={"shrink-0 md:w-[200px] text-sm font-medium text-dark-500"}>Вопрос</div>
                    <div className={"grow"}>{data?.data?.text}</div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className={"w-full mb-10"}>
                <div className={"border border-gray-200 rounded-xl overflow-hidden"}>
                  <Skeleton
                    loading={isFetching}
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
