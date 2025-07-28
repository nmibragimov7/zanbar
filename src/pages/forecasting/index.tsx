import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Breadcrumb, Button, Form, type GetProp, Input, Select, type UploadProps} from "antd";
import {useTranslation} from "next-i18next";

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";
import {classNames} from "@/shared/lib/classNames";

import {validation} from "@/shared/constants/validation";

import forecastingIcon from "@/shared/assets/images/png/forecasting.png";
import forecastingAIIcon from "@/shared/assets/images/png/forecasting_ai.png";
import checkboxIcon from "@/shared/assets/images/svg/lawyer_checkbox.svg";
import checkboxGreenIcon from "@/shared/assets/images/svg/lawyer_checkbox_green.svg";
import uploadIcon from "@/shared/assets/images/svg/upload_file.svg";
import removeIcon from "@/shared/assets/images/svg/remove.svg";
import refreshIcon from "@/shared/assets/images/svg/refresh.svg";
import ProgressBar from "@/shared/ui/ProgressBar/ProgressBar";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const initial = {
  side: undefined,
  region: undefined,
  category: undefined,
  type: undefined,

  article: undefined,
  fact: undefined,
  description: "",

  file1: "",
  file2: "",
  file3: "",
  file4: "",
  file5: "",
}
const steps = [
  "Собираем данные о сторонах, категории спора и типе требований...",
  "Изучаем статью правонарушения и ключевые обстоятельства дела...",
  "Сопоставляем с судебной практикой и моделируем возможные исходы...",
  "AI рассчитывает вероятность успеха и предлагает оптимальные действия..."
]

const Index = () => {
  const {t} = useTranslation();

  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<any>({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const [form] = Form.useForm<any>();
  const values = Form.useWatch([], form);

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const onNext = async () => {
    if (stage < 3 || stage === 4) {
      setStage(prev => prev + 1);
      return;
    }

    if (stage === 3) {
      setStage(prev => prev + 1);
      const interval = setInterval(() => {
        setStep(prev => {
          console.log("step", prev);
          if (prev < 4) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 2000);
    }
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
    console.log(values)
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
              title: <span>{t('breadcrumb.5')}</span>,
            },
          ]}
        />

        <div className={"flex justify-center text-center bg-gray-100 p-10 mb-5 md:mb-10"}>
          <div className={"w-full max-w-[640px] flex flex-col items-center"}>
            <h1 className={"text-xl md:text-3xl font-medium"}>{t('forecasting.title')}</h1>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <div className={"w-full max-w-[790px] text-black px-3 md:px-5"}>
            {stage < 5 ? (
              <>
                {stage > 0 && stage < 4 ? (
                  <>
                    <div className={"flex items-center gap-4 mb-2"}>
                      <div
                        className={"bg-purple-1000 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white font-medium text-base md:text-xl"}
                      >
                        {stage}
                      </div>
                      <div>
                        <p className={"text-xs mb-2"}>{t('forecasting.text', {n: stage})}</p>
                        <p className={"font-semibold text-2xl"}>
                          {stage === 1 ? t('forecasting.step.0') : null}
                          {stage === 2 ? t('forecasting.step.1') : null}
                          {stage === 3 ? t('forecasting.step.2') : null}
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
                        <Image src={forecastingIcon} alt={""} className={"w-[200px] h-[200px] object-contain mb-8"}/>
                        <p className={"text-center font-semibold text-3xl"}>
                          {t('forecasting.banner.title')}
                        </p>
                      </div>
                    </div>
                    <div className={"grid gap-4 my-10"}>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>{t('forecasting.banner.label.0')}</p>
                          <p className={"text-xs"}>{t('forecasting.banner.label.1')}</p>
                        </div>
                      </div>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>{t('forecasting.banner.label.2')}</p>
                          <p className={"text-xs"}>{t('forecasting.banner.label.3')}</p>
                        </div>
                      </div>
                      <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                        <Image src={checkboxIcon} alt={""} className={"shrink-0"}/>
                        <div>
                          <p className={"font-semibold mb-1"}>{t('forecasting.banner.label.4')}</p>
                          <p className={"text-xs"}>{t('forecasting.banner.label.5')}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {stage === 4 ? (
                  <>
                    <div className={"flex justify-center mb-4"}>
                      <div className={"w-full max-w-sm flex flex-col items-center"}>
                        <Image src={forecastingAIIcon} alt={""} className={"w-[200px] h-[200px] object-contain mb-8"}/>
                        <p className={"text-center font-semibold text-3xl"}>
                          {step === 0 ? "Анализируем материалы дела..." : ""}
                          {step === 1 ? "Проводим юридическую оценку..." : ""}
                          {step === 2 ? "Оцениваем перспективы..." : ""}
                          {step === 3 ? "Формируем прогноз и рекомендации..." : ""}
                          {step === 4 ? "Результаты прогнозирования готовы" : ""}
                        </p>
                      </div>
                    </div>
                    <div className={"relative h-[200px] my-10"}>
                      {steps.map((text: string, idy: number) => (
                        <div
                          key={text}
                          className={
                            classNames(
                              "overflow-hidden invisible opacity-0 transition-all absolute right-0 bottom-[-50px] left-0 flex items-center gap-2 shadow-400 rounded-lg bg-gray--300 text-black font-medium py-3 px-4",
                              {
                                "!visible !opacity-100 !bottom-[160px] scale-90": idy === 0 && idy < step,
                                "!visible !opacity-100 !bottom-[120px] scale-90": idy === 1 && idy < step,
                                "!visible !opacity-100 !bottom-[80px] scale-90": idy === 2 && idy < step,
                                "!visible !opacity-100 !bottom-[40px] scale-90": idy === 3 && idy < step,
                                "!visible !opacity-100 !bottom-[120px]": idy === 0 && idy === step,
                                "!visible !opacity-100 !bottom-[80px]": idy === 1 && idy === step,
                                "!visible !opacity-100 !bottom-[40px]": idy === 2 && idy === step,
                                "!visible !opacity-100 !bottom-[20px]": idy === 3 && idy === step,
                              }
                            )
                          }
                        >
                          <Image src={idy === step ? refreshIcon : checkboxIcon} alt={""}/>
                          <span>{text}</span>
                        </div>
                      ))}
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
                      name="region"
                      label={"Выберите регион"}
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
                    <Form.Item
                      name="category"
                      label={"Укажите категорию дела"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Не выбрано"}
                        options={[]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="type"
                      label={"Укажите тип требования"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Не выбрано"}
                        options={[]}
                      />
                    </Form.Item>
                  </div>
                  <div className={classNames("hidden", {"!block": stage === 2})}>
                    <Form.Item
                      name="article"
                      label={"Укажите статьи правонарушения"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Не выбрано"}
                        options={[]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="fact"
                      label={"Укажите ключевые факты правонарушения"}
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Select
                        className={"w-full !h-[44px] !rounded-none"}
                        placeholder={"Не выбрано"}
                        options={[]}
                      />
                    </Form.Item>

                    <p className={"mb-1"}>Опишите основное требование истца</p>
                    <Form.Item
                      name="description"
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <Input.TextArea
                        placeholder={"Описание..."}
                        rows={6}
                        maxLength={5000}
                        style={{height: 120, resize: 'none'}}
                        className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                      />
                    </Form.Item>
                  </div>
                  <div className={classNames("hidden", {"!block": stage === 3})}>
                    <Form.Item
                      name="file1"
                      className={"w-full"}
                    >
                      <p className={"font-medium text-sm mb-2"}>
                        Исковое заявление (если есть)
                      </p>
                      <input
                        id={"file1"}
                        type="file"
                        className={"!hidden"}
                        accept={".images, .pdf"}
                        onChange={(event: any) => onChange("file1", event)}
                      />
                      <label
                        htmlFor={"file1"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.file1 ? files?.file1?.name : "Загрузить"}
                        </p>
                        {files?.file1 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "file1")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="file2"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-sm mb-2"}>
                        Ответ на претензию
                      </p>
                      <input
                        id={"file2"}
                        type="file"
                        className={"!hidden"}
                        accept={".images, .pdf"}
                        onChange={(event: any) => onChange("file2", event)}
                      />
                      <label
                        htmlFor={"file2"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.file2 ? files?.file2?.name : "Загрузить"}
                        </p>
                        {files?.file2 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "file2")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="file3"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-sm mb-2"}>
                        Претензии
                      </p>
                      <input
                        id={"file3"}
                        type="file"
                        className={"!hidden"}
                        accept={".images, .pdf"}
                        onChange={(event: any) => onChange("file3", event)}
                      />
                      <label
                        htmlFor={"file3"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.file3 ? files?.file3?.name : "Загрузить"}
                        </p>
                        {files?.file3 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "file3")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="file4"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-sm mb-2"}>
                        Гарантийное письмо (при наличии)
                      </p>
                      <input
                        id={"file4"}
                        type="file"
                        className={"!hidden"}
                        accept={".jpg, .jpeg, .images"}
                        onChange={(event: any) => onChange("file4", event)}
                      />
                      <label
                        htmlFor={"file4"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.file4 ? files?.file4?.name : "Загрузить"}
                        </p>
                        {files?.file4 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "file4")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                    <Form.Item
                      name="file5"
                      className={"w-full"}
                      rules={[{required: true, message: validation.REQUIRED}]}
                    >
                      <p className={"font-medium text-sm mb-2"}>
                        Переписка сторон (если есть)
                      </p>
                      <input
                        id={"file5"}
                        type="file"
                        className={"!hidden"}
                        accept={".jpg, .jpeg, .images"}
                        onChange={(event: any) => onChange("file5", event)}
                      />
                      <label
                        htmlFor={"file5"}
                        className={"cursor-pointer transition-all hover:opacity-70 bg-gray-0 flex items-center justify-center gap-2 p-4"}
                      >
                        <Image src={uploadIcon} alt={""}/>
                        <p className={"text-purple-1000 font-semibold"}>
                          {files?.file5 ? files?.file5?.name : "Загрузить"}
                        </p>
                        {files?.file5 ? (
                          <Image
                            src={removeIcon}
                            alt={""}
                            className={"ml-auto"}
                            onClick={(event: any) => onRemove(event, "file5")}
                          />
                        ) : null}
                      </label>
                    </Form.Item>
                  </div>

                  {stage < 4 ? (
                    <div className={"flex justify-center my-10"}>
                      <Button
                        type={"primary"}
                        className={"w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70"}
                        disabled={false}
                        onClick={onNext}
                      >
                        {stage === 0 ? t('forecasting.form.button.0') : (stage === 3 ? t('forecasting.form.button.2') : t('forecasting.form.button.1'))}
                      </Button>
                    </div>
                  ) : null}
                </Form>
                <div className={"flex justify-center my-10"}>
                  <Button
                    type={"primary"}
                    className={
                      classNames(
                        "hidden w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70",
                        {"!flex": stage === 4 && step === 4}
                      )
                    }
                    disabled={false}
                    onClick={onNext}
                  >
                    {t('forecasting.form.button.3')}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={"flex justify-center mb-10"}>
                  <div className={"w-full max-w-sm flex flex-col items-center"}>
                    <div className={"mb-4"}>
                      <ProgressBar
                        current={3}
                        total={4}
                        color={"#32D583"}
                      />
                    </div>
                    <p className={"text-center font-semibold text-2xl"}>
                      Вероятность выигрыша по делу составляет 75% на следующих основаниях:
                    </p>
                  </div>
                </div>
                <div className={"grid gap-4 my-10"}>
                  <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                    <Image src={checkboxGreenIcon} alt={""} className={"shrink-0"}/>
                    <div>
                      <p className={"font-semibold mb-1"}>Наличие письменных доказательств</p>
                      <p className={"text-xs"}>
                        Предоставлены документы, подтверждающие позицию истца (договор, переписка, претензии).
                      </p>
                    </div>
                  </div>
                  <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                    <Image src={checkboxGreenIcon} alt={""} className={"shrink-0"}/>
                    <div>
                      <p className={"font-semibold mb-1"}>Соответствие требований действующему законодательству</p>
                      <p className={"text-xs"}>
                        Указанная статья применима к описанной ситуации, правовая квалификация верна.
                      </p>
                    </div>
                  </div>
                  <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                    <Image src={checkboxGreenIcon} alt={""} className={"shrink-0"}/>
                    <div>
                      <p className={"font-semibold mb-1"}>Юрисдикция определена корректно</p>
                      <p className={"text-xs"}>
                        Дело относится к компетенции указанного суда и категории дел.
                      </p>
                    </div>
                  </div>
                  <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                    <Image src={checkboxGreenIcon} alt={""} className={"shrink-0"}/>
                    <div>
                      <p className={"font-semibold mb-1"}>Претензионный порядок соблюдён</p>
                      <p className={"text-xs"}>
                        Ответчик был уведомлён в установленном порядке, что усиливает правовую позицию.
                      </p>
                    </div>
                  </div>
                  <div className={"flex items-center gap-4 bg-gray--100/50 rounded-lg p-4"}>
                    <Image src={checkboxGreenIcon} alt={""} className={"shrink-0"}/>
                    <div>
                      <p className={"font-semibold mb-1"}>Отсутствие очевидных процессуальных нарушений</p>
                      <p className={"text-xs"}>
                        Иск оформлен корректно, приложены все необходимые данные и документы.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"flex justify-center my-10"}>
                  <Link href={"/"} className={"w-full md:w-[300px]"}>
                    <Button
                      type={"primary"}
                      className={
                        classNames(
                          "w-full md:w-[300px] !h-[44px] shadow-none bg-purple-1000 text-white !rounded-[100px] transition-all disabled:text-white disabled:bg-purple-1000 disabled:opacity-70",
                        )
                      }
                      disabled={false}
                    >
                      {t('forecasting.form.button.4')}
                    </Button>
                  </Link>
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