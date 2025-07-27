import React from 'react';
import {useRouter} from "next/router";
import {notification} from "antd";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import CourseForm from "@/features/CourseForm/CourseForm";

import {useCourseByIdByAdmin, useCourseEdit, useCourseRemove} from "@/entities/Course/Course.module";

export async function getServerSideProps(context: any) {
  const {locale} = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru')),
    }
  }
}

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const onError = () => {
    router.push({
      pathname: "/admin/courses",
    });
  }
  const {data, isFetching, isLoading} = useCourseByIdByAdmin({courseId: id, onError});

  const onSuccess = (key: string) => {
    router.push("/admin/courses");

    if (key === "course-remove") {
      notification.success({message: "Курс успешно удален"})
      return
    }

    notification.success({message: "Курс успешно обновлен"})
  }
  const editMutate = useCourseEdit({onSuccess})
  const removeMutate = useCourseRemove({onSuccess})

  const onSubmit = (data: any) => {
    editMutate.mutate({
      id: parseInt(id),
      tags: data.values.tags,
      title: data.values.title,
      titleKz: data.values.titleKz,
      description: data.values.description,
      descriptionKz: data.values.descriptionKz,
      status: data?.checked ? "ACTIVE" : "NOT_ACTIVE",
      image: data?.image,
      lessons: (data?.lessons || []).map((item: any, idx: number) => ({...item, lessonNumber: idx + 1})),
    })
  }
  const onRemove = () => {
    removeMutate.mutate(id)
  }

  return (
    <>
      <FormLayout>
        <CourseForm
          data={data?.data}
          isLoading={isLoading}
          isFetching={isFetching || editMutate.isLoading || removeMutate.isLoading}
          onRemove={onRemove}
          onSubmit={onSubmit}
        />
      </FormLayout>
    </>
  );
};

export default Id;
