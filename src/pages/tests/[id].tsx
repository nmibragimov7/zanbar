import React, {useMemo} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Pagination, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout"
import TestDenied from "@/widgets/TestDenied/TestDenied";

import {useTestById, useTestFinish, useTestStart} from "@/entities/Test/Test.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {classNames} from "@/shared/lib/classNames";

import {testStatus} from "@/shared/constants/status";

import checkboxIcon from "@/shared/assets/images/svg/checkbox.svg";

const Id = () => {
  const router = useRouter();
  const {user} = useAuth();
  const id: any = router.query?.id;

  const [questions, setQuestions] = React.useState<any[]>([]);
  const [active, setActive] = React.useState<any>(null);
  const [finished, setFinished] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);

  const onError = () => {
    router.push({
      pathname: "/",
      query: {auth: true},
    });
  }
  const {data, isFetching} = useTestById({testId: id, onError});

  const onSuccess = (key: string, response: any) => {
    if (key === "finish") {
      setFinished(true);
      setActive(null);
      setCorrect(response?.correct || 0);

      return;
    }

    let initial = (response || []).map((q: any, idx: number) => ({...q, variants: q?.answers || [], answers: [], idx: idx + 1}));

    setQuestions(initial);
    if (initial && initial.length) {
      setActive(initial[0]);
    }
  }
  const startMutate = useTestStart({onSuccess});
  const finishMutate = useTestFinish({onSuccess});

  const isLastQuestion = useMemo(() => {
    return active?.idx === questions.length;
  }, [questions, active]);
  const isQuestionsCompleted = useMemo(() => {
    return questions.every((q: any) => q?.answers.length);
  }, [questions]);

  const onStart = async () => {
    if (data?.data?.state === testStatus.active) {
      startMutate.mutate(data?.data?.id);
      return;
    }

    setVisible(true);
  }
  const onPage = (iter: number) => {
    const idx = questions.findIndex((q: any) => q?.id === active?.id);
    if (idx < 0) return;
    if (idx + iter < 0) return;
    if (idx + iter > questions.length) return;

    setActive(questions[idx + iter]);
  }
  const onChange = (page: number) => {
    setActive(questions[page - 1]);
  }
  const onSelect = (id: number) => {
    if (active?.answers.includes(id)) {
      const question = {...active};
      setActive((prev: any) => ({...prev, answers: [...prev?.answers].filter((a: any) => a !== id)}));
      setQuestions(questions.map((q: any) => {
        if (q?.id === active?.id) {
          return {...q, answers: question?.answers.filter((a: any) => a !== id)};
        }

        return q;
      }))
      return;
    }

    setActive({...active, answers: [...active.answers, id]});
    setQuestions(questions.map((q: any) => {
      if (q?.id === active?.id) {
        return {...q, answers: [...active.answers, id]};
      }

      return q;
    }))
  }
  const onFinish = () => {
    const answers = questions.map((q: any) => ({questionId: q?.id, answerIds: q?.answers || []}));
    finishMutate.mutate({
      id: data?.data?.id,
      body: answers,
    });
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
              title: <Link href={"/tests"}>Тесты</Link>,
            },
            {
              title: <span>{data?.data?.title}</span>,
            },
          ]}
        />
        <div className={"pb-[5vh] md:pb-[10vh]"}>
          {!finished ? (
            <div className={"mt-10 md:mt-0 px-3 md:px-5"}>
              <div className={"flex justify-center"}>
                <div className={"w-full max-w-[790px]"}>
                  <Skeleton
                    loading={isFetching}
                    active
                    paragraph={false}
                    className={"w-full h-screen mb-10"}
                  >
                    <>
                      {!active ? (
                        <>
                          <h1 className={"text-3xl md:text-5xl leading-20 font-medium mb-8"}>
                            {data?.data?.title}
                          </h1>
                          <p className={"text-lg mb-8"}>
                            {data?.data?.description}
                          </p>
                          <Button
                            className={"w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                            disabled={startMutate.isLoading}
                            onClick={onStart}
                          >
                            Начать тест
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className={"flex items-center justify-center gap-1.5 mb-10"}>
                            <Pagination
                              className={"test"}
                              current={active?.idx}
                              total={questions.length * questions.length}
                              pageSize={questions.length}
                              showSizeChanger={false}
                              itemRender={(page, type, original) => {
                                if (type === 'prev' || type === 'next') {
                                  return null;
                                }

                                if (type === 'page' || type === 'jump-next' || type === 'jump-prev') {
                                  return (
                                    <div
                                      className={
                                        classNames(
                                          "shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border border-gray-100 bg-gray-100 text-gray-600 text-sm",
                                          {"!text-primary !border-primary": active?.idx === page},
                                          {"!text-green-900 !border-green-200 !bg-green-200": type === 'page' && !!questions[page - 1]?.answers.length},
                                        )
                                      }
                                    >
                                      {type === 'jump-next' || type === 'jump-prev' ? "..." : page}
                                    </div>
                                  );
                                }

                                return original;
                              }}
                              onChange={onChange}
                            />
                          </div>
                          <div className={"rounded-2xl border border-gray-300 p-6 mb-10"}>
                            <p className={"text-dark-400 mb-4"}>Вопрос {active?.questionNumber}</p>
                            <p className={"text-lg font-semibold mb-6"}>{active?.text}</p>
                            <div>
                              {active?.variants ? (
                                <div className={"grid gap-4"}>
                                  {active?.variants.map((variant: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className={"cursor-pointer transition-all hover:opacity-70 flex items-center gap-3 text-dark-500 text-sm font-medium"}
                                      onClick={() => onSelect(variant?.id)}
                                    >
                                      <div
                                        className={"shrink-0 w-4 h-4 flex items-center justify-center rounded bg-green-100 border border-green-800"}>
                                        {active?.answers.includes(variant?.id) ? <Image src={checkboxIcon} alt={""}/> : null}
                                      </div>
                                      <span>{variant?.text}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={"flex items-center justify-between gap-4 md:gap-0"}>
                            <Button
                              className={"w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                              disabled={active?.idx === 1}
                              onClick={() => onPage(-1)}
                            >
                              Предыдущий
                            </Button>
                            {isLastQuestion ? (
                              <Button
                                type={"primary"}
                                className={"w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-white"}
                                disabled={!isQuestionsCompleted || finishMutate.isLoading}
                                onClick={onFinish}
                              >
                                Завершить
                              </Button>
                            ) : (
                              <Button
                                className={"w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                                onClick={() => onPage(1)}
                              >
                                Следующий
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  </Skeleton>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={"flex justify-center text-center bg-green-100 p-10 mb-10"}>
                <div className={"w-full max-w-[770px] flex flex-col items-center"}>
                  <p className={"text-sm md:text-base text-green-900 font-semibold mb-6"}>ВАШ РЕЗУЛЬТАТ</p>
                  <h1 className={"text-3xl md:text-5xl font-medium mb-6"}>{correct} из {questions.length}</h1>
                  <p className={"text-dark-400 text-base md:text-xl"}>
                    Поздравляем! {user?.firstname || "Пользователь"}, вы успешно прошли
                    <br/>
                    <br/>
                    Основной тест по “{data?.data?.title}”
                  </p>
                </div>
              </div>
              <div className={"flex justify-center"}>
                <Link href={"/tests"}>
                  <Button
                    className={"text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                  >
                    Перейти к тестам
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </MainLayout>
      {visible ? (
        <TestDenied visible={visible} setVisible={setVisible} />
      ) : null}
    </>
  );
};

export default Id;