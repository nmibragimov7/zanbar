import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {faq} from "@/shared/constants/faq";

import starIcon from "@/shared/assets/images/svg/star.svg";
import rightIcon from "@/shared/assets/images/svg/right_base.svg";
import arrowIcon from "@/shared/assets/images/svg/arrow_right.svg";

const Index = () => {
  const {t} = useTranslation();

  return (
    <>
      <MainLayout>
        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>FAQ</h1>
          </div>
        </div>
        <div className={"flex justify-center mb-10"}>
          <div className={"w-full max-w-[790px] grid gap-4 px-3 md:px-5"}>
            {faq.length ? (
              <>
                {faq.map((item: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/faq/${item?.id}`}
                    className={"cursor-pointer transition-all hover:opacity-70 flex items-center justify-between shadow rounded-2xl py-2 px-4"}
                  >
                    <div className={"flex items-center gap-4"}>
                      {item?.isFavorite ? (
                        <div className={"bg-purple-200 rounded-full shrink-0 w-12 h-12 flex items-center justify-center"}>
                          <Image src={starIcon} alt={""}/>
                        </div>
                      ) : (
                        <div className={"bg-purple-200 rounded-lg shrink-0 w-12 h-12 flex items-center justify-center"}>
                          <Image src={rightIcon} alt={""}/>
                        </div>
                      )}
                      <span>{t(item?.title)}</span>
                    </div>
                    <Image src={arrowIcon} alt={""} className={"w-5 h-5"}/>
                  </Link>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;