import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import {Button, Form, Input, notification, Select, Skeleton, Switch} from "antd";
import {useRouter} from "next/router";

import Field from "@/shared/ui/Field/Field";

import {TTest} from "@/entities/Test/Test.module";
import {useCourses} from "@/entities/Course/Course.module";

import {classNames} from "@/shared/lib/classNames";

import {validation} from "@/shared/constants/validation";

import closeIcon from "@/shared/assets/images/svg/close.svg";
import removeIcon from "@/shared/assets/images/svg/remove.svg";
import checkboxIcon from "@/shared/assets/images/svg/checkbox_dark.svg";
import plusIcon from "@/shared/assets/images/svg/plus.svg";
import trashIcon from "@/shared/assets/images/svg/trash.svg";

interface TestFormProps {
  data?: any;
  isLoading: boolean;
  isFetching: boolean;
  onSubmit: (data: any) => void;
  onRemove?: () => void;
}
type TOption = {
  value: any;
  label: string;
};

const TestForm: React.FC<TestFormProps> = ({data, isLoading, isFetching, onSubmit, onRemove}) => {
  const router = useRouter();
  const id = router.query?.id;

  const [questions, setQuestions] = useState<any[]>([
    {
      text: "",
      answers: [
        {
          text: "",
          correct: false,
        },
      ],
    },
  ]);

  const initial: TTest = {
    title: "",
    type: "",
    courseId: undefined,
  };
  const [form] = Form.useForm<TTest>();

  const {data: courses, isFetching: isFetchingCourses} = useCourses({isAuth: true, page: 0, size: 10000});

  const options: TOption[] = useMemo(() => {
    if (courses?.data?.content && courses.data.content.length) {
      return courses.data.content.map((item: any) => ({label: item?.title, value: item?.id}))
    }
    return []
  }, [courses]);

  const onChangeAnswer = (idx: number, idy: number, key: string, value: any) => {
    setQuestions(questions.map((question: any, questionIndex: number) => {
      if (questionIndex === idx) {
        question.answers = question.answers.map((answer: any, answerIndex: number) => {
          if (answerIndex === idy) {
            answer[key] = value;
          }

          return answer;
        });
      }

      return question;
    }))
  }
  const onChangeQuestion = (idx: number, key: string, value: any) => {
    setQuestions(questions.map((question: any, idy: number) => {
      if (idy === idx) {
        question[key] = value;
      }

      return question;
    }))
  }
  const onRemoveAnswer = (idx: number, idy: number) => {
    setQuestions(questions.map((question: any, questionIndex: number) => {
      if (questionIndex === idx) {
        question.answers = question.answers.filter((_: any, answerIndex: number) => answerIndex !== idy);
      }

      return question;
    }))
  }
  const onRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_: any, idy: number) => idy !== idx));
  }
  const onAddAnswer = (idx: number) => {
    setQuestions(questions.map((question: any, idy: number) => {
      if (idy === idx) {
        question.answers = [...question.answers, {
          text: "",
          correct: false,
        }];
      }

      return question;
    }))
  }
  const onAddQuestion = () => {
    setQuestions([...questions,
      {
        text: "",
        answers: [
          {
            text: "",
            correct: false,
          },
        ],
      }
    ]);
  }
  const onSave = (values: TTest) => {
    if (questions.some((item: any) => !item?.text)) {
      notification.warning({message: "Заполните обязательные поля вопросов: Текст вопроса и Ответы"})
      return
    }

    onSubmit({
      values,
      questions,
    })
  }

  useEffect(() => {
    if (data) {
      form.setFieldValue("title", data?.title || "")
      form.setFieldValue("type", data?.type || "")
      form.setFieldValue("courseId", data?.courseId)

      if (data?.questions && data?.questions.length) {
        setQuestions(data?.questions.map((item: any) => ({id: item?.id, text: item?.text, answers: item?.answers || []})));
      }
    }
  }, [data]);

  return (
    <>
      <Form
        size={"large"}
        layout={"vertical"}
        initialValues={initial}
        form={form}
        className={"w-full"}
        validateTrigger={["onSubmit"]}
        onFinish={onSave}
      >
        <div className={"flex items-center justify-between border-b border-gray-300 py-4 mb-8"}>
          <Button
            className={"w-auto md:w-[135px] h-[44px] flex items-center gap-3 font-medium shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
            disabled={isFetching || isLoading}
            onClick={() => router.back()}
          >
            <Image src={closeIcon} alt={""} className={"w-2.5 h-2.5"}/>
            <span className={"hidden md:block"}>Закрыть</span>
          </Button>
          <div className={"flex items-center gap-4"}>
            {id ? (
              <Button
                className={"w-[44px] h-[44px] flex items-center gap-3 font-medium text-sm shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all !px-2"}
                disabled={isFetching || isLoading}
                onClick={onRemove}
              >
                <Image src={removeIcon} alt={""} className={"w-4 h-4"}/>
              </Button>
            ) : null}
            <Form.Item className={"mb-0"}>
              <Button
                htmlType={"submit"}
                className={"w-auto md:w-[150px] h-[44px] flex items-center gap-2 font-medium shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
                disabled={isFetching || isLoading}
              >
                <Image src={checkboxIcon} alt={""} className={"w-3 h-3"}/>
                <span className={"hidden md:block"}>Сохранить</span>
              </Button>
            </Form.Item>
          </div>
        </div>
        {isLoading ? (
          <>
            <div className={"bg-gray-100 w-full h-[47px] mb-6"}></div>
            <div className={"grid md:grid-cols-2 gap-6 md:gap-4 mb-6"}>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
            </div>
            <div className={"bg-gray-100 w-full h-[144px] mb-14"}></div>
            <div className={"bg-gray-100 w-full h-[28px] mb-6"}></div>
            <div className={"grid md:grid-cols-2 gap-4 mb-4"}>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
            </div>
            <div className={"bg-gray-100 w-full h-[186px] mb-10"}></div>
            <div className={"bg-gray-100 w-[220px] h-[48px]"}></div>
          </>
        ) : (
          <div className={"relative"}>
            <p className={"text-[30px] mb-6"}>Новый тест</p>
            <div className={"grid md:grid-cols-2 md:gap-4"}>
              <Form.Item
                name="title"
                className={"w-full mb-6"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Наименование"}
                  placeholder={"Введите текст"}
                />
              </Form.Item>
              <Skeleton
                loading={isFetchingCourses}
                active
                paragraph={false}
                className={"h-[68px] mb-6"}
              >
                <Form.Item
                  name="courseId"
                  label={"Курс"}
                  className={"mb-6"}
                >
                  <Select
                    className={"!h-[44px] !rounded-none"}
                    placeholder={"Выберите из списка"}
                    options={options}
                  />
                </Form.Item>
              </Skeleton>
            </div>
            <div className={"mb-14"}>
              <p className={"text-sm text-dark-500 mb-1"}>Полное описание</p>
              <Form.Item
                name="type"
                className={"mb-0"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Input.TextArea
                  placeholder={"Введите текст"}
                  rows={6}
                  maxLength={5000}
                  style={{height: 120, resize: 'none'}}
                  className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                />
              </Form.Item>
            </div>
            <div>
              {questions.map((question: any, idx: number) => (
                <div key={`question-${idx}`} className={"mb-10"}>
                  <div className={"flex items-center justify-between mb-6"}>
                    <p className={"text-xl"}>Вопрос {idx + 1}</p>
                    {idx ? (
                      <Button
                        className={"w-9 h-9 bg-gray-400 flex items-center gap-3 font-medium text-sm shadow-none !border-none !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all !px-2"}
                        onClick={() => onRemoveQuestion(idx)}
                      >
                        <Image src={removeIcon} alt={""} className={"w-4 h-4"}/>
                      </Button>
                    ) : null}
                  </div>
                  <div className={"grid md:grid-cols-2 gap-4 mb-4"}>
                    <Field
                      label={"Текст вопроса"}
                      placeholder={"Введите текст"}
                      value={question?.text}
                      onChange={(event: any) => onChangeQuestion(idx, "text", event.target.value)}
                    />
                  </div>
                  <div className={"w-full rounded-xl border border-gray-300 overflow-x-auto"}>
                    <table className={"w-full"}>
                      <tbody>
                      <tr className={"text-xs text-dark-400 font-medium border-b border-gray-300"}>
                        <td className={"w-[80%] md:w-3/5 py-3 px-3 md:px-6"}>Ответы</td>
                        <td className={"w-[10%] md:w-1/5 py-3 px-3 md:px-6"}>Правильный</td>
                        <td className={"w-[10%] md:w-1/5 py-3 px-3 md:px-6"}>Действия</td>
                      </tr>
                      </tbody>
                      <tbody>
                      {question.answers.map((answer: any, idy: number) => (
                        <tr key={`answer-${idx}-${idy}`}
                            className={classNames("border-b border-gray-300", {"bg-gray-100": idy % 2 !== 0})}>
                          <td className={"py-4 px-3 md:px-6"}>
                            <Field
                              placeholder={"Введите текст"}
                              value={answer?.text}
                              onChange={(event: any) => onChangeAnswer(idx, idy, "text", event.target.value)}
                            />
                          </td>
                          <td className={"py-4 px-3 md:px-6"}>
                            <Switch
                              title={"fdf"}
                              checked={answer?.correct}
                              onChange={(event: any) => onChangeAnswer(idx, idy, "correct", event)}
                            />
                          </td>
                          <td className={"py-4 px-3 md:px-6"}>
                            {idy ? (
                              <Image
                                src={trashIcon}
                                alt={""}
                                className={"w-5 h-5 transition-all cursor-pointer hover:opacity-70"}
                                onClick={() => onRemoveAnswer(idx, idy)}
                              />
                            ) : null}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                      <tbody>
                      <tr>
                        <td colSpan={3} className={"py-4 px-3 md:px-6"}>
                          <Button
                            className={"flex items-center gap-2 text-sm font-medium w-[220px] h-9 shadow-none border border-gray-200 !rounded-lg text-gray-600 px-10"}
                            onClick={() => onAddAnswer(idx)}
                          >
                            <Image src={plusIcon} alt={""} className={"w-3 h-3"}/>
                            <span>Добавить еще ответ</span>
                          </Button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className={"flex items-center gap-2 text-base font-medium w-[220px] h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500 px-10"}
              onClick={onAddQuestion}
            >
              <Image src={plusIcon} alt={""} className={"w-3 h-3"}/>
              <span>Добавить еще вопрос</span>
            </Button>
          </div>
          )}
      </Form>
    </>
  );
};

export default TestForm;