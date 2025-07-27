import React, {useMemo} from 'react';
import Image from "next/image";
import {Button, notification, Pagination, Skeleton, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useRouter} from "next/router";

import AdminLayout from "@/widgets/AdminLayout/AdminLayout";
import Status from "@/shared/ui/Status/Status";

import {useQuestionApprove, useQuestionRevoke, useQuestionsByAdmin} from "@/entities/Forum/Forum.module";

import {formatDate} from "@/shared/lib/date";
import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {forumStatus} from "@/shared/constants/status";

import filterIcon from "@/shared/assets/images/svg/filter.svg";
import dotsIcon from "@/shared/assets/images/svg/dots.svg";
import dislikeIcon from "@/shared/assets/images/svg/dislike_gray.svg";
import likeIcon from "@/shared/assets/images/svg/like_gray.svg";

const Index = () => {
  const router  = useRouter();

  const [page, setPage] = React.useState(1);

  const {data, isFetching, refetch} = useQuestionsByAdmin({page: page - 1, size: 10});
  const onSuccess = () => {
    refetch()
    notification.success({message: "Статус вопроса успешно обновлен"})
  }
  const approveMutate = useQuestionApprove({onSuccess});
  const revokeMutate = useQuestionRevoke({onSuccess});

  const columns: ColumnsType = [
    {
      title: "Вопрос",
      key: "forumTitle",
      render: (data) =>
        <div
          className={"text-sm cursor-pointer transition-all hover:text-blue-500"}
          onClick={() => router.push("/admin/forum/view/" + data?.questionId)}
        >{data?.forumTitle}</div>
    },
    {
      title: "Категория",
      dataIndex: "category",
      render: (data) => <div className={"text-sm"}>{data}</div>
    },
    {
      title: "Ответы",
      dataIndex: "answerCount",
      render: (data) => <div className={"text-sm"}>{data}</div>
    },
    {
      title: "Статус",
      key: "status",
      render: (data) =>
        <>
          {data?.status === forumStatus.created ? (
            <div className={"flex flex-col items-center"}>
              <Status type={"blue"} text={"На проверке"} className={"!text-xs"}/>
              <div className={"w-full flex items-center justify-center gap-6 mt-2"}>
                <Image
                  src={dislikeIcon}
                  alt={""}
                  className={"cursor-pointer transition-all hover:opacity-70"}
                  onClick={() => revokeMutate.mutate(data?.questionId)}
                />
                <Image
                  src={likeIcon}
                  alt={""}
                  className={"cursor-pointer transition-all hover:opacity-70"}
                  onClick={() => approveMutate.mutate(data?.questionId)}
                />
              </div>
            </div>
          ) : null}
          <div className={"flex flex-col items-center"}>
            {data?.status === forumStatus.approved ? <Status type={"green"} text={"Опубликован"} className={"!text-xs"}/> : null}
            {data?.status === forumStatus.revoked ? <Status type={"orange"} text={"Недоступен"} className={"!text-xs"}/> : null}
          </div>
        </>
    },
    {
      title: "Автор",
      dataIndex: "authorImage",
      render: (data) => <div className={"flex items-center gap-2"}>
        <div className={"w-8 h-8 rounded-full overflow-hidden"}>
          {data ? (
            <img src={data} alt={""} className={"w-full h-full object-contain"}/>
          ) : (
            <div
              className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>A</div>
          )}
        </div>
        <span>Автор</span>
      </div>
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      render: (data) => <div className={"text-dark-400 text-sm"}>{formatDate(data, "dd.MM.yyyy")}</div>
    },
  ];
  const rows = useMemo(() => {
    if (data?.data?.content && data?.data?.content.length) {
      return data?.data?.content
    }
    return []
  }, [data])

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <AdminLayout>
        <div className={"flex items-center justify-between mb-10"}>
          <p className={"text-[30px] font-medium"}>Форум</p>
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
              loading={isFetching}
              active
              paragraph={false}
              className={"w-full h-[400px] m-4"}
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
            {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
              <div className={"flex items-center justify-center mb-4"}>
                <Pagination
                  current={page}
                  pageSize={data?.data?.totalPages}
                  showSizeChanger={false}
                  onChange={onChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;
