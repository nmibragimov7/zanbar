
import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {authService} from "@/entities/Auth/Auth.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useImageUpdateProps {
  onSuccess: (key: string) => void;
}

export const useImageUpdate = (argument: useImageUpdateProps) => {
  return useMutation({
    mutationFn: authService.imageUpdate,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("image-update");
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