import React, {FC, useMemo} from 'react';
import {useTranslation} from "next-i18next";

import Status from "@/shared/ui/Status/Status";

interface LawyerProps {
  firstName: string;
  lastName: string;
  profilePictureBase64?: string;
  specials: string[];
  onClick: () => void;
}

const Lawyer: FC<LawyerProps> = ({firstName, lastName, profilePictureBase64, specials, onClick}) => {
  const {t} = useTranslation();

  const name = useMemo(() => {
    if (!firstName) return "П";
    return firstName.substr(0, 1);
  }, [firstName]);
  const shown = useMemo(() => {
    if (specials && specials.length) {
      return specials.slice(0, 3);
    }

    return [];
  }, [specials]);
  const hidden = useMemo(() => {
    if (specials && specials.length > 3) {
      return specials.length - 3;
    }

    return 0;
  }, [specials]);

  return (
    <>
      <div
        className={"cursor-pointer transition-all hover:bg-purple-1000/10 flex items-center gap-6 bg-gray--100/50 rounded-2xl p-4"}
        onClick={onClick}
      >
        <div className={"shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"}>
          {profilePictureBase64 ? (
            <img src={`data:image/png;base64,${profilePictureBase64}`} alt={""} className={"w-full h-full object-cover"}/>
          ) : (
            <div
              className={"bg-green-100 w-full h-full flex items-center justify-center text-white font-medium text-2xl"}
            >
              <p>{name}</p>
            </div>
          )}
        </div>
        <div>
          <p className={"font-semibold text-lg text-primary mb-2"}>{firstName} {lastName}</p>
          <p className={"text-purple-1000 mb-2"}>{t('lawyer.list-page.item.tag.0')}</p>
          <div className={"flex flex-wrap items-center gap-1"}>
            {shown.length ? (
              <>
                {shown.map((s: string, idx: number) => (
                  <Status key={idx} type={"purple"} text={s} className={"text-xs whitespace-nowrap"}/>
                ))}
                {hidden ? <Status type={"purple"} text={`+${hidden}`} className={"text-xs whitespace-nowrap"}/> : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer;