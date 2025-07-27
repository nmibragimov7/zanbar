import Image from "next/image";
import React from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import localeIcon from "@/shared/assets/images/svg/locale.svg";

const Locale = () => {
  const {i18n} = useTranslation(["common"]);
  const router = useRouter();

  const onToggle = async (locale: string) => {
    await router.replace(router.asPath, router.asPath, {locale});
    window.location.reload();
  };

  return (
    <>
      <div
        className={"flex items-center gap-3 font-medium text-dark-500 rounded-md cursor-pointer py-2 px-2.5"}
        onClick={() => onToggle(i18n.language === "ru" ? "kz" : "ru")}
      >
        <Image src={localeIcon} alt="" className={"w-4 h-4"}/>
        <span>{i18n.language === "ru" ? "RU" : "KZ"}</span>
      </div>
    </>
  );
};

export default Locale;