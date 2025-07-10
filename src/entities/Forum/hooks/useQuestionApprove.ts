import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionApproveProps {
  onSuccess: (key: string) => void;
}

export const useQuestionApprove = (argument: useQuestionApproveProps) => {
  return useMutation({
    mutationFn: forumService.approve,
    onSuccess() {
      argument.onSuccess("approve");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}