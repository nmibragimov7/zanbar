import {useEffect, useState} from "react";
import {Form, FormInstance} from "antd";

export const useForm = <T>(form: FormInstance<T>) => {
  const [isValidated, setValidated] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  useEffect(() => {
    form.validateFields().then(
      () => {
        setValidated(false);
      },
      () => {
        setValidated(true);
      },
    );
  }, [values]);

  return {isValidated};
};
