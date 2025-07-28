import React from 'react';
import Image from "next/image";
import {useTranslation} from "next-i18next";

import {formatDate} from "@/shared/lib/date";

import avatarIcon from "@/shared/assets/images/png/avatar.png";
import calendarIcon from "@/shared/assets/images/svg/calendar.svg";
import chatIcon from "@/shared/assets/images/svg/chat.svg";

interface AnswerProps {
  type: "default" | "cabinet";
  createdDate?: string;
  text?: string;
  user?: any;
  forum?: any;
}

const Answer: React.FC<AnswerProps> = ({
  type,
  createdDate,
  text,
  user,
  forum,
}) => {
  const {t} = useTranslation();

  return (
    <>
      {type === "cabinet" ? (
        <div className={"border border-gray-300 rounded-2xl p-4 md:p-6"}>
          <div className={"flex items-center gap-6 mb-6"}>
            <div className={"hidden md:block w-10 h-10 rounded-full overflow-hidden"}>
              {forum?.authorImage ? (
                <img src={forum?.authorImage} alt={""} className={"w-full h-full object-contain"}/>
              ) : (
                <div
                  className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>П</div>
              )}
            </div>
            <div>
              <p className={"text-lg font-semibold mb-4"}>{forum?.forumTitle}</p>
              <div className={"flex items-center gap-4"}>
                <div className={"w-6 h-6 rounded-full overflow-hidden"}>
                  {forum?.authorImage ? (
                    <img src={forum?.authorImage} alt={""} className={"w-full h-full object-contain"}/>
                  ) : (
                    <div
                      className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>П</div>
                  )}
                </div>
                <div className={"flex items-center gap-1"}>
                  <Image src={calendarIcon} alt={""}/>
                  <span className={"text-gray-600 text-sm"}>{formatDate(forum?.createdAt || "", "dd MMMM yyyy")}</span>
                </div>
                <div className={"flex items-center gap-1"}>
                  <Image src={chatIcon} alt={""}/>
                  <span className={"text-gray-600 text-sm"}>{t('cabinet.answer.item.0')} {forum?.answerCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={"bg-gray-400 rounded-lg p-8"}>
            <p className={"text-black mb-4"}>
              {text}
            </p>
            <div className={"flex justify-end gap-4"}>
              <div className={"w-6 md:w-8 h-6 md:h-8 rounded-full"}>
                <Image src={avatarIcon} alt={""} className={"w-full h-full object-contain"}/>
              </div>
              <div className={"flex items-center gap-1"}>
                <Image src={calendarIcon} alt={""}/>
                <span className={"text-gray-600 text-sm"}>{formatDate(createdDate || "", "dd MMMM yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {type === "default" ? (
        <div className={"bg-white rounded-2xl p-6"}>
          <p className={"text-black mb-6"}>
            {text}
          </p>
          <div className={"flex items-center gap-4"}>
            <div className={"flex items-center gap-1"}>
              <div className={"w-8 h-8 rounded-full overflow-hidden"}>
                {user?.userImage ? (
                  <img src={user?.userImage} alt={""} className={"w-full h-full object-contain"}/>
                ) : (
                  <div className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>A</div>
                )}
              </div>
              <p className={"text-sm font-semibold"}>{user?.firstname}</p>
            </div>
            <div className={"flex items-center gap-1"}>
              <Image src={calendarIcon} alt={""}/>
              <span className={"text-gray-600 text-sm"}>{formatDate(createdDate || "", "dd MMMM yyyy")}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Answer;