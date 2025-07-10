import React, {useMemo} from 'react';
import Link from "next/link";
import {Breadcrumb, Button} from "antd";
import {useRouter} from "next/router";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Tag from "@/shared/ui/Tag/Tag";

import {useCourseById, useCourseStart, useLessonFinish, useLessonStart} from "@/entities/Course/Course.module";

import {classNames} from "@/shared/lib/classNames";

import {lessonStatus, testStatus} from "@/shared/constants/status";

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
    return data?.data;
  }, [data])
  console.log('course', course)

  const onSuccess = async () => {
    await refetch();
  }
  const startMutate = useCourseStart({onSuccess});
  const lessonFinishMutate = useLessonFinish({onSuccess});
  const lessonStartMutate = useLessonStart({onSuccess});

  const status = (value: string) => {
    if (value && value === lessonStatus.started) return "- В процессе";
    if (value && value === lessonStatus.completed) return "- Завершен";
    return ""
  }
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }
  const isCompletedLessons = (lessons: any[]) => {
    return !!(lessons.length && lessons.every(lesson => lesson?.status && lesson?.status === lessonStatus.completed));
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

        <div className={"mt-10 md:mt-0 px-3 md:px-5"}>
          <div className={"flex justify-center"}>
            <div className={"w-full max-w-[790px]"}>
              {!course && isLoading ? (
                <div className={"mb-10"}>
                  <div className={"bg-gray-100 w-full h-12 mb-8"}></div>
                  <div className={"mb-10"}>
                    <div className={"bg-gray-100 w-full h-[480px] md:h-[50vh] mb-4"}></div>
                    <div className={"bg-gray-100 w-full h-7"}></div>
                  </div>
                  <div className={"bg-gray-100 w-full h-7 mb-4"}></div>
                  <div className={"pb-[5vh] md:pb-[10vh]"}>
                    <div className={"bg-gray-100 w-full h-8 mb-8"}></div>
                    <div className={"bg-gray-100 w-full h-[118px]"}></div>
                  </div>
                  <div className={"pb-[5vh] md:pb-[10vh]"}>
                    <div className={"bg-gray-100 w-full h-8 mb-8"}></div>
                    <div className={"bg-gray-100 w-full h-[170px]"}></div>
                  </div>
                </div>
              ) : (
                <div className={classNames("relative mb-10", {"grayscale": course && isFetching})}>
                  {course && isFetching ? <div className={"absolute top-0 right-0 bottom-0 left-0"}></div> : null}
                  <h1 className={"text-3xl md:text-5xl leading-20 font-medium mb-8"}>
                    {course?.title}
                  </h1>
                  <div className={"mb-10"}>
                    {course?.image ? (
                      <div className={"w-full h-[480px] md:h-[50vh] mb-4"}>
                        <img src={course?.image} alt={""} className={"w-full h-full object-cover"}/>
                      </div>
                    ) : null}
                    <p className={"text-lg mb-4"}>
                      {course?.description}
                    </p>
                    <div className={"flex items-center gap-2"}>
                      {(course?.tags || []).map((tag: any, idx: number) => (
                        <Tag key={idx} title={tag?.title}/>
                      ))}
                    </div>
                  </div>
                  <div className={"pb-[5vh] md:pb-[10vh]"}>
                    <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>
                      Уроки курса
                    </h2>
                    <div className={"grid gap-5"}>
                      {course?.lessons ? course?.lessons.map((lesson: any, idx: number) => (
                        <div
                          key={idx}
                          className={"text-blue-900 rounded-3xl bg-gray--100 p-4 md:p-6"}
                        >
                          <p className={"mb-4"}>Урок {lesson?.lessonNumber} {status(lesson?.status)}</p>
                          <p
                            className={
                              classNames(
                                "text-lg font-semibold",
                                {"mb-4": lesson.status && (lesson?.status === lessonStatus.active || lesson?.status === lessonStatus.started)}
                              )
                            }
                          >
                            {lesson?.title}
                          </p>
                          {lesson.status && lesson.status === lessonStatus.started ? (
                            <div className={"grid gap-10 mb-10"}>
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
                          {
                            (
                              (!!idx && course?.lessons[idx - 1].status === lessonStatus.completed && lesson.status && lesson.status === lessonStatus.active) ||
                              (!idx && lesson.status && lesson.status === lessonStatus.active)
                            ) ? (
                              <Button
                                className={
                                  classNames(
                                    "text-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500",
                                  )
                                }
                                disabled={startMutate.isLoading || lessonStartMutate.isLoading}
                                onClick={() => onStartLesson(idx, lesson)}
                              >
                                Начать
                              </Button>
                            ) : null}
                          {lesson.status && lesson.status === lessonStatus.started ? (
                            <Button
                              type={"primary"}
                              className={
                                classNames(
                                  "text-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500",
                                )
                              }
                              disabled={lessonFinishMutate.isLoading}
                              onClick={() => onFinishLesson(lesson)}
                            >
                              Завершить
                            </Button>
                          ) : null}
                        </div>
                      )) : null}
                    </div>
                  </div>
                  <div className={"pb-[5vh] md:pb-[10vh]"}>
                    <h2 className={"font-medium text-2xl md:text-[30px] mb-8"}>Тестирование</h2>
                    <div className={"grid gap-5"}>
                      <div
                        className={"text-blue-900 rounded-3xl bg-gray--100 p-4 md:p-6"}
                      >
                        <p className={"mb-4"}>{course?.test?.title}</p>
                        <p className={"text-lg font-semibold"}>{course?.test?.type}</p>
                        {isCompletedLessons(course?.lessons || []) && course?.test?.state && course?.test?.state === testStatus.active ? (
                          <Button
                            className={"text-sm !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                            onClick={() => onStartTest(course?.test)}
                          >
                            Начать
                          </Button>
                        ) : null}
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