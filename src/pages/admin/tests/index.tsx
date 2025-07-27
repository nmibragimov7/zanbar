import React, {useMemo} from 'react';
import Image from "next/image";
import {Button, Pagination, Skeleton, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useRouter} from "next/router";

import AdminLayout from "@/widgets/AdminLayout/AdminLayout";

import {useTestsByAdmin} from "@/entities/Test/Test.module";
import {useCoursesByAdmin} from "@/entities/Course/Course.module";

import {formatDate} from "@/shared/lib/date";
import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import filterIcon from "@/shared/assets/images/svg/filter.svg";
import dotsIcon from "@/shared/assets/images/svg/dots.svg";
import plusIcon from "@/shared/assets/images/svg/plus.svg";

const Tests = () => {
  const router = useRouter();

  const [page, setPage] = React.useState(1);

  const {data: courses} = useCoursesByAdmin({page: page - 1, size: 1000});
  const {data, isFetching} = useTestsByAdmin({page: page - 1, size: 10});

  const columns: ColumnsType = [
    {
      title: "Наименование",
      key: "title",
      render: (data) =>
        <div
          className={"text-sm cursor-pointer transition-all hover:text-blue-500"}
          onClick={() => router.push("/admin/tests/view/" + data?.id)}
        >{data?.title}</div>
    },
    {
      title: "Курс",
      dataIndex: "courseId",
      render: (data) => <div className={"text-sm"}>{course(data)}</div>
    },
    {
      title: "Дата создания",
      dataIndex: "createdDate",
      render: (data) => <div className={"text-dark-400 text-sm"}>{formatDate(data, "dd.MM.yyyy")}</div>
    },
    {
      title: "Действия",
      key: "action",
      render: (data) =>
        <div className={"flex items-center gap-2"}>
          <div
            className={"cursor-pointer transition-all hover:opacity-70 text-dark-400 text-sm"}
            onClick={() => router.push("/admin/tests/edit/" + data?.id)}
          >
            Изменить
          </div>
        </div>
    },
  ];
  const rows = useMemo(() => {
    return data?.data?.content || [];
  }, [data]);

  const course = (id: number) => {
    return (courses?.data?.content || []).find((c: any) => c.id === id)?.title || id;
  }
  const onChange = async (current: number) => {
    setPage(current);
  }

  return (
    <>
      <AdminLayout>
        <div className={"flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-10"}>
          <p className={"text-[30px] font-medium"}>Тесты</p>
          <div className={"flex items-center gap-4"}>
            {/*<Button*/}
            {/*  className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}*/}
            {/*>*/}
            {/*  <Image src={filterIcon} alt={""}/>*/}
            {/*  <span className={"hidden md:inline-block"}>Фильтры</span>*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  className={"flex items-center gap-2 text-sm font-semibold !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}*/}
            {/*>*/}
            {/*  <Image src={dotsIcon} alt={""}/>*/}
            {/*  <span className={"hidden md:inline-block"}>Еще</span>*/}
            {/*</Button>*/}
            <Button
              className={"flex items-center gap-2 text-sm font-semibold w-full md:w-auto !h-10 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
              onClick={() => router.push("/admin/tests/create")}
            >
              <Image src={plusIcon} alt={""}/>
              <span>Добавить</span>
            </Button>
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

export default Tests;
export const getStaticProps = getDefaultStaticProps;
