import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestCreateProps {
  onSuccess: (key: string) => void;
}

export const useTestCreate = (argument: useTestCreateProps) => {
  return useMutation({
    mutationFn: testService.create,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("test-create");
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