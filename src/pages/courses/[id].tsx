import React, {useMemo} from 'react';
import Link from "next/link";
import {Breadcrumb, Button, Skeleton} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tag from "@/shared/ui/Tag/Tag";
import Status from "@/shared/ui/Status/Status";

import {useCourseById, useCourseStart, useLessonFinish, useLessonStart} from "@/entities/Course/Course.module";

import {classNames} from "@/shared/lib/classNames";

import {lessonStatus, testStatus} from "@/shared/constants/status";
import ProgressBar from "@/shared/ui/ProgressBar/ProgressBar";

const order = {
  [lessonStatus.completed]: 0,
  [lessonStatus.started]: 1,
  [lessonStatus.active]: 2
};

const Id = () => {
  const router = useRouter();
  const id: any = router.query?.id;

  const onError = () => {
    router.push({
      pathname: "/",
      query: {auth: true},
    });
  }
  const {data, isFetching, isLoading, refetch} = useCourseById({courseId: id, onError});

  const course = useMemo(() => {
    return data?.data
      ? {
        ...data?.data,
        lessons: (
          data?.data?.lessons && data.data.lessons.length
            ? data.data.lessons.sort((a: any, b: any) => order[a?.status] - order[b?.status])
            : []
          )
      }
      : null;
  }, [data])

  const onSuccess = async () => {
    await refetch();
  }
  const startMutate = useCourseStart({onSuccess});
  const lessonFinishMutate = useLessonFinish({onSuccess});
  const lessonStartMutate = useLessonStart({onSuccess});

  const process = useMemo(() => {
    if (course?.lessons && course?.lessons.length) {
      return {
        finished: course?.lessons.reduce((acc: number, lesson: any) => {
          if (lesson?.status === lessonStatus.completed) {
            return acc + 1;
          }
          return acc;
        }, 0),
        total: course?.lessons.length
      }
    }

    return {
      finished: 0,
      total: 1,
    }
  }, [course])
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }
  const isCompletedLessons = (lessons: any[]) => {
    return !!(lessons.length && lessons.every(lesson => lesson?.status === lessonStatus.completed));
  }
  const onStartLesson = async (idx: number, lesson: any) => {
    if (!idx) {
      startMutate.mutate(id);
      return;
    }

    lessonStartMutate.mutate(lesson?.id);
  }
  const onFinishLesson = async (lesson: any) => {
    lessonFinishMutate.mutate(lesson?.id);
  }
  const onStartTest = async (test: any) => {
    await router.push(`/tests/${test?.id}`);
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
              title: <Link href={"/courses"}>Курсы</Link>,
            },
            {
              title: <span>{course?.title}</span>,
            },
          ]}
        />

        <div className={"text-blue-900"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              {!course && isLoading ? (
                <Skeleton
                  loading={true}
                  active
                  paragraph={false}
                  className={"h-screen mb-10"}
                />
              ) : (
                <div className={classNames("relative mb-10", {"grayscale": course && isFetching})}>
                  {course && isFetching ? <div className={"absolute top-0 right-0 bottom-0 left-0"}></div> : null}

                  <h1 className={"hidden md:block text-4xl font-medium mb-6"}>
                    {course?.title}
                  </h1>

                  <div className={"mb-8 md:mb-10"}>
                    <div className={"grid gap-4"}>
                      <div className={"relative"}>
                        {course?.image ? (
                          <div className={"w-full h-[240px] md:h-[480px]"}>
                            <img src={course?.image} alt={""} className={"w-full h-full object-cover"}/>
                          </div>
                        ) : (
                          <div className={"md:hidden w-full h-[240px]"}></div>
                        )}

                        <div className={"md:hidden absolute top-0 left-0 w-full h-full bg-black/10"}></div>

                        <h1 className={"absolute bottom-4 left-3 right-3 md:hidden text-3xl text-white font-medium"}>
                          {course?.title}
                        </h1>
                      </div>
                      
                      <div className={"px-3 md:px-0"}>
                        {course?.description ? (
                          <p className={"text-lg"}>
                            {course?.description}
                          </p>
                        ) : null}
                        {course?.tags && course?.tags.length ? (
                          <div className={"flex items-center gap-2"}>
                            {(course?.tags || []).map((tag: any, idx: number) => (
                              <Tag key={idx} title={tag?.title}/>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className={"px-3 md:px-0"}>
                    <h2 className={"font-medium text-2xl mb-4"}>Прогресс прохождения курса</h2>
                    <div className={"flex justify-center md:justify-start mb-8 md:mb-10"}>
                      <ProgressBar current={process?.finished} total={process?.total}/>
                    </div>

                    <h2 className={"font-medium text-2xl mb-4"}>Уроки курса</h2>
                    <div className={"mb-8 md:mb-10"}>
                      <div className={"grid gap-4"}>
                        {course?.lessons ? course?.lessons.map((lesson: any, idx: number) => (
                          <div
                            key={idx}
                            className={"rounded-3xl bg-gray--100 p-4 md:p-6"}
                          >
                            {(
                              lesson?.status === lessonStatus.started
                              || lesson?.status === lessonStatus.completed
                            ) ? (
                              <div className={"mb-4"}>
                                {lesson?.status === lessonStatus.started ?
                                  <Status type={"red"} text={"В процессе"}/> : null}
                                {lesson?.status === lessonStatus.completed ?
                                  <Status type={"green"} text={"Завершен"}/> : null}
                              </div>
                            ) : null}

                            <p className={"mb-4"}>Урок {lesson?.lessonNumber}</p>
                            <p className={"text-lg font-semibold mb-4"}>{lesson?.title}</p>

                            {lesson.status && lesson.status === lessonStatus.started ? (
                              <div className={"grid gap-10 mb-4"}>
                                {lesson?.bodyText ? (
                                  <div dangerouslySetInnerHTML={{__html: lesson?.bodyText}}></div>
                                ) : null}
                                {lesson?.videoUrl ? (
                                  <>
                                    <iframe
                                      height="400px"
                                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson?.videoUrl)}`}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                      className={"rounded-xl w-full h-[400px]"}
                                    ></iframe>
                                  </>
                                ) : null}
                              </div>
                            ) : null}
                            <Button
                              className={
                                classNames(
                                  "w-full md:w-auto text-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:cursor-not-allowed disabled:opacity-70",
                                  {"hidden": lesson?.status === lessonStatus.completed || lesson?.status === lessonStatus.started},
                                )
                              }
                              disabled={
                                startMutate.isLoading
                                || lessonStartMutate.isLoading
                                || (!!idx && course?.lessons[idx - 1]?.status !== lessonStatus.completed && lesson?.status === lessonStatus.active)
                              }
                              onClick={() => onStartLesson(idx, lesson)}
                            >
                              Начать
                            </Button>
                            <Button
                              type={"primary"}
                              className={
                                classNames(
                                  "hidden w-full md:w-auto text-sm !h-9 shadow-none bg-purple-1000 text-white !rounded-lg",
                                  {"!inline-flex": lesson?.status === lessonStatus.started},
                                )
                              }
                              disabled={lessonFinishMutate.isLoading}
                              onClick={() => onFinishLesson(lesson)}
                            >
                              Завершить
                            </Button>
                          </div>
                        )) : null}
                      </div>
                    </div>

                    <h2 className={"font-medium text-2xl mb-4"}>Тестирование</h2>
                    <div>
                      <div className={"grid gap-4"}>
                        <div
                          className={"rounded-3xl bg-gray--100 p-4 md:p-6"}
                        >
                          {course?.test?.state === testStatus.completed ? (
                            <div className={"mb-4"}>
                              <Status type={"green"} text={"Завершен"}/>
                            </div>
                          ) : null}

                          <p className={"mb-4"}>{course?.test?.title}</p>
                          <p className={"text-lg font-semibold mb-4"}>{course?.test?.type}</p>

                          <Button
                            className={"w-full md:w-auto ext-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:cursor-not-allowed disabled:opacity-70"}
                            disabled={!isCompletedLessons(course?.lessons || []) && course?.test?.state !== testStatus.active}
                            onClick={() => onStartTest(course?.test)}
                          >
                            Начать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Id;