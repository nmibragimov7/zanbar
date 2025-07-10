import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestRemoveProps {
  onSuccess: (key: string) => void;
}

export const useTestRemove = (argument: useTestRemoveProps) => {
  return useMutation({
    mutationFn: testService.remove,
    onSuccess() {
      argument.onSuccess("test-remove");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}