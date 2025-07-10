import React from 'react';
import {notification} from "antd";
import {useRouter} from "next/router";

import FormLayout from "@/widgets/FormLayout/FormLayout";
import TestForm from "@/features/TestForm/TestForm";

import {useTestCreate} from "@/entities/Test/Test.module";

const Create = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.push("/admin/tests");
    notification.success({message: "Тест успешно создан"})
  }
  const createMutate = useTestCreate({onSuccess})

  const onSubmit = (data: any) => {
    createMutate.mutate({
      title: data.values.title,
      courseId: data.values.courseId,
      type: data.values.type,
      questions: (data?.questions || []).map((item: any, idx: number) => ({...item, questionNumber: idx + 1})),
    });
  }

  return (
    <>
      <FormLayout>
        <TestForm
          isLoading={false}
          isFetching={createMutate.isLoading}
          onSubmit={onSubmit}
        />
      </FormLayout>
    </>
  );
};

export default Create;