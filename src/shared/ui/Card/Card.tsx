import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "antd";

import AuthDenied from "@/widgets/AuthDenied/AuthDenied";

import {useAuth} from "@/shared/hooks/useAuth";

import {classNames} from "@/shared/lib/classNames";

import card1Icon from "@/shared/assets/images/png/card1.png";
import card2Icon from "@/shared/assets/images/png/card2.png";
import card3Icon from "@/shared/assets/images/png/card3.png";
import card4Icon from "@/shared/assets/images/png/card4.png";

const icons = [card1Icon, card2Icon, card3Icon, card4Icon]

interface CardProps {
  className?: string;
  index?: number;
  icon?: string;
  title: string;
  pathname?: string;
  tags?: string[];
}

const Card: React.FC<CardProps> = ({className, index = 0, icon, title, pathname = "/", tags}) => {
  const router = useRouter();
  const {isAuth} = useAuth();

  const [visible, setVisible] = React.useState(false);

  const onNavigate = async () => {
    if (!isAuth) {
      setVisible(true);
      return;
    }

    await router.push(pathname);
  }

  return (
    <>
      <div className={classNames("relative bg-black/50 overflow-hidden rounded-3xl", className)}>
        {icon ? (
          <img src={icon} alt={""} className={"w-full h-[240px] object-cover"}/>
        ) : (
          <div className={"w-full h-[240px]"}></div>
        )}
        {tags?.length ? (
          <div className={"absolute top-0 left-0 w-full flex flex-wrap items-center gap-2 p-4"}>
            {tags?.map((t, idx) => (
              <div key={idx} className={"bg-gray-0 text-xs text-purple-1000 font-semibold rounded-2xl py-1 px-2"}>{t}</div>
            ))}
          </div>
        ) : null}
        <div className={"absolute bottom-0 left-0 w-full p-4"}>
          <p className={"text-xl font-semibold text-white mb-2"}>
            {title}
          </p>
          <Button
            className={"w-full !h-9 !border-0 !shadow-none bg-gray-0 text-purple-1000 font-semibold !rounded-lg transition-all"}
            onClick={onNavigate}
          >
            <span>Подробнее</span>
          </Button>
        </div>
      </div>
      {visible ? (
        <AuthDenied visible={visible} setVisible={setVisible}/>
      ) : null}
    </>
  );
};

export default Card;