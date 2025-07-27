import React from 'react';
import Image from "next/image";
import {Button, Modal} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import deniedIcon from "@/shared/assets/images/svg/denied.svg";

interface AuthDeniedProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const AuthDenied: React.FC<AuthDeniedProps> = ({visible, setVisible}) => {
  const router = useRouter();
  const {t} = useTranslation();


  return (
    <>
      <Modal
        wrapClassName={"auth"}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <div className={"w-auto md:w-[400px] p-6"}>
          <div className={"flex flex-col items-center text-center"}>
            <Image src={deniedIcon} alt={""} className={"mb-6"}/>
            <p className={"text-lg font-semibold mb-4"}>{t('modal.auth-denied.title')}</p>
            <p className={"text-dark-400 text-sm mb-6"}>{t('modal.auth-denied.description')}</p>
            <div className={"w-full grid grid-cols-2 gap-2"}>
              <Button
                className={"w-full !h-[44px] shadow-none !rounded-lg transition-all"}
                onClick={async () => await router.push("/login")}
              >
                {t('modal.auth-denied.button.0')}
              </Button>
              <Button
                className={"w-full !h-[44px] shadow-none !rounded-lg bg-purple-1000 text-white transition-all"}
                onClick={async () => await router.push("/register")}
              >
                {t('modal.auth-denied.button.1')}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthDenied;