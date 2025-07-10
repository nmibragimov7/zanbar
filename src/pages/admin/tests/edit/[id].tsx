import React from 'react';
import {notification} from "antd";
import {useRouter} from "next/router";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import TestForm from "@/features/TestForm/TestForm";

import {useTestByIdByAdmin, useTestEdit, useTestRemove} from "@/entities/Test/Test.module";

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const onError = () => {
    router.push({
      pathname: "/admin/courses",
    });
  }
  const {data, isFetching, isLoading} = useTestByIdByAdmin({testId: id, onError});

  const onSuccess = (key: string) => {
    router.push("/admin/tests");

    if (key === "test-remove") {
      notification.success({message: "Тест успешно удален"})
      return
    }

    notification.success({message: "Тест успешно обновлен"})
  }
  const editMutate = useTestEdit({onSuccess})
  const removeMutate = useTestRemove({onSuccess})

  const onSubmit = (data: any) => {
    console.log(data)
    editMutate.mutate({
      id: parseInt(id),
      title: data.values.title,
      courseId: data.values.courseId,
      type: data.values.type,
      questions: (data?.questions || []).map((item: any, idx: number) => ({...item, questionNumber: idx + 1})),
    });
  }
  const onRemove = () => {
    removeMutate.mutate(id)
  }

  return (
    <>
      <FormLayout>
        <TestForm
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