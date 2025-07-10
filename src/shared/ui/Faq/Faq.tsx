import React from 'react';
import Image from "next/image";

import {classNames} from "@/shared/lib/classNames";

import arrowIcon from "@/shared/assets/images/svg/arrow_right.svg";

interface FaqProps {
  question: string;
  answer: string;
}

const Faq: React.FC<FaqProps> = ({question, answer}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={"border-b border-black/10"}>
        <div
          className={"cursor-pointer transition-all hover:opacity-70 flex items-center justify-between p-4"}
          onClick={() => setOpen(!open)}
        >
          <p className={"font-semibold"}>{question}</p>
          <Image
            src={arrowIcon}
            alt={""}
            className={classNames("transition-all cursor-pointer hover:opacity-70 rotate-[90deg]", {"!rotate-[-90deg]": open})}
          />
        </div>
        {open ? (
          <div className={"text-sm transition-all p-8"}>
            {answer}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Faq;