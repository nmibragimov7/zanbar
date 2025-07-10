import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionRevokeProps {
  onSuccess: (key: string) => void;
}

export const useQuestionRevoke = (argument: useQuestionRevokeProps) => {
  return useMutation({
    mutationFn: forumService.revoke,
    onSuccess() {
      argument.onSuccess("revoke");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}