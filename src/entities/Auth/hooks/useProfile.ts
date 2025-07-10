import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

import {userStorage} from "@/shared/lib/lsStorage";

interface useProfileProps {
  onSuccess: (key: string) => void;
}

export const useProfile = (argument: useProfileProps) => {
  return useMutation({
    mutationFn: authService.profile,
    onSuccess(response: any) {
      if (response.data) {
        userStorage.save(response.data);
        argument.onSuccess("profile");
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