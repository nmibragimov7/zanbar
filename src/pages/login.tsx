import React from 'react';
import {Button, Form} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import Field from "@/shared/ui/Field/Field";
import Logo from "@/shared/ui/Logo/Logo";

import {TLogin, useLogin, useProfile} from "@/entities/Auth/Auth.module";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

import {validation} from "@/shared/constants/validation";

import sectionIcon from "@/shared/assets/images/png/section_mobile.png";
import googleIcon from "@/shared/assets/images/svg/google.svg";

const Login = () => {
  const router = useRouter();
  const {t} = useTranslation();

  const initial: TLogin = {
    username: "",
    password: "",
  };
  const [form] = Form.useForm<TLogin>();

  const onSuccess = async (key: string) => {
    if (key === "profile") {
      await router.push("/");
      return;
    }

    profileMutate.mutate();
  }
  const loginMutate = useLogin({onSuccess});
  const profileMutate = useProfile({onSuccess});

  const onFinish = (values: TLogin) => {
    loginMutate.mutate(values);
  }
  const onRegister = async () => {
    await router.push("/register");
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
                <h1 className={"text-3xl font-semibold mb-4"}>{t('login.title')}</h1>
                <p className={"text-dark-400"}>{t('login.description')}</p>
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
                className={"mb-10"}
                rules={[{required: true, message: validation.REQUIRED}]}
              >
                <Field
                  label={"Пароль"}
                  inputType={"password"}
                  placeholder={"Введите пароль"}
                  autoComplete={"new-password"}
                />
              </Form.Item>
              <Form.Item className={"mb-6"}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  className={"w-full !h-[44px] shadow-none bg-purple-1000 text-white !rounded-lg disabled:bg-gray-600 disabled:text-white transition-all"}
                  disabled={loginMutate.isLoading || profileMutate.isLoading}
                >
                  Войти
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
                <span className={"text-dark-400"}>У вас нет аккаунта?</span> <span className={"cursor-pointer transition-all font-semibold text-dark-600 hover:opacity-70"} onClick={onRegister}>Зарегистрироваться</span>
              </div>
            </Form>
          </div>
        </div>
        <div className={"hidden md:block relative bg-purple-1000/10"}>
          <div className={"absolute bottom-12 left-12"}>
            {/*<h1 className={"text-4xl font-medium text-green-1100 mb-4"}>*/}
            {/*  Title*/}
            {/*</h1>*/}
            {/*<p className={"text-green-1100 text-xl"}>www.zanbar.kz</p>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
export const getStaticProps = getDefaultStaticProps;