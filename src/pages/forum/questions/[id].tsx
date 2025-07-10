import React, {useRef} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Form, Input, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Answer from "@/shared/ui/Answer/Answer";

import {TAnswer, useQuestionById, useSendAnswer, useSendLike} from "@/entities/Forum/Forum.module";

import {formatDate} from "@/shared/lib/date";

import {validation} from "@/shared/constants/validation";

import calendarIcon from "@/shared/assets/images/svg/calendar.svg";
import chatIcon from "@/shared/assets/images/svg/chat.svg";
import likeIcon from "@/shared/assets/images/svg/like.svg";
import chatBlackIcon from "@/shared/assets/images/svg/chat_black.svg";
import sendIcon from "@/shared/assets/images/svg/send.svg";

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const ref = useRef<HTMLDivElement | null>(null);

  const initial: TAnswer = {
    answer: "",
  };
  const [form] = Form.useForm<TAnswer>();

  const onError = () => {
    router.push({
      pathname: "/",
      query: {auth: true},
    });
  }
  const {data, isFetching, refetch} = useQuestionById({questionId: id, onError});

  const onSuccess = async (key: string) => {
    if (key === "send-answer") {
      form.resetFields();
    }

    await refetch();
  }
  const answerMutate = useSendAnswer({onSuccess})
  const likeMutate = useSendLike({onSuccess})

  const onFinish = (values: TAnswer) => {
    answerMutate.mutate({
      id,
      body: {
        text: values.answer,
      }
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
              title: <span>{data?.data?.forumTitle}</span>,
            },
          ]}
        />

        {isFetching ? (
          <div className={"mt-10 md:mt-0 px-3 md:px-5"}>
            <div className={"flex justify-center"}>
              <div className={"w-full max-w-[790px]"}>
                <Skeleton
                  loading={true}
                  active
                  paragraph={false}
                  className={"w-full h-screen mb-10"}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={"mt-10 md:mt-0 px-3 md:mx-5"}>
              <div className={"flex justify-center"}>
                <div className={"w-full max-w-[790px] md:border-t border-gray-300 md:pt-6"}>
                  <div className={"flex items-center justify-between mb-10"}>
                    <div className={"flex items-center gap-2"}>
                      <div className={"w-8 md:w-14 h-8 md:h-14 rounded-full overflow-hidden"}>
                        {data?.data?.authorImage ? (
                          <img src={data?.data?.authorImage} alt={""} className={"w-full h-full object-contain"}/>
                        ) : (
                          <div
                            className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>A</div>
                        )}
                      </div>
                      <p className={"text-lg font-semibold"}>{data?.data?.authorName}</p>
                    </div>
                    <div className={"flex items-center gap-4"}>
                      <div className={"flex items-center gap-1"}>
                        <Image src={calendarIcon} alt={""}/>
                        <span className={"text-gray-600 text-sm"}>{formatDate(data?.data?.createdAt, "dd MMMM yyyy")}</span>
                      </div>
                      <div className={"flex items-center gap-1"}>
                        <Image src={chatIcon} alt={""}/>
                        <span className={"text-gray-600 text-sm"}>Ответы {data?.data?.answerCount || 0}</span>
                      </div>
                    </div>
                  </div>
                  <h1 className={"font-medium text-2xl md:text-[30px] mb-4"}>{data?.data?.forumTitle}</h1>
                  {data?.data?.forumImage ? (
                    <img src={data?.data?.forumImage} alt={""} className={"w-full h-[220px] md:h-[530px] object-cover md:object-contain rounded-lg mb-4"}/>
                  ) : null}
                  <p className={"text-lg mb-8"}>
                    {data?.data?.text}
                  </p>
                  <div className={"flex items-center gap-4 mb-8"}>
                    <Button
                      className={"flex items-center gap-2 text-sm font-medium !h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                      disabled={likeMutate.isLoading}
                      onClick={() => likeMutate.mutate(id)}
                    >
                      <Image src={likeIcon} alt={""}/>
                      <p>{data?.data?.likes || 0} <span className={"hidden md:inline-block"}>Нравится</span></p>
                    </Button>
                    <Button
                      className={"w-full md:w-auto flex items-center gap-2 text-sm font-medium !h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                      onClick={() => window.scroll({top: ref.current?.offsetTop, behavior: "smooth"})}
                    >
                      <Image src={chatBlackIcon} alt={""}/>
                      <span>Ответить на вопрос</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={"bg-gray-400 py-10 px-3 md:px-5 mb-[10vh]"}>
              <div className={"flex justify-center"}>
                <div className={"w-full max-w-[790px]"}>
                  <p className={"text-xl font-semibold mb-8"}>Ответы {data?.data?.answerCount || 0}</p>
                  <div className={"grid gap-2 mb-8"}>
                    {data?.data?.answerCount ? (
                      <>
                        {data?.data?.answersList.map((item: any, idx: any) => (
                          <Answer
                            key={idx}
                            type={"default"}
                            {...item}
                          />
                        ))}
                      </>
                    ) : null}
                  </div>
                  <div ref={ref} className={"bg-white rounded-2xl p-4 md:p-6"}>
                    <p className={"text-2xl font-medium mb-6"}>Ответить на вопрос</p>
                    <Form
                      size={"large"}
                      layout={"vertical"}
                      initialValues={initial}
                      form={form}
                      className={"w-full"}
                      validateTrigger={["onSubmit"]}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="answer"
                        className={"mt-6 mb-8"}
                        rules={[{required: true, message: validation.REQUIRED}]}
                      >
                        <Input.TextArea
                          placeholder={"Введите текст"}
                          rows={6}
                          maxLength={5000}
                          style={{height: 120, resize: 'none'}}
                          className={"bg-gray-400 border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                        />
                      </Form.Item>
                      <Form.Item className={"mb-0"}>
                        <Button
                          htmlType={"submit"}
                          type={"primary"}
                          className={"flex items-center gap-2 text-base font-medium !h-12 shadow-none border-none !rounded-lg text-white px-5"}
                          disabled={answerMutate.isLoading}
                        >
                          <Image src={sendIcon} alt={""}/>
                          <span>Отправить</span>
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Id;