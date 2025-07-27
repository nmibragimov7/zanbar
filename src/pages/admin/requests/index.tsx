import React, {useMemo} from 'react';
import Image from "next/image";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";
import {Button, notification, Pagination, Skeleton, Table} from "antd";

import AdminLayout from "@/widgets/AdminLayout/AdminLayout";
import Status from "@/shared/ui/Status/Status";
import Tag from "@/shared/ui/Tag/Tag";

import {useRequestApproveByAdmin, useRequestsByAdmin} from "@/entities/Lawyer/Lawyer.module";

import {formatDate} from "@/shared/lib/date";
import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {lawyerRequestStatus} from "@/shared/constants/status";

import filterIcon from "@/shared/assets/images/svg/filter.svg";
import dislikeIcon from "@/shared/assets/images/svg/dislike_gray.svg";
import likeIcon from "@/shared/assets/images/svg/like_gray.svg";
import uploadIcon from "@/shared/assets/images/svg/upload_file.svg";

const Index = () => {
  const [page, setPage] = React.useState(1);

  const {data, isFetching, refetch} = useRequestsByAdmin({page: page - 1, size: 10});
  const onSuccess = () => {
    refetch();
    notification.success({message: "Статус заявки успешно обновлен"})
  }
  const approveMutate = useRequestApproveByAdmin({onSuccess});

  const columns: ColumnsType = [
    {
      title: "Дата создания",
      dataIndex: "creationDate",
      render: (data) => <div className={"text-dark-400 text-sm"}>{formatDate(data, "dd.MM.yyyy")}</div>
    },
    {
      title: "Статус",
      key: "status",
      render: (data) =>
        <>
          {data?.status === lawyerRequestStatus.created ? (
            <div className={"flex flex-col items-center"}>
              <Status type={"blue"} text={"На проверке"} className={"!text-xs"}/>
              <div className={"w-full flex items-center justify-center gap-6 mt-2"}>
                <Image
                  src={dislikeIcon}
                  alt={""}
                  className={"cursor-pointer transition-all hover:opacity-70"}
                  onClick={() => approveMutate.mutate({id: data?.id, approved: false})}
                />
                <Image
                  src={likeIcon}
                  alt={""}
                  className={"cursor-pointer transition-all hover:opacity-70"}
                  onClick={() => approveMutate.mutate({id: data?.id, approved: true})}
                />
              </div>
            </div>
          ) : null}
          <div className={"flex flex-col items-center"}>
            {data?.status === lawyerRequestStatus.approved ? <Status type={"green"} text={"Опубликован"} className={"!text-xs"}/> : null}
            {data?.status === lawyerRequestStatus.revoked ? <Status type={"orange"} text={"Недоступен"} className={"!text-xs"}/> : null}
          </div>
        </>
    },
    {
      title: "ФИО",
      key: "fullname",
      render: (data) =>
        <div
          className={"text-sm cursor-pointer transition-all hover:text-blue-500"}
        >
          {data?.application?.lastName} {data?.application?.firstName} {data?.application?.patronymic}
        </div>
    },
    {
      title: "Номер телефона",
      key: "phoneNumber",
      render: (data) => <div className={"text-sm whitespace-nowrap"}>{data?.application?.phoneNumber}</div>
    },
    {
      title: "E-mail",
      key: "email",
      render: (data) => <div className={"text-sm"}>{data?.application?.email}</div>
    },
    {
      title: "Telegram аккаунт",
      key: "telegramAccount",
      render: (data) => (
        <Link
          href={`https://t.me/${data?.application?.telegramAccount}`}
          target={"_blank"}
          className={"text-sm text-blue-500 underline"}
        >
          {data?.application?.telegramAccount}
        </Link>
      )
    },
    {
      title: "Город",
      key: "city",
      render: (data) => <div className={"text-sm"}>{data?.application?.city}</div>
    },
    {
      title: "Профессиональная информация",
      key: "specials",
      render: (data) => (
        <div className={"flex flex-wrap gap-2"}>
          {data?.application?.specials && data?.application?.specials.length ? (
            <>
              {data?.application?.specials.map((tag: any, idx: number) =>
                <Tag
                  key={idx}
                  title={tag}
                  className={"whitespace-nowrap !text-xs"}
                />
              )}
            </>
          ) : null}
        </div>
      )
    },
    {
      title: "Белый список",
      key: "whiteList",
      render: (data) => <div className={"text-sm"}>{data?.whiteList ? "Да" : "Нет"}</div>
    },
    {
      title: "Документы",
      key: "dokuments",
      render: (data) => (
        <div className={"flex flex-col gap-2 text-xs"}>
          <a
            href={data?.application?.udostakBase64}
            target={"_blank"}
            download={"Удостоверение личности.pdf"}
            className={"flex items-center gap-2 whitespace-nowrap"}
          >
            <Image src={uploadIcon} alt={""} className={"w-4 h-4"}/>
            <span>Удостоверение личности</span>
          </a>
          <a
            href={data?.application?.diplomBase64}
            target={"_blank"}
            download={"Диплом об образовании.pdf"}
            className={"flex items-center gap-2 whitespace-nowrap"}
          >
            <Image src={uploadIcon} alt={""} className={"w-4 h-4"}/>
            <span>Диплом об образовании</span>
          </a>
          <a
            href={data?.application?.licenceBase64}
            target={"_blank"}
            download={"Лицензия.pdf"}
            className={"flex items-center gap-2 whitespace-nowrap"}
          >
            <Image src={uploadIcon} alt={""} className={"w-4 h-4"}/>
            <span>Лицензия</span>
          </a>
        </div>
      )
    },
  ];
  const rows = useMemo(() => {
    return data?.data?.content || [];
  }, [data]);

  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <AdminLayout>
        <div className={"flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-10"}>
          <p className={"text-[30px] font-medium"}>Заявки на юриста</p>
          <div className={"flex items-center gap-4"}>
            {/*<Button*/}
            {/*  className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}*/}
            {/*>*/}
            {/*  <Image src={filterIcon} alt={""}/>*/}
            {/*  <span className={"hidden md:inline-block"}>Фильтры</span>*/}
            {/*</Button>*/}
          </div>
        </div>
        <div className={"w-full mb-10"}>
          <div className={"border border-gray-200 rounded-xl overflow-hidden"}>
            <Skeleton
              loading={isFetching}
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
              {data?.data?.totalPages && data?.data?.totalPages > 1 ? (
                <Pagination
                  current={page}
                  total={data?.data?.totalPages * 10}
                  pageSize={10}
                  showSizeChanger={false}
                  onChange={onChange}
                />
              ) : null}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;
