import React, {FC} from 'react';
import {Button} from "antd";

import Status from "@/shared/ui/Status/Status";

import {requestStatus} from "@/shared/constants/status";

interface RequestProps {
  status: string;
  category: string;
  format: string;
  amount: number;
}

const Request: FC<RequestProps> = ({status, category, format, amount}) => {
  return (
    <>
      <div className={"flex flex-col md:flex-row md:items-center justify-between md:gap-4 bg-gray--100 rounded-lg p-4"}>
        <div>
          <Status
            type={status === requestStatus.created ? "purple" : "green"}
            text={status === requestStatus.created ? "Новая заявка" : "Закрыт"}
            className={"py-0.5 px-1 mb-4"}
          />
          <div className={"w-full flex justify-between gap-2 md:gap-8"}>
            <div>
              <p className={"text-black/50 text-xs"}>Категория</p>
              <p className={"font-medium text-sm"}>{category || "-"}</p>
            </div>
            <div>
              <p className={"text-black/50 text-xs"}>Формат</p>
              <p className={"font-medium text-sm"}>{format || "-"}</p>
            </div>
            <div>
              <p className={"text-black/50 text-xs"}>Бюджет</p>
              <p className={"font-medium text-sm"}>{amount || "0"} ₸</p>
            </div>
          </div>
        </div>
        <Button
          className={"w-full md:w-[300px] !h-9 !shadow-none bg-white border border-gray-200 text-dark-500 font-semibold !rounded-lg transition-all mt-4"}
        >
          <span>Подробнее</span>
        </Button>
      </div>
    </>
  );
};

export default Request;