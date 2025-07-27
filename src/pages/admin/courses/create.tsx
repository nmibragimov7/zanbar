import React from 'react';
import {notification} from "antd";
import {useRouter} from "next/router";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import CourseForm from "@/features/CourseForm/CourseForm";

import {useCourseCreate} from "@/entities/Course/Course.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Create = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.push("/admin/courses");
    notification.success({message: "Курс успешно создан"})
  }
  const createMutate = useCourseCreate({onSuccess})

  const onSubmit = (data: any) => {
    createMutate.mutate({
      title: data.values.title,
      titleKz: data.values.titleKz,
      tags: data.values.tags,
      description: data.values.description,
      descriptionKz: data.values.descriptionKz,
      // status: data?.checked ? "ACTIVE" : "NOT_ACTIVE",
      image: data?.image,
      lessons: (data?.lessons || []).map((item: any, idx: number) => ({...item, lessonNumber: idx + 1})),
    });
  }
  return (
    <>
      <FormLayout>
        <CourseForm
          isLoading={false}
          isFetching={createMutate.isLoading}
          onSubmit={onSubmit}
        />
      </FormLayout>
    </>
  );
};

export default Create;
export const getStaticProps = getDefaultStaticProps;
