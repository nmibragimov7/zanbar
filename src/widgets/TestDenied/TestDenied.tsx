import React from 'react';
import {Button, Modal} from "antd";

interface TestDeniedProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const TestDenied: React.FC<TestDeniedProps> = ({visible, setVisible}) => {
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
          <p className={"text-lg font-semibold mb-4"}>Необходимо пройти курс</p>
          <p className={"text-dark-400 text-sm mb-6"}>Чтобы пройти тестирование, необходимо пройти этапы курса.</p>
          <Button
            className={"w-full !h-[44px] shadow-none !rounded-lg bg-purple-900 text-white transition-all"}
            onClick={() => setVisible(false)}
          >
            Закрыть
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TestDenied;