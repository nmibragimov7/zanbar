import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestFinishProps {
  onSuccess: (key: string, response: any) => void;
}

export const useTestFinish = (argument: useTestFinishProps) => {
  return useMutation({
    mutationFn: testService.finish,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("finish", response.data);
      }
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}