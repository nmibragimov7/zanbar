import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useSendAnswerProps {
  onSuccess: (key: string) => void;
}

export const useSendAnswer = (argument: useSendAnswerProps) => {
  return useMutation({
    mutationFn: forumService.sendAnswer,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("send-answer");
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