import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {requestService} from "@/entities/Request/Request.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useRequestCreateProps {
  onSuccess: (key: string) => void;
}

export const useRequestCreate = (argument: useRequestCreateProps) => {
  return useMutation({
    mutationFn: requestService.create,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("request-create");
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