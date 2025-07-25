import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {lawyerService} from "@/entities/Lawyer/Lawyer.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useLawyerCreateProps {
  onSuccess: (key: string) => void;
}

export const useLawyerCreate = (argument: useLawyerCreateProps) => {
  return useMutation({
    mutationFn: lawyerService.create,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("lawyer-create");
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