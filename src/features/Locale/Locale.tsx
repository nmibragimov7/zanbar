import Image from "next/image";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import {useClickOutside} from "@/shared/hooks/useClickOutside";
import {classNames} from "@/shared/lib/classNames";
import {languages} from "@/shared/constants/language";

import localeIcon from "@/shared/assets/images/svg/locale.svg";

const Locale = () => {
  const {i18n} = useTranslation(["common"]);
  const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const [toggle, setToggle] = useState(false);

  useClickOutside(ref, () => setToggle(false));
  const onToggle = async (locale: string) => {
    setToggle(false);
    await router.replace(router.asPath, router.asPath, {locale});
  };

  return (
    <>
      <div ref={ref} className={"relative -mr-[5px] md:mr-0"}>
        <div
          className={
            classNames(
              "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-gray-300",
              {"bg-gray-300": toggle}
            )
          }
          onClick={() => setToggle(!toggle)}
        >
          <Image src={localeIcon} alt="" className={"w-[18px] h-[18px]"}/>
        </div>
        <div
          className={
            classNames(
              "absolute top-[calc(100%+5px)] left-0 right-0 rounded opacity-0 invisible transition-all bg-white shadow-gray flex flex-col gap-2 text-center py-2 px-1",
              {"!opacity-100 !visible": toggle}
            )
          }
        >
          {languages.map(l => (
            <p
              key={l}
              className={classNames("cursor-pointer uppercase text-xs font-semibold transition-all hover:text-red-500", {"!text-red-500": l === i18n?.language})}
              onClick={() => onToggle(l)}
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Locale;