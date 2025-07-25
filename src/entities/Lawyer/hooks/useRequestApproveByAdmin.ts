import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {lawyerService} from "@/entities/Lawyer/Lawyer.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useRequestApproveByAdminProps {
  onSuccess: () => void;
}

export const useRequestApproveByAdmin = (argument: useRequestApproveByAdminProps) => {
  return useMutation({
    mutationFn: lawyerService.approve,
    onSuccess() {
      argument.onSuccess();
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}