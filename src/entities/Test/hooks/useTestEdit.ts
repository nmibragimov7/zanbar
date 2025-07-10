import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestEditProps {
  onSuccess: (key: string) => void;
}

export const useTestEdit = (argument: useTestEditProps) => {
  return useMutation({
    mutationFn: testService.edit,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("test-edit");
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