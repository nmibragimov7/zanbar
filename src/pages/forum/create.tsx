import React, {useMemo, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Form, Input, notification, Select, Skeleton, Upload, UploadFile} from "antd";
import {useRouter} from "next/router";
import type { GetProp, UploadProps } from 'antd';

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Field from "@/shared/ui/Field/Field";

import {TForum, useCategories, useQuestionCreate} from "@/entities/Forum/Forum.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {validation} from "@/shared/constants/validation";

import uploadIcon from "@/shared/assets/images/svg/upload.svg";
import sendIcon from "@/shared/assets/images/svg/send.svg";

type TOption = {
  value: any;
  label: string;
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Create = () => {
  const router = useRouter();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [image, setImage] = useState<string>("");

  const initial: TForum = {
    title: "",
    category: undefined,
    text: "",
  };
  const [form] = Form.useForm<TForum>();

  const {data: response, isFetching} = useCategories();

  const onSuccess = async () => {
    form.resetFields();
    notification.info({message: "Вопрос успешно создан"});
    setFileList([]);
    await router.push("/forum");
  }
  const createMutate = useQuestionCreate({onSuccess});

  const options: TOption[] = useMemo(() => {
    if (response?.data && response.data.length) {
      return response.data.map((item: any) => ({label: item?.categoryName, value: String(item?.id)}))
    }
    return []
  }, [response]);
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const onFinish = (values: TForum) => {
    createMutate.mutate({
      ...values,
      base64Image: image,
    })
  }

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>Главная</Link>,
            },
            {
              title: <Link href={`/forum`}>Форум</Link>,
            },
            {
              title: <span>Задать вопрос</span>,
            },
          ]}
        />
        <div className={"mt-10 md:mt-0 px-3 md:px-5"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              <h2 className={"font-medium text-[30px] mb-6"}>Задать вопрос</h2>
              <Form
                size={"large"}
                layout={"vertical"}
                initialValues={initial}
                form={form}
                className={"w-full mb-20"}
                validateTrigger={["onSubmit"]}
                onFinish={onFinish}
              >
                <div className={"w-full grid md:grid-cols-2 md:gap-4"}>
                  <Form.Item
                    name="title"
                    className={"w-full mb-6"}
                    rules={[{required: true, message: validation.REQUIRED}]}
                  >
                    <Field
                      placeholder={"Тема вопроса"}
                    />
                  </Form.Item>
                  <Skeleton
                    loading={isFetching}
                    active
                    paragraph={false}
                    className={"h-[44px] mb-6"}
                  >
                    <Form.Item
                      name="category"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        options={options}
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Выберите категорию"}
                      />
                    </Form.Item>
                  </Skeleton>
                </div>
                <Upload
                  beforeUpload={() => false}
                  accept=".jpg, .jpeg, .png, .svg"
                  maxCount={1}
                  fileList={fileList}
                  className={"mb-6"}
                  onChange={({file, fileList}) => {
                    if (file?.status !== "removed") {
                      if (file.size && file.size > 1500000) { // 1,5mb
                        notification.warning({message: "Файл не должен превышать 1.5 мб"});
                        return
                      }

                      getBase64(file as FileType, (url: string) => {
                        setImage(url);
                      })
                      setFileList(fileList);
                    } else {
                      setImage("");
                      setFileList([]);
                    }
                  }}
                >
                  <Button
                    className={"flex items-center gap-2 text-base font-medium !h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500 px-10"}
                  >
                    <Image src={uploadIcon} alt={""}/>
                    <span>Добавить фото</span>
                  </Button>
                </Upload>
                <Form.Item
                  name="text"
                  className={"mt-6 mb-8"}
                  rules={[{required: true, message: validation.REQUIRED}]}
                >
                  <Input.TextArea
                    placeholder={"Введите текст вопроса"}
                    rows={6}
                    maxLength={5000}
                    style={{height: 120, resize: 'none'}}
                    className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType={"submit"}
                    type={"primary"}
                    className={"w-1/2 md:w-auto flex items-center gap-2 text-base font-medium !h-12 shadow-none border-none !rounded-lg text-white px-5"}
                    disabled={createMutate.isLoading}
                  >
                    <Image src={sendIcon} alt={""}/>
                    <span>Отправить</span>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Create;
export const getStaticProps = getDefaultStaticProps;
