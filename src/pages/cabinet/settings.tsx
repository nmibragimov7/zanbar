import React, {useMemo, useState} from 'react';
import Image from "next/image";
import {Button, Form, notification, Upload, UploadFile} from "antd";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import Field from "@/shared/ui/Field/Field";

import {
  TPassword,
  TProfile,
  useImageUpdate,
  usePasswordUpdate,
  useProfile,
  useProfileUpdate
} from "@/entities/Auth/Auth.module";

import {useAuth} from "@/shared/hooks/useAuth";

import {validation} from "@/shared/constants/validation";

import plusIcon from "@/shared/assets/images/svg/plus.svg";

const Settings = () => {
  const {user} = useAuth();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const initialProfile: TProfile = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
  };
  const [formProfile] = Form.useForm<TProfile>();

  const initialPassword: TPassword = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }
  const [formPassword] = Form.useForm<TPassword>();

  const onSuccess = (key: string) => {
    if (key === "profile-update") {
      notification.success({message: "Профиль успешно обновлен"})
      profileMutate.mutate();
      return;
    }

    if (key === "password-update") {
      formPassword.resetFields();
      notification.success({message: "Пароль успешно изменен"});
    }
  }
  const imageUpdateMutate = useImageUpdate({onSuccess});
  const profileUpdateMutate = useProfileUpdate({onSuccess});
  const passwordUpdateMutate = usePasswordUpdate({onSuccess});
  const profileMutate = useProfile({onSuccess});

  const name = useMemo(() => {
    if (!user?.firstname) return "П";
    return user?.firstname.substr(0, 1);
  }, [user]);
  const photo = useMemo(() => {
    if (fileList.length) return fileList[0]?.thumbUrl;
    if (user?.image) return user?.image;
    return "";
  }, [user, fileList])

  const onSave = (values: TProfile) => {
    if (fileList.length) {
      const formData = new FormData();
      // @ts-ignore
      formData.append("image", fileList[0].originFileObj);
      imageUpdateMutate.mutate(formData);
    }

    profileUpdateMutate.mutate({
      ...values
    })
  }
  const onChange = (values: TPassword) => {
    passwordUpdateMutate.mutate(values);
  }

  return (
    <>
      <CabinetLayout>
        <div className={"w-full flex flex-col md:flex-row gap-10"}>
          <div className={"flex flex-row md:flex-col items-center gap-4 md:gap-0"}>
            <div className={"w-[80px] md:w-[120px] h-[80px] md:h-[120px] rounded-full overflow-hidden md:mb-6"}>
              {photo ? (
                <>
                  <img src={photo} className={"w-full h-full object-contain"} alt={""}/>
                </>
              ) : (
                <div className={"bg-green-100 w-full h-full flex items-center justify-center text-green-900 font-medium text-2xl"}>
                  <p>{name}</p>
                </div>
              )}
            </div>
            <Upload
              beforeUpload={() => false}
              accept=".jpg, .jpeg, .png, .svg"
              maxCount={1}
              listType={"picture-card"}
              fileList={fileList}
              className={"settings"}
              onChange={({fileList}) => {
                setFileList(fileList);
              }}
            >
              <div className={"w-[120px] mdw-[90px] cursor-pointer transition-all hover:opacity-70 flex items-center justify-center gap-2 rounded-lg text-dark-400 bg-gray-400 py-3 px-5"}>
                <Image src={plusIcon} alt={""}/>
                <p className={"text-sm"}>Фото</p>
              </div>
            </Upload>
          </div>
          <div className={"w-full"}>
            <p className={"text-2xl md:text-[30px] font-medium mb-6"}>Личные данные</p>
            <Form
              size={"large"}
              layout={"vertical"}
              initialValues={initialProfile}
              form={formProfile}
              className={"w-full"}
              validateTrigger={["onSubmit"]}
              onFinish={onSave}
            >
              <div className={"w-full grid md:grid-cols-2 md:gap-4 md:mb-4"}>
                <Form.Item
                  name="firstname"
                  className={"w-full mb-6"}
                  rules={[{required: true, message: validation.REQUIRED}]}
                >
                  <Field
                    label={"Имя"}
                    placeholder={"Введите имя"}
                  />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  className={"w-full mb-6"}
                >
                  <Field
                    label={"Фамилия"}
                    placeholder={"Введите фамилию"}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  htmlType={"submit"}
                  className={"w-full md:w-auto !h-[44px] shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
                  disabled={imageUpdateMutate.isLoading || profileUpdateMutate.isLoading || profileMutate.isLoading}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
            <Form
              size={"large"}
              layout={"vertical"}
              initialValues={initialPassword}
              form={formPassword}
              className={"w-full mb-20"}
              validateTrigger={["onSubmit"]}
              onFinish={onChange}
            >
              <p className={"text-xl font-medium mb-4"}>Изменить пароль</p>
              <div className={"w-full grid md:grid-cols-2 md:gap-4"}>
                <Form.Item
                  name="oldPassword"
                  className={"mb-6"}
                  rules={[{required: true, message: validation.REQUIRED}]}
                >
                  <Field
                    label={"Текущий пароль"}
                    inputType={"password"}
                    placeholder={"Введите пароль"}
                    autoComplete={"new-password"}
                  />
                </Form.Item>
              </div>
              <div className={"w-full grid md:grid-cols-2 gap-4 md:mb-6"}>
                <div>
                  <Form.Item
                    name="newPassword"
                    className={"mb-2"}
                    rules={[{required: true, message: validation.REQUIRED}]}
                  >
                    <Field
                      label={"Новый пароль"}
                      inputType={"password"}
                      placeholder={"Придумайте пароль"}
                      autoComplete={"new-password"}
                    />
                  </Form.Item>
                  <p className={"text-dark-400 text-sm"}>Минимум 8, заглавная, строчная и спецсимвол</p>
                </div>

                <Form.Item
                  name="newPasswordConfirmation"
                  className={"mb-6"}
                  rules={[{required: true, message: validation.REQUIRED}]}
                >
                  <Field
                    label={"Повторите пароль"}
                    inputType={"password"}
                    placeholder={"Введите пароль"}
                    autoComplete={"new-password"}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  htmlType={"submit"}
                  className={"w-full md:w-auto !h-[44px] shadow-none border border-gray-200 !rounded-lg text-dark-500 disabled:bg-gray-100 transition-all"}
                  disabled={passwordUpdateMutate.isLoading}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </CabinetLayout>
    </>
  );
};

export default Settings;