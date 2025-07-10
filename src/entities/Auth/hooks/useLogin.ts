import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

import {accessTokenStorage, refreshTokenStorage} from "@/shared/lib/lsStorage";

interface useLoginProps {
  onSuccess: (key: string) => void;
}

export const useLogin = (argument: useLoginProps) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess(response: any) {
      if (response.data) {
        accessTokenStorage.save(response.data?.accessToken);
        refreshTokenStorage.save(response.data?.refreshToken);
        argument.onSuccess("login");
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