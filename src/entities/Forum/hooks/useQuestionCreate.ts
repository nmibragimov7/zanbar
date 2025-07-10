import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionCreateProps {
  onSuccess: (key: string) => void;
}

export const useQuestionCreate = (argument: useQuestionCreateProps) => {
  return useMutation({
    mutationFn: forumService.create,
    onSuccess() {
      argument.onSuccess("create");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}