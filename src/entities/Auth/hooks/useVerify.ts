import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useVerifyProps {
  onSuccess: (key: string, response: any) => void;
}

export const useVerify = (argument: useVerifyProps) => {
  return useMutation({
    mutationFn: authService.verify,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("verify", response.data);
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