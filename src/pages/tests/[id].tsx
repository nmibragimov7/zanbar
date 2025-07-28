import React, {useMemo} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Pagination, Skeleton} from "antd";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout"
import TestDenied from "@/widgets/TestDenied/TestDenied";
import ProgressBar from "@/shared/ui/ProgressBar/ProgressBar";

import {useTestById, useTestFinish, useTestStart} from "@/entities/Test/Test.module";

import {classNames} from "@/shared/lib/classNames";

import {testStatus} from "@/shared/constants/status";

import checkboxIcon from "@/shared/assets/images/svg/checkbox.svg";

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
  const {t} = useTranslation();

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
  const isSuccess = useMemo(() => {
    if (questions.length) {
      return correct / questions.length > 0.75;
    }

    return false;
  }, [correct, questions]);

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
              title: <Link href={"/"}>{t('breadcrumb.0')}</Link>,
            },
            {
              title: <Link href={"/tests"}>{t('breadcrumb.2')}</Link>,
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
                        <div className={"text-blue-900"}>
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
                            {t('test.item.button.0')}
                          </Button>
                        </div>
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
                                          {"!text-purple-1000 !border-purple-1000/50": active?.idx === page},
                                          {"!text-purple-1000 !border-purple-1000/20 !bg-purple-1000/20": type === 'page' && !!questions[page - 1]?.answers.length},
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
                          <div className={"text-blue-900 rounded-2xl bg-gray--100 p-6 mb-10"}>
                            <p className={"mb-4"}>{t('test.item.number')} {active?.questionNumber}</p>
                            <p className={"text-lg font-semibold mb-6"}>{active?.text}</p>
                            <div>
                              {active?.variants ? (
                                <div className={"grid gap-4"}>
                                  {active?.variants.map((variant: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className={"cursor-pointer transition-all hover:opacity-70 flex items-center gap-3 text-blue-900 text-sm font-medium"}
                                      onClick={() => onSelect(variant?.id)}
                                    >
                                      <div
                                        className={"shrink-0 w-4 h-4 flex items-center justify-center rounded bg-purple-1000/10 border border-purple-1000"}
                                      >
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
                              {t('test.item.button.1')}
                            </Button>
                            {isLastQuestion ? (
                              <Button
                                className={"bg-primary w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-white"}
                                disabled={!isQuestionsCompleted || finishMutate.isLoading}
                                onClick={onFinish}
                              >
                                {t('test.item.button.2')}
                              </Button>
                            ) : (
                              <Button
                                className={"w-full md:w-auto text-sm h-[44px] md:!h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                                onClick={() => onPage(1)}
                              >
                                {t('test.item.button.3')}
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
              <div className={"flex justify-center text-center text-blue-900 bg-gray-100 p-10 mb-5 md:mb-10"}>
                <div className={"w-full max-w-[790px] flex flex-col items-center px-3 md:px-5"}>
                  <p className={"text-sm md:text-base text-black font-semibold mb-6"}>
                    {t('test.item.finish.header')}
                  </p>
                  <h1 className={"text-2xl mb-4"}>
                    {isSuccess ? t('test.item.finish.title.0') : t('test.item.finish.title.1')}
                  </h1>
                  <p className={"text-2xl mb-6"}>
                    {
                      isSuccess
                        ? t('test.item.finish.description.0', {d: data?.data?.title})
                        : t('test.item.finish.description.1', {d: data?.data?.title})
                    }
                  </p>
                  <div className={"flex justify-center"}>
                    <ProgressBar
                      current={correct}
                      total={questions.length}
                      color={isSuccess ? "#32D583" : "#F97066"}
                    >
                      <div>
                        <p className={"text-xs mb-1"}>{t('test.item.finish.description.2')}</p>
                        <p className={"font-semibold"}><span className={"text-3xl"}>{correct}</span> <span className={"text-base"}>/ {questions.length}</span></p>
                      </div>
                    </ProgressBar>
                  </div>
                </div>
              </div>
              <div className={"flex justify-center"}>
                <div className={"w-full max-w-xl px-3 md:px-5"}>
                  {isSuccess ? (
                    <div className={"w-full"}>
                      <Button
                        className={"w-full !h-[44px] shadow-none bg-green-400 text-white !rounded-[100px] transition-all"}
                      >
                        {t('test.item.finish.button.0')}
                      </Button>
                    </div>
                  ) : (
                    <div className={"w-full flex items-center gap-2"}>
                      <Button
                        className={"w-full text-sm !h-[44px] shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                        onClick={() => setFinished(false)}
                      >
                        {t('test.item.finish.button.1')}
                      </Button>
                      <Link href={"/"} className={"w-full"}>
                        <Button
                          type={"primary"}
                          className={"w-full !h-[44px] shadow-none bg-purple-1000 text-white !rounded-lg transition-all"}
                        >
                          {t('test.item.finish.button.2')}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
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
