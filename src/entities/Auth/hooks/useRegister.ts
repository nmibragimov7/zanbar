import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useRegisterProps {
  onSuccess: (key: string, response: any) => void;
}

export const useRegister = (argument: useRegisterProps) => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("register", response.data);
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