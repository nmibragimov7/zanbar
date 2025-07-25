import React from 'react';
import Image from "next/image";

import {classNames} from "@/shared/lib/classNames";

import arrowIcon from "@/shared/assets/images/svg/arrow_right.svg";

interface FaqProps {
  question: string;
  answer: string;
  className?: string;
  classNameHeader?: string;
  classNameBody?: string;
}

const Faq: React.FC<FaqProps> = ({question, answer, className, classNameHeader, classNameBody}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={classNames("border-b border-black/10", className)}>
        <div
          className={classNames("cursor-pointer transition-all hover:opacity-70 flex items-center justify-between p-4", classNameHeader)}
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
          <>
            <div
              dangerouslySetInnerHTML={{__html: answer}}
              className={classNames("text-sm transition-all p-8", classNameBody)}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Faq;
