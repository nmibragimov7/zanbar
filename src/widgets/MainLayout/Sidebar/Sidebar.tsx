import React, {useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import AuthDenied from "@/widgets/AuthDenied/AuthDenied";
import Logo from "@/shared/ui/Logo/Logo";
import Locale from "@/features/Locale/Locale";

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
import bellIcon from "@/shared/assets/images/svg/bell.svg";
import logoutIcon from "@/shared/assets/images/svg/logout.svg";

const menu = [
  {
    pathname: "/",
    title: "menu.0",
    icon: homeIcon,
  },
  {
    pathname: "/courses",
    title: "menu.1",
    icon: courseIcon,
    isAuth: true,
  },
  {
    pathname: "/tests",
    title: "menu.2",
    icon: checkIcon,
    isAuth: true,
  },
  {
    pathname: "/forum",
    title: "menu.3",
    icon: forumIcon,
    isAuth: true,
  },
  {
    pathname: "/knowledge",
    title: "menu.4",
    icon: knowledgeIcon,
  },
  {
    pathname: "/forecasting",
    title: "menu.5",
    icon: legislatorIcon,
    isAuth: true,
  },
  {
    pathname: "/faq",
    title: "menu.6",
    icon: faqIcon,
  },
  {
    pathname: "/lawyer",
    title: "menu.7",
    icon: searchIcon,
    isAuth: true,
  },
  {
    pathname: "/notifications",
    title: "menu.8",
    icon: bellIcon,
    isAuth: true,
  },
]

interface SidebarProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({visible, setVisible}) => {
  const router = useRouter();
  const {isAuth, onLogout} = useAuth();
  const {t} = useTranslation();

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
            "bg-white transition-all -translate-x-full md:translate-x-0 z-20 fixed top-0 bottom-0 left-0 w-[312px] h-screen flex flex-col justify-between border-r border-gray-300 p-4 md:p-6",
            {"translate-x-0": visible}
          )
        }
      >
        <div className={"w-full"}>
          <Logo className={"w-14 h-14 mb-6"} classNamIcon={"w-10 h-10"}/>

          <div className={"grid gap-2"}>
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
                <span>{t(item?.title)}</span>
              </span>
            ))}
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
              <span>{t('menu.9')}</span>
            </Link>

            <div className={"grid gap-2 border-t border-gray-300 pt-2"}>
              <Locale/>

              {isAuth ? (
                <div
                  className={
                    classNames(
                      "flex items-center gap-3 font-medium text-dark-500 rounded-md cursor-pointer transition-all hover:bg-gray-100 py-2 px-2.5",
                    )
                  }
                  onClick={async () => {
                    onLogout?.();
                    await router.push("/");
                  }}
                >
                  <Image src={logoutIcon} alt={""} className={"w-4 h-4"}/>
                  <span>{t('menu.10')}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {toggle ? (
        <AuthDenied visible={toggle} setVisible={setToggle} />
      ) : null}
    </>
  );
};

export default Sidebar;