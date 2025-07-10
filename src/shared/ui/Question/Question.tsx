import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "antd";

import {formatDate} from "@/shared/lib/date";

import calendarIcon from "@/shared/assets/images/svg/calendar.svg";
import chatIcon from "@/shared/assets/images/svg/chat.svg";
import {classNames} from "@/shared/lib/classNames";

interface QuestionProps {
  answerCount: number;
  authorImage: string;
  createdAt: string;
  forumTitle: string;
  likes?: number;
  questionId: number;
  isRow?: boolean;
}

const Question: React.FC<QuestionProps> = ({
  answerCount,
  authorImage,
  createdAt,
  forumTitle,
  likes,
  questionId,
  isRow,
}) => {
  const router = useRouter();

  return (
    <>
      <div className={"flex flex-col justify-between border border-gray-300 rounded-2xl py-6 px-5"}>
        <p className={"text-lg font-semibold mb-4"}>{forumTitle}</p>
        <div className={classNames("flex flex-col gap-4", {"md:flex-row md:items-center md:justify-between": isRow})}>
          <div className={"flex items-center gap-4"}>
            <div className={"shrink-0 w-6 h-6 rounded-full overflow-hidden"}>
              {authorImage ? (
                <img src={authorImage} alt={""} className={"w-full h-full object-contain"}/>
              ) : (
                <div
                  className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>A</div>
              )}
            </div>
            <div className={"flex items-center gap-1"}>
              <Image src={calendarIcon} alt={""}/>
              <span className={"text-gray-600 text-sm"}>{formatDate(createdAt, "dd MMMM yyyy")}</span>
            </div>
            <div className={"flex items-center gap-1"}>
              <Image src={chatIcon} alt={""}/>
              <span className={"text-gray-600 text-sm"}>Ответы {answerCount || 0}</span>
            </div>
          </div>

          <Button
            type={"primary"}
            className={"w-full md:w-auto !h-9 shadow-none border border-gray-200 bg-white text-dark-500 font-semibold !rounded-lg transition-all"}
            onClick={() => router.push(`/forum/questions/${questionId}`)}
          >
            <span>Посмотреть</span>
          </Button>
        </div>
      </div>
      {/*<div*/}
      {/*  className={"transition-all hover:border-primary cursor-pointer flex items-center gap-6 border border-gray-300 rounded-2xl p-6"}*/}
      {/*  onClick={() => router.push(`/forum/questions/${questionId}`)}*/}
      {/*>*/}
      {/*  <div className={"shrink-0 w-10 h-10 rounded-full overflow-hidden"}>*/}
      {/*    {authorImage ? (*/}
      {/*      <img src={authorImage} alt={""} className={"w-full h-full object-contain"}/>*/}
      {/*    ) : (*/}
      {/*      <div*/}
      {/*        className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>A</div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <p className={"text-lg font-semibold mb-4"}>{forumTitle}</p>*/}
      {/*    <div className={"flex items-center gap-4"}>*/}
      {/*      <div className={"flex items-center gap-1"}>*/}
      {/*        <Image src={calendarIcon} alt={""}/>*/}
      {/*        <span className={"text-gray-600 text-sm"}>{formatDate(createdAt, "dd MMMM yyyy")}</span>*/}
      {/*      </div>*/}
      {/*      <div className={"flex items-center gap-1"}>*/}
      {/*        <Image src={chatIcon} alt={""}/>*/}
      {/*        <span className={"text-gray-600 text-sm"}>Ответы {answerCount || 0}</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default Question;