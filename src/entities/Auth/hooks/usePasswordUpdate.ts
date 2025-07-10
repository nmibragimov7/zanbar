import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface usePasswordUpdateProps {
  onSuccess: (key: string) => void;
}

export const usePasswordUpdate = (argument: usePasswordUpdateProps) => {
  return useMutation({
    mutationFn: authService.passwordUpdate,
    onSuccess() {
      argument.onSuccess("password-update");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}