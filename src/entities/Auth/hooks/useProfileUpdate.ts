import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useProfileUpdateProps {
  onSuccess: (key: string) => void;
}

export const useProfileUpdate = (argument: useProfileUpdateProps) => {
  return useMutation({
    mutationFn: authService.profileUpdate,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("profile-update");
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