import React, {useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

import AuthDenied from "@/widgets/AuthDenied/AuthDenied";
import Logo from "@/shared/ui/Logo/Logo";

import {useAuth} from "@/shared/hooks/useAuth";
import {useClickOutside} from "@/shared/hooks/useClickOutside";

import {classNames} from "@/shared/lib/classNames";

import homeIcon from "@/shared/assets/images/svg/home.svg";
import courseIcon from "@/shared/assets/images/svg/course_black.svg";
import checkIcon from "@/shared/assets/images/svg/check.svg";
import forumIcon from "@/shared/assets/images/svg/forum_black.svg";
import knowledgeIcon from "@/shared/assets/images/svg/knowledge_black.svg";
import legislatorIcon from "@/shared/assets/images/svg/law_and_right_black.svg";
import faqIcon from "@/shared/assets/images/svg/faq_black.svg";
import searchIcon from "@/shared/assets/images/svg/search_black.svg";
import aiIcon from "@/shared/assets/images/svg/ai_black.svg";

const menu = [
  {
    pathname: "/",
    title: "Главная",
    icon: homeIcon,
  },
  {
    pathname: "/courses",
    title: "Курсы",
    icon: courseIcon,
  },
  {
    pathname: "/tests",
    title: "Тесты",
    icon: checkIcon,
  },
  {
    pathname: "/forum",
    title: "Форум",
    icon: forumIcon,
    isAuth: true,
  },
  {
    pathname: "/knowledge",
    title: "База знаний",
    icon: knowledgeIcon,
  },
  {
    pathname: "/legislator",
    title: "Закон и право",
    icon: legislatorIcon,
  },
  {
    pathname: "/faq",
    title: "FAQ",
    icon: faqIcon,
  },
  {
    pathname: "/search",
    title: "Найти юриста",
    icon: searchIcon,
  },
]

interface SidebarProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({visible, setVisible}) => {
  const router = useRouter();
  const {isAuth} = useAuth();

  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setVisible(false));

  const [toggle, setToggle] = React.useState(false);

  const onNavigate = async (item: any) => {
    if (!isAuth && item?.isAuth) {
      setToggle(true);
      return;
    }

    await router.push(item?.pathname);
  }

  return (
    <>
      <div
        ref={ref}
        className={
          classNames(
            "bg-white transition-all -translate-x-full md:translate-x-0 z-20 fixed top-0 bottom-0 left-0 w-[312px] h-screen flex flex-col justify-between border-r border-gray-300 py-6 px-6",
            {"translate-x-0": visible}
          )
        }
      >
        <div className={"w-full"}>
          <Logo className={"w-14 h-14 mb-6"} classNamIcon={"w-10 h-10"}/>

          <div className={"grid gap-1"}>
            {menu.map((item: any, idx: number) => (
              <span
                key={idx}
                className={
                  classNames(
                    "flex items-center gap-3 font-medium text-dark-500 rounded-md cursor-pointer transition-all hover:bg-gray-100 py-2 px-2.5",
                    {"bg-gray-100": (item?.pathname !== "/" && router.pathname.includes(item?.pathname) || router.pathname === item?.pathname)}
                  )
                }
                onClick={() => onNavigate(item)}
              >
                <Image src={item?.icon} alt={""} className={"w-4 h-4 object-contain"}/>
                <span>{item?.title}</span>
              </span>
            ))}
          </div>
        </div>
        <div className={"border-t border-gray-300 pt-8 pb-2"}>
          <Link
            href={"https://t.me/zan_aibot"}
            target={"_blank"}
            className={
              classNames(
                "flex items-center gap-3 font-medium text-dark-500 rounded-md cursor-pointer transition-all hover:bg-gray-100 py-2 px-2.5",
              )
            }
          >
            <Image src={aiIcon} alt={""} className={"w-4 h-4 object-contain"}/>
            <span>AI консультант</span>
          </Link>
        </div>
      </div>
      {toggle ? (
        <AuthDenied visible={toggle} setVisible={setToggle} />
      ) : null}
    </>
  );
};

export default Sidebar;