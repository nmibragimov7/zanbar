import React from 'react';
import {Button, Form, notification} from "antd";
import {useRouter} from "next/router";

import Field from "@/shared/ui/Field/Field";
import Logo from "@/shared/ui/Logo/Logo";

import {TRegister, useRegister, useVerify} from "@/entities/Auth/Auth.module";

import {validation} from "@/shared/constants/validation";

import logoIcon from "@/shared/assets/images/png/logo_small.png";
import sectionIcon from "@/shared/assets/images/png/section_mobile.png";
import googleIcon from "@/shared/assets/images/svg/google.svg";

const Register = () => {
  const router = useRouter();

  const [step, setStep] = React.useState(1);

  const initial: TRegister = {
    name: "",
    username: "",
    password: "",
    repeat_password: "",
    otp: "",
  };
  const [form] = Form.useForm<TRegister>();

  const onSuccess = async (key: string, response: any) => {
    if (key === "register") {
      setStep(2);
      notification.info({message: response?.message || "Код для подтверждения отправлен на вашу почту"});
      return;
    }

    notification.success({message: response?.message || "Код успешно подтвержден"});
    await router.push("/login");
  }
  const registerMutate = useRegister({onSuccess});
  const verifyMutate = useVerify({onSuccess});

  const onFinish = (values: TRegister) => {
    if (step === 1) {
      registerMutate.mutate({
        name: values.name,
        username: values.username,
        password: values.password,
      });
      return;
    }

    verifyMutate.mutate({
      username: values.username,
      otp: values.otp || "",
    })
  }
  const onLogin = async () => {
    await router.push("/login");
  }

  return (
    <>
      <div className={"h-screen overflow-hidden md:grid md:grid-cols-2"}>
        {/*<Image src={sectionIcon} alt={""} className={"md:hidden w-full pt-1 px-1 mb-10"}/>*/}
        <div className={"md:hidden w-full h-[162px] bg-purple-1000/10 pt-1 px-1 mb-10"}></div>

        <div className={"overflow-y-auto flex items-center justify-center"}>
          <div className={"w-full md:max-w-[360px] px-3 md:px-0"}>
            <div className={"flex justify-between mb-8"}>
              <div>
                <h1 className={"text-3xl font-semibold mb-4"}>Регистрация</h1>
                <p className={"text-dark-400"}>Пройдите регистрацию</p>
              </div>
              <Logo/>
            </div>
            <Form
              size={"large"}
              layout={"vertical"}
              initialValues={initial}
              form={form}
              validateTrigger={["onSubmit"]}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                className={"mb-6"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Имя"}
                  placeholder={"Введите имя"}
                />
              </Form.Item>
              <Form.Item
                name="username"
                className={"mb-6"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Эл.почта"}
                  placeholder={"Введите почту"}
                />
              </Form.Item>
              <Form.Item
                name="password"
                className={"mb-2"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Пароль"}
                  inputType={"password"}
                  placeholder={"Придумайте пароль"}
                  autoComplete={"new-password"}
                />
              </Form.Item>
              <p className={"text-dark-400 mb-4"}>Минимум 8, заглавная, строчная и спецсимвол</p>
              <Form.Item
                name="repeat_password"
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
              {step === 2 ? (
                <Form.Item
                  name="otp"
                  className={"mb-6"}
                  rules={[{required: true, message: validation.REQUIRED}]}
                >
                  <Field
                    label={"Код подтверждения"}
                    placeholder={"Введите код"}
                  />
                </Form.Item>
              ) : null}
              <Form.Item className={"mt-10 mb-6"}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  className={"w-full !h-[44px] shadow-none bg-purple-1000 text-white !rounded-lg disabled:bg-gray-600 disabled:text-white transition-all"}
                  disabled={registerMutate.isLoading || verifyMutate.isLoading}
                >
                  {step === 1 ? "Создать аккаунт" : "Отправить код"}
                </Button>
              </Form.Item>
              {/*<Button*/}
              {/*  htmlType={"submit"}*/}
              {/*  className={"flex items-center gap-2 w-full !h-[44px] font-semibold shadow-none bg-white !rounded-lg border border-gray-200 transition-all hover:border-primary hover:bg-white mb-8"}*/}
              {/*>*/}
              {/*  <Image src={googleIcon} alt={""}/>*/}
              {/*  <span>Продолжить с Google</span>*/}
              {/*</Button>*/}
              <div className={"text-sm text-center"}>
                <span className={"text-dark-400"}>У вас есть аккаунт?</span> <span
                className={"cursor-pointer transition-all font-semibold text-dark-600 hover:opacity-70"}
                onClick={onLogin}>Войти</span>
              </div>
            </Form>
          </div>
        </div>
        <div className={"hidden md:block relative bg-purple-1000/10"}>
          <div className={"absolute bottom-12 left-12"}>
            {/*<h1 className={"text-4xl font-medium text-green-1100 mb-4"}>*/}
            {/*  Title*/}
            {/*</h1>*/}
            <p className={"text-green-1100 text-xl"}>www.zanbar.kz</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;