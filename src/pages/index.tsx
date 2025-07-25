import React, {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button, Skeleton} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Card from "@/shared/ui/Card/Card";
import AuthDenied from "@/widgets/AuthDenied/AuthDenied";
import Question from "@/shared/ui/Question/Question";

import {useCourses} from "@/entities/Course/Course.module";
import {useQuestions} from "@/entities/Forum/Forum.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import courseIcon from "@/shared/assets/images/svg/course.svg";
import forumIcon from "@/shared/assets/images/svg/forum.svg";
import searchIcon from "@/shared/assets/images/svg/search.svg";
import knowledgeIcon from "@/shared/assets/images/svg/knowledge.svg";
import legislatorIcon from "@/shared/assets/images/svg/law_and_right.svg";
import faqIcon from "@/shared/assets/images/svg/faq.svg";
import aiIcon from "@/shared/assets/images/svg/ai_white.svg";
import listIcon from "@/shared/assets/images/svg/list.svg";
import juristIcon from "@/shared/assets/images/svg/jurist.svg";

export default function Index() {
  const router = useRouter();
  const {isAuth} = useAuth();
  const {t} = useTranslation();

  const [visible, setVisible] = React.useState(false);

  const {data: courses, isFetching: isFetchingCourses} = useCourses({isAuth: false, page: 0, size: 4});
  const {data: forum, isFetching: isFetchingForum} = useQuestions({page: 0, size: 3});

  const onNavigate = async (pathname: string) => {
    if (!isAuth) {
      setVisible(true);
      return;
    }

    await router.push(pathname);
  }

  useEffect(() => {
    if (router.query?.auth) {
      setVisible(true);
      router.replace("/");
    }
  }, [router]);

  return (
    <>
      <MainLayout>
        <div className={"flex flex-col items-center font-medium text-sm md:text-base bg-gray-100 py-10 mb-10 md:mb-20"}>
          <div className={"w-full max-w-[790px] px-3 md:px-5"}>
            {/*{t('index.title')}*/}
            <div className={"scroll overflow-x-auto flex flex-nowrap md:grid grid-cols-2 gap-4 mb-8"}>
              <div
                className={"shrink-0 w-1/2 md:w-auto h-[140px] flex flex-col justify-between bg-gray--100 rounded-2xl font-medium py-5 px-4"}>
                <Image src={searchIcon} alt={""} className={"w-5 h-5 object-contain"}/>
                <p>Узнайте о нашем приложении</p>
              </div>
              <div
                className={"shrink-0 w-1/2 md:w-auto h-[140px] flex flex-col justify-between bg-gray--100 rounded-2xl font-medium py-5 px-4"}>
                <Image src={juristIcon} alt={""} className={"w-5 h-5 object-cover"}/>
                <p>Как стать юристом в приложении?</p>
              </div>
            </div>
          </div>
          <div className={"w-full max-w-xl px-3 md:px-5"}>
            <div className={"grid grid-cols-3 gap-4 md:gap-y-8 mb-8"}>
              <div
                onClick={() => onNavigate("/courses")}
                className={"cursor-pointer flex flex-col items-center transition-all md:hover:text-purple-1000"}
              >
                <Image src={courseIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>Курсы</span>
              </div>
              <div
                onClick={() => onNavigate("/forum")}
                className={"cursor-pointer flex flex-col items-center transition-all md:hover:text-purple-1000"
              }>
                <Image src={forumIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>Форум</span>
              </div>
              <div
                onClick={() => onNavigate("/lawyer")}
                className={"cursor-pointer flex flex-col items-center transition-all md:hover:text-purple-1000"}
              >
                <Image src={searchIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>Найти юриста</span>
              </div>
              <Link
                href={"/knowledge"}
                className={"flex flex-col items-center transition-all md:hover:text-purple-1000"}
              >
                <Image src={knowledgeIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>База знаний</span>
              </Link>
              <Link
                href={"/forecasting"}
                className={"flex flex-col items-center transition-all md:hover:text-purple-1000"}
              >
                <Image src={legislatorIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>Прогнозирование</span>
              </Link>
              <Link href={"/faq"} className={"flex flex-col items-center transition-all md:hover:text-purple-1000"}>
                <Image src={faqIcon} alt={""} className={"w-7 h-7 object-contain mb-2"}/>
                <span>FAQ</span>
              </Link>
            </div>
            <div className={"flex justify-center"}>
              <Link href={"https://t.me/zan_aibot"} target={"_blank"} className={"w-full"}>
                <Button
                  className={"w-full !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all flex items-center gap-2"}
                >
                  <Image src={aiIcon} alt={""}/>
                  <span>AI правовой консультант</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={"px-3 md:px-5"}>
          <div className={"pb-[5vh] md:pb-[10vh]"}>
            <div className={"flex items-center justify-between gap-4 mb-8"}>
              <h2 className={"font-semibold text-2xl"}>Популярные курсы</h2>
              <span
                className={"cursor-pointer whitespace-nowrap text-purple-1000 transition-all md:hover:text-primary"}
                onClick={() => onNavigate("/courses")}
              >Посмотреть все</span>
            </div>
            <div className={"grid md:grid-cols-4 gap-5"}>
              {isFetchingCourses ? (
                <>
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[240px]"}
                  />
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[240px]"}
                  />
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[240px]"}
                  />
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[240px]"}
                  />
                </>
              ) : (
                <>
                  {courses?.data?.content && courses?.data?.content.length ? courses?.data?.content.map((course: any, idx: number) => (
                    <Card
                      key={idx}
                      index={idx}
                      pathname={`/courses/${course?.id}`}
                      icon={course?.image}
                      tags={course?.tags || []}
                      title={course?.title}
                    />
                  )) : null}
                </>
              )}
            </div>
          </div>
          <div className={"pb-[5vh] md:pb-[10vh]"}>
            <div className={"flex items-center justify-between mb-8"}>
              <h2 className={"font-semibold text-2xl"}>Популярные темы на форуме</h2>
              <span
                className={"cursor-pointer whitespace-nowrap text-purple-1000 transition-all md:hover:text-primary"}
                onClick={() => onNavigate("/forum")}
              >Посмотреть все</span>
            </div>
            <div className={"grid md:grid-cols-3 gap-5"}>
              {isFetchingForum ? (
                <>
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[226px]"}
                  />
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[226px]"}
                  />
                  <Skeleton
                    loading={true}
                    active
                    paragraph={false}
                    className={"h-[226px]"}
                  />
                </>
              ) : (
                <>
                  {forum?.data?.content && forum?.data?.content.length ? forum?.data?.content.map((f: any, idx: number) => (
                    <Question
                      key={idx}
                      {...f}
                    />
                  )) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
      {visible ? (
        <AuthDenied visible={visible} setVisible={setVisible}/>
      ) : null}
    </>
  )
}
export const getStaticProps = getDefaultStaticProps;