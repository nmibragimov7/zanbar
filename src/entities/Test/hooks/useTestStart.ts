import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestStartProps {
  onSuccess: (key: string, response: any) => void;
}

export const useTestStart = (argument: useTestStartProps) => {
  return useMutation({
    mutationFn: testService.start,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("start", response.data);
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