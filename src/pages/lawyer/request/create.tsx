import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Breadcrumb, Button, Input, notification} from "antd";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Field from "@/shared/ui/Field/Field";

import {useRequestCreate} from "@/entities/Request/Request.module";

import {classNames} from "@/shared/lib/classNames";

import categoryIcon from "@/shared/assets/images/svg/request_category.svg";
import chatIcon from "@/shared/assets/images/svg/online_chat.svg";
import callIcon from "@/shared/assets/images/svg/call.svg";
import editIcon from "@/shared/assets/images/svg/edit.svg";
import approvedIcon from "@/shared/assets/images/svg/approved.svg";

const Create = () => {
  const [stage, setStage] = useState(1);
  const [request, setRequest] = React.useState({
    category: "",
    description: "",
    format: "",
    amount: 0,
    number: ""
  });

  const onSuccess = () => {
    setStage(7);
  }
  const createMutate = useRequestCreate({onSuccess})

  const onSelect = (key: string, value: any) => {
    setRequest(prev => ({ ...prev, [key]: value }));
  }
  const onChange = (key: string, value: any) => {
    setRequest(prev => ({ ...prev, [key]: value }));
  }
  const onNext = () => {
    if (stage < 6) {
      setStage(prev => prev + 1);
      return;
    }

    createMutate.mutate(request);
  }

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>Главная</Link>,
            },
            {
              title: <Link href={`/lawyer`}>Найти юриста</Link>,
            },
            {
              title: <Link href={`/lawyer/request`}>Поиск юриста</Link>,
            },
            {
              title: <span>Написать заявку</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>Поиск юриста</h1>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <div className={"w-full max-w-[790px] text-black px-3 md:px-5"}>
            {stage < 7 ? (
              <>
                <div className={"flex items-center gap-4 mb-2"}>
                  <div
                    className={"bg-purple-1000 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white font-medium text-base md:text-xl"}
                  >
                    {stage}
                  </div>
                  <div>
                    <p className={"text-xs mb-2"}>Шаг {stage} из 6</p>
                    <p className={"font-semibold text-2xl"}>
                      {stage === 1 ? "Категория" : null}
                      {stage === 2 ? "Суть дела" : null}
                      {stage === 3 ? "Формат и срочность" : null}
                      {stage === 4 ? "Ожидание по стоимости" : null}
                      {stage === 5 ? "Подтверждение заявки" : null}
                    </p>
                  </div>
                </div>
                <div className={"w-full h-2 bg-purple-300 mb-8"}>
                  <div
                    className={"h-full bg-purple-1000 rounded-tr rounded-br"}
                    style={{width: (stage / 6 * 100) + "%"}}
                  ></div>
                </div>

                {stage === 1 ? (
                  <>
                    <p className={"font-medium mb-4"}>Выберите категорию дела</p>
                    <div className={"flex flex-col md:grid md:grid-cols-2 gap-4"}>
                      <div
                        className={
                          classNames(
                            "cursor-pointer transition-all hover:bg-purple-1000/10 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6",
                            {"bg-purple-1000/10 shadow-100": request.category === "Публичное"}
                          )
                        }
                        onClick={() => onSelect("category", "Публичное")}
                      >
                        <div>
                          <p className={"font-semibold text-purple-1000 mb-2"}>Публичное</p>
                          <p className={"text-xs"}>
                            Регулирует отношения, в которых государство выступает как субъект власти, например,
                            конституционное,
                            административное, уголовное
                          </p>
                        </div>
                        <Image src={categoryIcon} alt={""} className={"w-30 h-30 object-contain"}/>
                      </div>
                      <div
                        className={
                          classNames(
                            "cursor-pointer transition-all hover:bg-purple-1000/10 bg-gray--100 rounded-xl flex items-center justify-between gap-4 px-4 py-6",
                            {"bg-purple-1000/10 shadow-100": request.category === "Частное"}
                          )
                        }
                        onClick={() => onSelect("category", "Частное")}
                      >
                        <div>
                          <p className={"font-semibold text-purple-1000 mb-2"}>Частное</p>
                          <p className={"text-xs"}>
                            Регулирует отношения между частными лицами, например, гражданское, семейное, трудовое право
                          </p>
                        </div>
                        <Image src={categoryIcon} alt={""} className={"w-30 h-30 object-contain"}/>
                      </div>
                    </div>
                  </>
                ) : null}
                {stage === 2 ? (
                  <>
                    <p className={"font-medium mb-4"}>Опишите ситуацию в свободной форме</p>
                    <Input.TextArea
                      placeholder={"Описание..."}
                      rows={6}
                      maxLength={5000}
                      style={{height: 200, resize: 'none'}}
                      className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                      value={request.description}
                      onChange={(event: any) => onChange("description", event.target.value)}
                    />
                  </>
                ) : null}
                {stage === 3 ? (
                  <>
                    <p className={"font-medium mb-4"}>Выберите формат консультации</p>
                    <div className={"flex justify-center"}>
                      <div className={"w-full grid grid-cols-2 gap-4"}>
                        <div className={"flex flex-col gap-2"} onClick={() => onSelect("format", "Онлайн чат")}>
                          <div
                            className={
                              classNames(
                                "cursor-pointer transition-all hover:bg-purple-1000/10 bg-gray--100 rounded-xl flex items-center justify-center py-6",
                                {"bg-purple-1000/10 shadow-100": request.format === "Онлайн чат"}
                              )
                            }
                          >
                            <Image src={chatIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                          </div>
                          <span className={"font-medium text-sm"}>Онлайн чат</span>
                        </div>
                        <div className={"flex flex-col gap-2"} onClick={() => onSelect("format", "Аудиозвонок")}>
                          <div
                            className={
                              classNames(
                                "cursor-pointer transition-all hover:bg-purple-1000/10 bg-gray--100 rounded-xl flex items-center justify-center py-6",
                                {"bg-purple-1000/10 shadow-100": request.format === "Аудиозвонок"}
                              )
                            }
                          >
                            <Image src={callIcon} alt={""} className={"w-20 h-20 object-contain"}/>
                          </div>
                          <span className={"font-medium text-sm"}>Аудиозвонок</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {stage === 4 ? (
                  <>
                    <p className={"font-medium mb-4"}>Укажите бюджет</p>
                    <div className={"relative"}>
                    <span
                      className={"z-[100] absolute top-1/2 left-4 -translate-y-1/2 text-purple-1000 text-6xl font-bold"}>₸</span>
                      <Field
                        inputType={"number"}
                        placeholder={""}
                        value={request.amount}
                        className={"w-full !h-20 !border-0 !pl-20 text-6xl font-bold"}
                        onChange={(value: any) => onChange("amount", value)}
                      />
                    </div>
                  </>
                ) : null}
                {stage === 5 ? (
                  <>
                    <p className={"font-medium mb-4"}>Укажите Ваш номер телефона</p>
                    <Field
                      placeholder={"+7 (---) --- ----"}
                      value={request.number}
                      className={"w-full"}
                      onChange={(event: any) => onChange("number", event.target.value)}
                    />
                  </>
                ) : null}
                {stage === 6 ? (
                  <>
                    <div className={"grid gap-4"}>
                      <div className={"bg-gray--100 rounded-xl p-4"}>
                        <div className={"flex items-center justify-between mb-2"}>
                          <p className={"font-semibold"}>Общая информация</p>
                          <Image
                            src={editIcon}
                            alt={""}
                            className={"w-6 h-6 object-contain cursor-pointer transition-all hover:opacity-70"}
                            onClick={() => setStage(1)}
                          />
                        </div>
                        <div className={"mb-2"}>
                          <p className={"text-black/50 text-xs"}>Категория</p>
                          <p className={"font-medium text-sm"}>{request.category}</p>
                        </div>
                        <div>
                          <p className={"text-black/50 text-xs"}>Описание ситуации</p>
                          <p className={"font-medium text-sm"}>{request.description}</p>
                        </div>
                      </div>
                      <div className={"bg-gray--100 rounded-xl p-4"}>
                        <div className={"flex items-center justify-between mb-2"}>
                          <p className={"font-semibold"}>Формат и срочность</p>
                          <Image
                            src={editIcon}
                            alt={""}
                            className={"w-6 h-6 object-contain cursor-pointer transition-all hover:opacity-70"}
                            onClick={() => setStage(3)}
                          />
                        </div>
                        <div>
                          <p className={"text-black/50 text-xs"}>Формат консультации</p>
                          <p className={"font-medium text-sm"}>{request.format}</p>
                        </div>
                      </div>
                      <div className={"bg-gray--100 rounded-xl p-4"}>
                        <div className={"flex items-center justify-between mb-2"}>
                          <p className={"font-semibold"}>Ожидание по стоимости</p>
                          <Image
                            src={editIcon}
                            alt={""}
                            className={"w-6 h-6 object-contain cursor-pointer transition-all hover:opacity-70"}
                            onClick={() => setStage(4)}
                          />
                        </div>
                        <div>
                          <p className={"text-black/50 text-xs"}>Бюджет</p>
                          <p className={"font-medium text-sm"}>{request.amount} ₸</p>
                        </div>
                      </div>
                      <div className={"bg-gray--100 rounded-xl p-4"}>
                        <div className={"flex items-center justify-between mb-2"}>
                          <p className={"font-semibold"}>Контактные данные</p>
                          <Image
                            src={editIcon}
                            alt={""}
                            className={"w-6 h-6 object-contain cursor-pointer transition-all hover:opacity-70"}
                            onClick={() => setStage(4)}
                          />
                        </div>
                        <div>
                          <p className={"text-black/50 text-xs"}>Ваш номер телефона</p>
                          <p className={"font-medium text-sm"}>{request.number}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className={"flex justify-center my-10"}>
                  <Button
                    type={"primary"}
                    className={"w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70"}
                    disabled={
                      stage === 1 && !request.category
                      || stage === 2 && !request.description
                      || stage === 3 && !request.format
                      || stage === 4 && !request.amount
                      || stage === 5 && !request.number
                      || createMutate.isLoading
                    }
                    onClick={onNext}
                  >
                    {stage < 6 ? "Дальше" : "Подтвердить"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={"flex justify-center"}>
                  <div className={"w-full max-w-sm flex flex-col items-center text-center"}>
                    <Image src={approvedIcon} alt={""} className={"w-[200px] h-[200px] object-contain mb-8"}/>
                    <p className={"font-semibold text-xl"}>
                      Ваша заявка успешно принята!
                      <br/>
                      <br/>
                      Подходящий для Ваших задач юрист свяжется с Вами.
                    </p>

                    <div className={"w-full flex justify-center my-10"}>
                      <Link href={"/cabinet/requests"} className={"w-full"}>
                        <Button
                          type={"primary"}
                          className={"w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all"}
                        >
                          Перейти в личный кабинет
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Create;