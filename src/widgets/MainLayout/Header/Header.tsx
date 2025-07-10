import React, {useMemo} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Button} from "antd";
import {useRouter} from "next/router";

import Logo from "@/shared/ui/Logo/Logo";

import {useAuth} from "@/shared/hooks/useAuth";

import {roles} from "@/shared/constants/role";

import menuIcon from "@/shared/assets/images/svg/menu.svg";
import profileIcon from "@/shared/assets/images/svg/profile.svg";

interface HeaderProps {
  setVisible: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({setVisible}) => {
  const router = useRouter();
  const {isAuth, user, onLogout} = useAuth();

  const name = useMemo(() => {
    if (!user?.firstname) return "П";
    return user?.firstname.substr(0, 1);
  }, [user]);
  const firstname = useMemo(() => {
    return user?.firstname;
  }, [user]);

  return (
    <>
      <div className={"z-10 fixed top-0 right-0 left-0 bg-purple-1000 text-white w-full flex items-center justify-between md:justify-end py-3.5 px-3 md:p-5 md:pl-[332px]"}>
        <div className={"flex md:hidden items-center gap-2"} onClick={() => setVisible(true)}>
          <Image src={menuIcon} alt={""}/>
          <span className={"text-white font-semibold text-sm"}>Меню</span>
        </div>

        <div className={"flex md:hidden flex-col items-center gap-2"}>
          <Logo/>
        </div>

        <div className={"flex items-center gap-6"}>
          {isAuth ? (
            <>
              <div className={"hidden md:block relative group"}>
                <div className={"flex items-center gap-3"}>
                  <div className={"text-end"}>
                    <p className={"font-semibold"}>{firstname}</p>
                  </div>
                  <div className={"w-10 h-10 rounded-full overflow-hidden"}>
                    {user?.image ? (
                      <>
                        <img src={user?.image} className={"w-full h-full object-contain"} alt={""}/>
                      </>
                    ) : (
                      <div
                        className={"bg-green-100 w-full h-full flex items-center justify-center text-white font-medium text-2xl"}>
                        <p>{name}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={"invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 bg-white z-10 absolute top-full right-0 w-[200px] rounded shadow-lg px-2"}
                >
                  <Link
                    href={user?.role === roles.admin ? "/admin/courses" : "/cabinet/courses"}
                    className={"cursor-pointer text-sm transition-all hover:bg-gray-100 flex items-center gap-2 py-3 px-2"}
                  >
                    <span className={"text-sm text-dark-500"}>Личный кабинет</span>
                  </Link>
                  <div
                    className={"cursor-pointer text-sm transition-all hover:bg-gray-100 flex items-center gap-2 py-3 px-2"}
                    onClick={async () => {
                      onLogout?.();
                      await router.push("/");
                    }}
                  >
                    <span className={"text-sm text-dark-500"}>Выйти</span>
                  </div>
                </div>
              </div>
              <div className={"md:hidden relative group"}>
                <div className={"flex items-center gap-2"}>
                  <span className={"text-white font-semibold text-sm"}>{firstname}</span>
                  <div className={"w-8 h-8 rounded-full overflow-hidden"}>
                    {user?.image ? (
                      <>
                        <img src={user?.image} className={"w-full h-full object-contain"} alt={""}/>
                      </>
                    ) : (
                      <div
                        className={"bg-green-100 w-full h-full flex items-center justify-center text-purple-1000 font-medium text-2xl"}>
                        <p>{name}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={"invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 bg-white z-10 absolute top-full right-0 w-[200px] rounded shadow-lg px-2"}
                >
                  <Link
                    href={user?.role === roles.admin ? "/admin/courses" : "/cabinet/courses"}
                    className={"cursor-pointer text-sm transition-all hover:bg-gray-100 flex items-center gap-2 py-3 px-2"}
                  >
                    <span className={"text-sm text-dark-500"}>Личный кабинет</span>
                  </Link>
                  <div
                    className={"cursor-pointer text-sm transition-all hover:bg-gray-100 flex items-center gap-2 py-3 px-2"}
                    onClick={async () => {
                      onLogout?.();
                      await router.push("/");
                    }}
                  >
                    <span className={"text-sm text-dark-500"}>Выйти</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={"hidden md:flex items-center gap-3"}>
                <Link href={"/login"}>
                  <Button
                    className={"text-sm w-[70px] !h-9 shadow-none border border-gray-200 !rounded-lg text-dark-500"}
                  >
                    Войти
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    className={"text-sm w-[175px] !h-9 shadow-none text-dark-500 !rounded-lg transition-all"}
                  >
                    Зарегистрироваться
                  </Button>
                </Link>
              </div>
              <Link href={"/login"} className={"flex md:hidden items-center gap-2"}>
                <span className={"text-white font-semibold text-sm"}>Войти</span>
                <Image src={profileIcon} alt={""}/>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;