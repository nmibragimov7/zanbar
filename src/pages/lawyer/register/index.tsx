import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  Button,
  Form,
  type GetProp,
  Select,
  Skeleton,
  type UploadProps
} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";
import Field from "@/shared/ui/Field/Field";
import Status from "@/shared/ui/Status/Status";

import {useDictionaries, useLawyerCreate} from "@/entities/Lawyer/Lawyer.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";
import {classNames} from "@/shared/lib/classNames";

import {validation} from "@/shared/constants/validation";

import registerIcon from "@/shared/assets/images/svg/lawyer_register.svg";
import checkboxIcon from "@/shared/assets/images/svg/lawyer_checkbox.svg";
import uploadIcon from "@/shared/assets/images/svg/upload_file.svg";
import removeIcon from "@/shared/assets/images/svg/remove.svg";
import updateIcon from "@/shared/assets/images/svg/update.svg";

const initial = {
  lastName: "",
  firstName: "",
  patronymic: "",
  phoneNumber: "",
  email: "",
  telegramAccount: "",
  city: undefined,

  specials: [],

  udostakBase64: "",
  diplomBase64: "",
  licenceBase64: "",
  profilePictureBase64: ""
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Index = () => {
  const {t} = useTranslation();

  const [stage, setStage] = useState(0);
  const [files, setFiles] = useState<any>({
    udostakBase64: null,
    diplomBase64: null,
    licenceBase64: null,
    profilePictureBase64: null
  });

  const [form] = Form.useForm<any>();
  const values = Form.useWatch([], form);

  const onSuccess = () => {
    setStage(4);
  }

  const {data, isFetching} = useDictionaries();
  const createMutate = useLawyerCreate({onSuccess})

  const isValidate = () => {
    if (stage === 1) {
      if (
        !values?.lastName
        || !values?.firstName
        || !values?.phoneNumber
        || !values?.email
        || !values?.telegramAccount
        || !values?.city
      ) return true;
    }
    if (stage === 2) {
      if (
        !values?.specials.length
      ) return true;
    }
    if (stage === 3) {
      if (
        !values?.udostakBase64
        || !values?.diplomBase64
        || !values?.licenceBase64
        || !values?.profilePictureBase64
      ) return true;
    }

    return false;
  }

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const onNext = async () => {
    if (stage < 4) {
      setStage(prev => prev + 1);
      return;
    }
  }
  const onSelect = (d: string) => {
    if (!values?.specials) return;

    if (values.specials.includes(d)) {
      form.setFieldValue("specials", values.specials.filter((a: any) => a !== d));
      return;
    }

    form.setFieldValue("specials", [...values.specials, d]);
  }
  const onChange = (key: string, event: any) => {
    if (event?.target?.files && event?.target?.files.length) {
      const file = event?.target?.files[0];

      getBase64(file as FileType, (url: string) => {
        form.setFieldValue(key, url);
        setFiles((prev: any) => ({...prev, [key]: file}));
      })
    }
  }
  const onRemove = (event: any, key: string) => {
    event?.stopPropagation();
    event?.preventDefault();

    form.setFieldValue(key, "");
    setFiles((prev: any) => ({...prev, [key]: null}));
  }
  const onSave = (values: typeof initial) => {
    createMutate.mutate(values);
  }

  return (
    <>
      <MainLayout>
        <Breadcrumb
          className={"hidden md:flex px-5 mb-10"}
          separator=">"
          items={[
            {
              title: <Link href={"/"}>{t('breadcrumb.0')}</Link>,
            },
            {
              title: <Link href={`/lawyer`}>{t('breadcrumb.7')}</Link>,
            },
            {
              title: <span>{t('breadcrumb.12')}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>Регистрация юриста</h1>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <div className={"w-full max-w-[790px] text-black px-3 md:px-5"}>
            {stage < 4 ? (
              <>
                {stage > 0 ? (
                  <>
                    <div className={"flex items-center gap-4 mb-2"}>
                      <div
                        className={"bg-purple-1000 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white font-medium text-base md:text-xl"}
                      >
                        {stage}
                      </div>
                      <div>
                        <p className={"text-xs mb-2"}>Шаг {stage} из 3</p>
                        <p className={"font-semibold text-2xl"}>
                          {stage === 1 ? "Контактные данные" : null}
                          {stage === 2 ? "Профессиональная информация" : null}
                          {stage === 3 ? "Документы" : null}
                        </p>
                      </div>
                    </div>
                    <div className={"w-full h-2 bg-purple-300 mb-8"}>
                      <div
                        className={"h-full bg-purple-1000 rounded-tr rounded-br"}
                        style={{width: (stage / 3 * 100) + "%"}}
                      ></div>
                    </div>
                  </>
                ) : null}

                {stage === 0 ? (
                  <>
                    <div className={"flex justify-center mb-4"}>
                      <div className={"w-full max-w-sm flex flex-col items-center"}>
                        <Image src={registerIcon} alt={""} className={"w-[200px] h-[200px] object-contain mb-8"}/>
                        <p className={"text-center font-semibold text-3xl"}>
                          Зарегистрируйтесь и начните зарабатывать
                        </p>
                      </div>
                    </div>
                    <div className={"grid gap-4 my-10"}>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>Получать заявки</p>
                          <p className={"text-xs"}>Откликайтесь на запросы пользователей и берите дела в работу.</p>
                        </div>
                      </div>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>Получать заявки</p>
                          <p className={"text-xs"}>Откликайтесь на запросы пользователей и берите дела в работу.</p>
                        </div>
                      </div>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>Получать заявки</p>
                          <p className={"text-xs"}>Откликайтесь на запросы пользователей и берите дела в работу.</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <Form
                  size={"large"}
                  layout={"vertical"}
                  initialValues={initial}
                  form={form}
                  className={"w-full"}
                  validateTrigger={["onSubmit"]}
                  onFinish={onSave}
                >
                  <div className={classNames("hidden", {"!block": stage === 1})}>
                    <Form.Item
                      name="lastName"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Field
                        label={"Фамилия*"}
                        placeholder={"Введите вашу фамилию как в уд. личности"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="firstName"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Field
                        label={"Имя*"}
                        placeholder={"Введите ваше имя как в уд. личности"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="patronymic"
                      className={"w-full mb-6"}
                    >
                      <Field
                        label={"Отчество"}
                        placeholder={"Введите ваше отчество как в уд. личности"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Field
                        label={"Номер телефона*"}
                        placeholder={"+7 (---) --- ----"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Field
                        label={"E-mail*"}
                        placeholder={"Введите рабочую почту"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="telegramAccount"
                      className={"w-full mb-6"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Field
                        label={"Telegram аккаунт*"}
                        placeholder={"Введите Telegram аккаунт без @"}
                      />
                    </Form.Item>
                    <Form.Item
                      name="city"
                      label={"Выберите город Вашей деятельности*"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Не выбрано"}
                        options={[
                          {label: "Астана", value: "Астана"},
                          {label: "Алматы", value: "Алматы"},
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className={classNames("hidden", {"!block": stage === 2})}>
                    <Form.Item
                      name="specials"
                      label={"Выберите Вашу специализацию (можно выбрать несколько)*"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Skeleton
                        loading={isFetching}
                        active
                        paragraph={false}
                        className={"w-full h-[200px]"}
                      >
                        <div className={"flex flex-wrap items-center gap-2 mt-4"}>
                          {data?.data && data?.data.length ? data?.data.map((d: any, idx: number) => (
                            <Status
                              key={idx}
                              type={"gray"}
                              text={d}
                              className={
                                classNames(
                                  "whitespace-nowrap cursor-pointer transition-all hover:bg-purple-1000/10",
                                  {"!bg-purple-1000 !text-white": values?.specials && values?.specials.includes(d)}
                                )
                              }
                              onClick={() => onSelect(d)}
                            />
                          )) : null}
                        </div>
                      </Skeleton>
                    </Form.Item>
                  </div>
                  <div className={classNames("hidden", {"!block": stage === 3})}>
                    <Form.Item
                      name="udostakBase64"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-lg mb-2"}>
                        Загрузите удостоверение личности в формате PDF или PGN
                      </p>
                      <input
                        id={"udostakBase64"}
                        type="file"
                        className={"!hidden"}
                        accept={".png, .pdf"}
                        onChange={(event: any) => onChange("udostakBase64", event)}
                      />
                      <label
                        htmlFor={"udostakBase64"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.udostakBase64 ? files?.udostakBase64?.name : "Загрузить"}
                        </p>
                        {files?.udostakBase64 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "udostakBase64")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="diplomBase64"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-lg mb-2"}>
                        Загрузите диплом образования в формате PDF или PNG
                      </p>
                      <input
                        id={"diplomBase64"}
                        type="file"
                        className={"!hidden"}
                        accept={".png, .pdf"}
                        onChange={(event: any) => onChange("diplomBase64", event)}
                      />
                      <label
                        htmlFor={"diplomBase64"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.diplomBase64 ? files?.diplomBase64?.name : "Загрузить"}
                        </p>
                        {files?.diplomBase64 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "diplomBase64")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="licenceBase64"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-lg mb-2"}>
                        Загрузите лицензию (если есть) в формате PDF или PNG
                      </p>
                      <input
                        id={"licenceBase64"}
                        type="file"
                        className={"!hidden"}
                        accept={".png, .pdf"}
                        onChange={(event: any) => onChange("licenceBase64", event)}
                      />
                      <label
                        htmlFor={"licenceBase64"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.licenceBase64 ? files?.licenceBase64?.name : "Загрузить"}
                        </p>
                        {files?.licenceBase64 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "licenceBase64")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="profilePictureBase64"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-lg mb-2"}>
                        Загрузите фото для профиля
                      </p>
                      <input
                        id={"profilePictureBase64"}
                        type="file"
                        className={"!hidden"}
                        accept={".jpg, .jpeg, .png"}
                        onChange={(event: any) => onChange("profilePictureBase64", event)}
                      />
                      <label
                        htmlFor={"profilePictureBase64"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.profilePictureBase64 ? files?.profilePictureBase64?.name : "Загрузить"}
                        </p>
                        {files?.profilePictureBase64 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "udostakBase64")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                  </div>

                  {stage < 3 ? (
                    <div className={"flex justify-center my-10"}>
                      <Button
                        type={"primary"}
                        className={"w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70"}
                        disabled={isValidate()}
                        onClick={onNext}
                      >
                        {stage === 0 ? "Начать регистрацию" : "Дальше"}
                      </Button>
                    </div>
                  ) : null}
                  <div className={"flex justify-center my-10"}>
                    <Button
                      type={"primary"}
                      htmlType={"submit"}
                      className={
                        classNames(
                          "hidden w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70",
                          {"!flex": stage === 3}
                        )
                      }
                      disabled={isValidate() || createMutate.isLoading}
                    >
                      Дальше
                    </Button>
                  </div>
                </Form>


              </>
            ) : (
              <>
                <div className={"flex justify-center"}>
                  <div className={"w-full max-w-sm flex flex-col items-center text-center"}>
                    <Image src={updateIcon} alt={""} className={"w-[200px] h-[200px] object-contain mb-8"}/>
                    <p className={"font-semibold text-xl"}>
                      Ваша заявка успешно принята!
                      <br/>
                      <br/>
                      Вы получите уведомление о результате Вашей заявки.
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

export default Index;
export const getStaticProps = getDefaultStaticProps;