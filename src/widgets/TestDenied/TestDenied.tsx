import React from 'react';
import {Button, Modal} from "antd";
import {useTranslation} from "next-i18next";

interface TestDeniedProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const TestDenied: React.FC<TestDeniedProps> = ({visible, setVisible}) => {
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
        <div className={"w-auto md:w-[400px] text-center p-6"}>
          <p className={"text-lg font-semibold mb-4"}>{t('modal.test-denied.title')}</p>
          <p className={"text-dark-400 text-sm mb-6"}>{t('modal.test-denied.description')}</p>
          <Button
            className={"w-full !h-[44px] shadow-none !rounded-lg bg-purple-900 text-white transition-all"}
            onClick={() => setVisible(false)}
          >
            {t('modal.test-denied.button.0')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TestDenied;