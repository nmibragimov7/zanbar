import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import {
  Button,
  Form,
  type GetProp,
  Input,
  notification,
  Select, Skeleton,
  Switch,
  Upload,
  UploadFile,
  type UploadProps
} from "antd";
import {useRouter} from "next/router";

import Field from "@/shared/ui/Field/Field";

import {TCourse} from "@/entities/Course/Course.module";
import {useTags} from "@/entities/Tag/Tag.module";

import {validation} from "@/shared/constants/validation";
import {courseStatus} from "@/shared/constants/status";

import closeIcon from "@/shared/assets/images/svg/close.svg";
import removeIcon from "@/shared/assets/images/svg/remove.svg";
import checkboxIcon from "@/shared/assets/images/svg/checkbox_dark.svg";
import uploadIcon from "@/shared/assets/images/svg/upload.svg";
import youtubeIcon from "@/shared/assets/images/svg/youtube.svg";
import plusIcon from "@/shared/assets/images/svg/plus.svg";

interface CourseFormProps {
  data?: any;
  isLoading: boolean;
  isFetching: boolean;
  onSubmit: (data: any) => void;
  onRemove?: () => void;
}
type TOption = {
  value: any;
  label: string;
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CourseForm: React.FC<CourseFormProps> = ({data, isFetching, isLoading, onSubmit, onRemove}) => {
  const router = useRouter();
  const id = router.query?.id;

  const [checked, setChecked] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [image, setImage] = useState<string>("");
  const [lessons, setLessons] = useState<any[]>([
    {
      title: "",
      videoUrl: "",
      bodyText: "",
    },
  ]);

  const initial: TCourse = {
    title: "",
    tags: [],
    description: "",
    image: "",
  };
  const [form] = Form.useForm<TCourse>();

  const {data: tags, isFetching: isFetchingTags} = useTags();

  const options: TOption[] = useMemo(() => {
    if (tags?.data && tags.data.length) {
      return tags.data.map((item: any) => ({label: item?.name, value: item?.name}));
    }
    return []
  }, [tags])

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const onChange = (idx: number, key: string, value: any) => {
    setLessons(lessons.map((lesson: any, idy: number) => {
      if (idy === idx) {
        lesson[key] = value;
      }

      return lesson;
    }))
  }
  const onRemoveLesson = (idx: number) => {
    setLessons(lessons.filter((_: any, idy: number) => idy !== idx));
  }
  const onAdd = () => {
    setLessons([...lessons, {
      title: "",
      videoUrl: "",
      bodyText: "",
    }]);
  }
  const onSave = (values: TCourse) => {
    if (!image) {
      notification.warning({message: "Необходимо добавить фото"})
      return
    }

    if (lessons.some((item: any) => !item?.title || !item?.bodyText)) {
      notification.warning({message: "Заполните обязательные поля уроков: Наименование и Полное описание"})
      return
    }

    onSubmit({
      values,
      image,
      lessons,
      checked,
    })
  }

  useEffect(() => {
    if (data) {
      form.setFieldValue("title", data?.title || "")
      form.setFieldValue("tags", data?.tags || [])
      form.setFieldValue("description", data?.description || "")
      form.setFieldValue("image", data?.image || "")

      if (data?.image) {
        setImage(data?.image);
      }
      
      if (data?.status === courseStatus.active) {
        setChecked(true);
      }

      if (data?.lessons && data?.lessons.length) {
        setLessons(data?.lessons.map((item: any) => ({id: item?.id, title: item?.title, videoUrl: item?.videoUrl, bodyText: item?.bodyText})));
      }
    }
  }, [data])

  return (
    <>
      <Form
        size={"large"}
        layout={"vertical"}
        initialValues={initial}
        form={form}
        className={"w-full"}
        validateTrigger={["onSubmit"]}
        onFinish={onSave}
      >
        <div className={"flex items-center justify-between border-b border-gray-300 py-4 mb-8"}>
          <Button
            className={"w-auto md:w-[135px] h-[44px] flex items-center gap-3 font-medium shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
            disabled={isFetching || isLoading}
            onClick={() => router.back()}
          >
            <Image src={closeIcon} alt={""} className={"w-2.5 h-2.5"}/>
            <span className={"hidden md:block"}>Закрыть</span>
          </Button>
          <div className={"flex items-center gap-4"}>
            {id ? (
              <>
                <div className={"flex items-center gap-2"}>
                  <Switch
                    title={"fdf"}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <span className={"text-black text-sm"}>Опубликован</span>
                </div>
                <Button
                  className={"w-[44px] h-[44px] flex items-center gap-3 font-medium text-sm shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all !px-2"}
                  disabled={isFetching || isLoading}
                  onClick={() => onRemove?.()}
                >
                  <Image src={removeIcon} alt={""} className={"w-4 h-4"}/>
                </Button>
              </>
            ) : null}
            <Form.Item className={"mb-0"}>
              <Button
                htmlType={"submit"}
                className={"w-auto md:w-[150px] h-[44px] flex items-center gap-2 font-medium shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
                disabled={isFetching || isLoading}
              >
                <Image src={checkboxIcon} alt={""} className={"w-3 h-3"}/>
                <span className={"hidden md:block"}>Сохранить</span>
              </Button>
            </Form.Item>
          </div>
        </div>
        {isLoading ? (
          <>
            <div className={"bg-gray-100 w-full h-[47px] mb-6"}></div>
            <div className={"grid md:grid-cols-2 gap-6 md:gap-4 mb-6"}>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
            </div>
            <div className={"bg-gray-100 w-[229px] h-[48px] mb-6"}></div>
            <div className={"bg-gray-100 w-full h-[144px] mb-14"}></div>
            <div className={"bg-gray-100 w-full h-[28px] mb-6"}></div>
            <div className={"grid md:grid-cols-2 gap-4 mb-6"}>
              <div className={"bg-gray-100 w-full h-[69px]"}></div>
            </div>
            <div className={"grid md:grid-cols-2 gap-4 mb-6"}>
              <div className={"bg-gray-100 w-full h-[44px]"}></div>
            </div>
            <div className={"bg-gray-100 w-full h-[144px] mb-10"}></div>
            <div className={"bg-gray-100 w-[220px] h-[48px]"}></div>
          </>
        ) : (
          <div className={"relative"}>
            <p className={"text-[30px] mb-6"}>Новый курс</p>
            <div className={"grid md:grid-cols-2 md:gap-4"}>
              <Form.Item
                name="title"
                className={"w-full mb-6"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Наименование"}
                  placeholder={"Введите текст"}
                />
              </Form.Item>
              <Skeleton
                loading={isFetchingTags}
                active
                paragraph={false}
                className={"h-[68px] mb-6"}
              >
                <Form.Item
                  name="tags"
                  label={"Теги"}
                  className={"w-full mb-6"}
                >
                  <Select
                    mode="multiple"
                    className={"w-full !h-[44px] !rounded-none"}
                    placeholder={"Выберите из списка"}
                    options={options}
                  />
                </Form.Item>
              </Skeleton>
            </div>
            {/*<Form.Item*/}
            {/*  name="description"*/}
            {/*  className={"w-full mb-6"}*/}
            {/*  rules={[{required: true, message: validation.REQUIRED}]}*/}
            {/*>*/}
            {/*  <Field*/}
            {/*    label={"Краткое описание"}*/}
            {/*    placeholder={"Введите текст"}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
            <div className={"mb-6"}>
              <Upload
                beforeUpload={() => false}
                accept=".jpg, .jpeg, .png, .svg"
                maxCount={1}
                fileList={fileList}
                className={"course"}
                onChange={({file, fileList}) => {
                  if (file?.status !== "removed") {
                    if (file.size && file.size > 1500000) { // 1,5mb
                      notification.warning({message: "Файл не должен превышать 1.5 мб"});
                      return
                    }

                    getBase64(file as FileType, (url: string) => {
                      setImage(url);
                    })
                    setFileList(fileList);
                  } else {
                    setImage("");
                    setFileList([]);
                  }
                }}
              >
                {image ? (
                  <div className={"w-full flex items-center gap-4"}>
                    <div className={"w-full md:w-[480px] h-[320px] rounded-lg border border-gray-200 p-4"}>
                      <img src={image} alt={""} className={"w-full h-full object-contain"}/>
                    </div>
                    <Button
                      className={"w-9 h-9 bg-gray-400 flex items-center gap-3 font-medium text-sm shadow-none !border-none !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all !px-2"}
                      onClick={(event) => {
                        event.stopPropagation();
                        setFileList([]);
                        setImage("");
                      }}
                    >
                      <Image src={removeIcon} alt={""} className={"w-4 h-4"}/>
                    </Button>
                  </div>
                ) : (
                  <Button
                    className={"flex items-center gap-2 text-base font-medium !h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500 px-10"}
                  >
                    <Image src={uploadIcon} alt={""}/>
                    <span>Добавить фото</span>
                  </Button>
                )}
              </Upload>
            </div>
            <div className={"mb-14"}>
              <p className={"text-sm text-dark-500 mb-1"}>Полное описание</p>
              <Form.Item
                name="description"
                className={"mb-0"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Input.TextArea
                  placeholder={"Введите текст"}
                  rows={6}
                  maxLength={5000}
                  style={{height: 120, resize: 'none'}}
                  className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                />
              </Form.Item>
            </div>
            <div>
              {lessons.map((lesson: any, idx: number) => (
                <div key={idx} className={"mb-10"}>
                  <div className={"flex items-center justify-between mb-6"}>
                    <p className={"text-xl"}>Урок {idx + 1}</p>
                    {idx ? (
                      <Button
                        className={"w-9 h-9 bg-gray-400 flex items-center gap-3 font-medium text-sm shadow-none !border-none !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all !px-2"}
                        onClick={() => onRemoveLesson(idx)}
                      >
                        <Image src={removeIcon} alt={""} className={"w-4 h-4"}/>
                      </Button>
                    ) : null}
                  </div>
                  <div className={"grid md:grid-cols-2 gap-4 mb-6"}>
                    <Field
                      label={"Наименование"}
                      placeholder={"Введите текст"}
                      value={lesson?.title}
                      onChange={(event: any) => onChange(idx, "title", event.target.value)}
                    />
                  </div>
                  <div className={"grid md:grid-cols-2 gap-4 mb-6"}>
                    <div className={"relative"}>
                      <Image src={youtubeIcon} alt={""} className={"z-10 absolute top-1/2 left-4 -translate-y-1/2"}/>
                      <Field
                        placeholder={"Ссылка на видео"}
                        className={"!pl-12"}
                        value={lesson?.videoUrl}
                        onChange={(event: any) => onChange(idx, "videoUrl", event.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <p className={"text-sm text-dark-500 mb-1"}>Полное описание</p>
                    <Input.TextArea
                      placeholder={"Введите текст"}
                      rows={6}
                      maxLength={5000}
                      style={{height: 120, resize: 'none'}}
                      className={"border border-gray-200 !rounded-lg !shadow-none transition-all duration-300 placeholder:!text-gray-600 !p-4"}
                      value={lesson?.bodyText}
                      onChange={(event: any) => onChange(idx, "bodyText", event.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              className={"flex items-center gap-2 text-base font-medium w-[220px] h-12 shadow-none border border-gray-200 !rounded-lg text-dark-500 px-10"}
              onClick={onAdd}
            >
              <Image src={plusIcon} alt={""} className={"w-3 h-3"}/>
              <span>Добавить еще урок</span>
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default CourseForm;